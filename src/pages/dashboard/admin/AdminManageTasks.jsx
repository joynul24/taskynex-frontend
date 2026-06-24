import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

export default function AdminManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://taskynex-backend.vercel.app/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Task?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://taskynex-backend.vercel.app/tasks/${id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Task deleted successfully.", "success");
            setTasks(tasks.filter((task) => task._id !== id));
          }
        } catch (err) {
          console.log(err);
          Swal.fire("Error", "Failed to delete task.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4 py-6 text-slate-900 dark:text-white">
      <Helmet>
        <title>Taskynex | Manage Tasks</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all"
      >
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Manage Tasks
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
          Total Tasks : <span className="text-indigo-600 dark:text-indigo-400 font-bold">{tasks.length}</span>
        </p>
      </motion.div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 font-medium">
            No tasks available.
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            <table className="table w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider font-bold">
                  <th className="p-4 text-left w-16">#</th>
                  <th className="p-4 text-left">Task Title</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Buyer</th>
                  <th className="p-4 text-center">Workers</th>
                  <th className="p-4 text-left">Payable</th>
                  <th className="p-4 text-left">Deadline</th>
                  <th className="p-4 text-center w-24">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {tasks.map((task, index) => (
                  <tr 
                    key={task._id} 
                    className="text-slate-700 dark:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-200 ease-in-out group"
                  >
                    <td className="p-4 text-sm font-medium text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                      {task.title}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {task.buyer_email}
                    </td>
                    <td className="p-4 text-sm font-medium">
                      {task.buyer_name}
                    </td>
                    <td className="p-4 text-sm font-bold text-center">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-xs">
                        {task.required_workers}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      {task.payable_amount} Coins
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {task.completion_date}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="opacity-90 group-hover:opacity-100 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold px-3 py-1.5 rounded-xl text-xs tracking-wide border-none transition-all duration-150 shadow-sm hover:shadow-red-500/20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}