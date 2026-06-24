import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity, FiCheckCircle, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';

export default function AdminHome() {
  const stats = [
    { label: "Total Workers", value: "1,245", icon: <FiUsers className="text-indigo-500 w-6 h-6" />, bg: "from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/5", border: "border-indigo-200 dark:border-indigo-500/20" },
    { label: "Total Buyers", value: "320", icon: <FiBriefcase className="text-cyan-500 w-6 h-6" />, bg: "from-cyan-50 to-cyan-100 dark:from-cyan-500/10 dark:to-cyan-500/5", border: "border-cyan-200 dark:border-cyan-500/20" },
    { label: "Available Coins", value: "485k", icon: <FiDollarSign className="text-emerald-500 w-6 h-6" />, bg: "from-emerald-50 to-emerald-100 dark:from-emerald-500/10 dark:to-emerald-500/5", border: "border-emerald-200 dark:border-emerald-500/20" },
    { label: "Total Payments", value: "$12,450", icon: <FiActivity className="text-purple-500 w-6 h-6" />, bg: "from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/5", border: "border-purple-200 dark:border-purple-500/20" },
  ];

  const withdrawals = [
    { id: 1, name: "Alex Rivera", email: "alex@example.com", coins: 500, amount: "$25.00", paymentMethod: "Bkash", status: "pending", date: "2023-11-20" },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", coins: 800, amount: "$40.00", paymentMethod: "Nagad", status: "pending", date: "2023-11-21" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", coins: 250, amount: "$12.50", paymentMethod: "Rocket", status: "pending", date: "2023-11-21" },
    { id: 4, name: "Elena Rodriguez", email: "elena@example.com", coins: 1000, amount: "$50.00", paymentMethod: "Bank", status: "pending", date: "2023-11-22" },
  ];

  const handleApprove = (id) => {
    toast.success(`Withdrawal request #${id} approved!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <Helmet>
        <title>Taskynex | Admin Dashboard</title>
      </Helmet>
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-3 mb-1">
             <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">Super Admin</span>
             <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
               <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-emerald-500"></motion.div> System Online
             </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Command Center</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg">Manage all platform activities, approve payouts, and oversee exponential growth metrics in real-time.</p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search users, tasks..." className="w-full md:w-64 pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white" />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            key={i} 
            className={`bg-gradient-to-br ${stat.bg} border ${stat.border} p-6 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden group cursor-default`}
          >
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1 opacity-80">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                 {stat.value}
                 {i === 3 && <FiTrendingUp size={16} className="text-emerald-500 animate-bounce" />}
              </h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-md relative z-10`}>
              {React.cloneElement(stat.icon, { size: 28 })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Withdrawal Requests Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 pointer-events-none"></div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
               <FiDollarSign className="text-emerald-600 dark:text-emerald-400" />
            </div>
            Pending Withdrawals
          </h2>
          <span className="bg-orange-100 border border-orange-200 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400 text-xs font-bold px-4 py-2 rounded-full relative z-10 shadow-sm">
            {withdrawals.length} Action Needed
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[13px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Withdrawal Details</th>
                <th className="px-6 py-5">Method</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
              {withdrawals.map((req, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                  key={req.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{req.name}</span>
                      <span className="text-xs text-slate-500">{req.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg leading-none">{req.amount}</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{req.coins} Coins</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {req.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-sm text-slate-500 dark:text-slate-400">{req.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleApprove(req.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <FiCheckCircle size={18} /> Approve
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
