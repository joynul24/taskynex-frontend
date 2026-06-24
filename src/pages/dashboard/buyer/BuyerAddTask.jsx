import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useApi } from '../../../api/useApi.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebase.config.js';

export default function BuyerAddTask() {
  const { fetchApi, loading } = useApi();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    required_workers: '',
    payable_amount: '',
    completion_date: '',
    submission_info: '',
    task_image_url: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("You must be logged in!");
      return;
    }
    
    const taskData = {
      ...formData,
      required_workers: parseInt(formData.required_workers),
      payable_amount: parseInt(formData.payable_amount),
      buyer_email: auth.currentUser.email,
      buyer_name: auth.currentUser.displayName || 'Buyer',
    };

    const res = await fetchApi('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });

    if (res?.success) {
      toast.success("Task added successfully!");
      navigate('/dashboard/buyer/my-tasks');
    } else if (res?.error && res.error === 'Insufficient coins') {
      navigate('/dashboard/buyer/purchase-coin');
    }
  };

  return (
    <div className="text-slate-700 dark:text-slate-300 max-w-4xl mx-auto flex flex-col gap-6 w-full">
      <Helmet>
        <title>Taskynex | Add New Task</title>
      </Helmet>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Add New Task</h1>
        <p className="text-slate-500 mt-2">Create a new task and specify requirements.</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-700 dark:text-slate-200">Task Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="ex: Watch my YouTube video and comment" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-700 dark:text-slate-200">Task Detail</label>
            <textarea name="detail" value={formData.detail} onChange={handleChange} required rows={4} placeholder="Description of the task..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-700 dark:text-slate-200">Required Workers</label>
              <input type="number" name="required_workers" value={formData.required_workers} onChange={handleChange} required min="1" placeholder="100" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-700 dark:text-slate-200">Payment Amount (per worker)</label>
              <input type="number" name="payable_amount" value={formData.payable_amount} onChange={handleChange} required min="1" placeholder="10" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-700 dark:text-slate-200">Completion Date</label>
              <input type="date" name="completion_date" value={formData.completion_date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>

             <div className="flex flex-col gap-2">
              <label className="font-semibold text-slate-700 dark:text-slate-200">Task Image URL</label>
              <input type="url" name="task_image_url" value={formData.task_image_url} onChange={handleChange} required placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-slate-700 dark:text-slate-200">Submission Info Requirement</label>
            <input type="text" name="submission_info" value={formData.submission_info} onChange={handleChange} required placeholder="What to submit as proof (e.g., screenshot)" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" />
          </div>

          {formData.required_workers && formData.payable_amount && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl text-indigo-800 dark:text-indigo-300 flex justify-between items-center font-bold">
              <span>Total Cost (Coins):</span>
              <span className="text-xl">{parseInt(formData.required_workers) * parseInt(formData.payable_amount)} Coins</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="cursor-pointer w-full mt-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Processing..." : "Add Task"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
