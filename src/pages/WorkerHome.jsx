import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiCheckSquare,
  FiActivity,
  FiDollarSign,
  FiClock,
  FiZap,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function WorkerHome() {
  const [user, setUser] = useState(null);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // DB user
  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axios.get(
        `https://taskynex-backend.vercel.app/users/${user.email}`
      );
      return res.data;
    },
  });

  // Submissions
  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axios.get(
        `https://taskynex-backend.vercel.app/submissions/worker/${user.email}`
      );
      return res.data;
    },
  });

  // Role request
  const handleRequestRole = async () => {
    if (!dbUser) {
      toast.error("User not found");
      return;
    }

    const res = await fetch("https://taskynex-backend.vercel.app/role-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: dbUser?.email,
        name: dbUser?.name,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  // Stats calculation
  const totalSubmissions = submissions.length;

  const pendingSubmissions = useMemo(
    () => submissions.filter((s) => s.status === "pending").length,
    [submissions]
  );

  const approvedSubmissions = useMemo(
    () => submissions.filter((s) => s.status === "approved"),
    [submissions]
  );

  const totalEarning = useMemo(() => {
    return approvedSubmissions.reduce((sum, item) => {
      return sum + Number(item.payable_amount || 0);
    }, 0);
  }, [approvedSubmissions]);

  const totalCoins = useMemo(() => {
    return submissions
      .filter((s) => s.status === "approved")
      .reduce((sum, item) => {
        return (
          sum +
          Number(
            item.payable_amount ||
            item.amount ||
            item.coin ||
            0
          )
        );
      }, 0);
  }, [submissions]);

  // Stats UI
  const stats = [
    {
      label: "Total Submissions",
      value: totalSubmissions,
      icon: <FiCheckSquare className="text-indigo-500 w-6 h-6" />,
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      label: "Pending Submissions",
      value: pendingSubmissions,
      icon: <FiClock className="text-orange-500 w-6 h-6" />,
      bg: "bg-orange-50 dark:bg-orange-500/10",
    },
    {
      label: "Total Earning",
      value: `${totalSubmissions} Coins`,
      icon: <FiDollarSign className="text-emerald-500 w-6 h-6" />,
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
  ];

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <Helmet>
        <title>Taskynex | Worker Dashboard</title>
      </Helmet>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Worker Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back. Here is your progress overview.
          </p>
        </div>

        <button
          onClick={handleRequestRole}
          className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <FiZap size={18} /> Request to be Buyer
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(stats || []).map((stat, i) => (
          <motion.div
            key={stat.id || i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}
            >
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <FiActivity className="text-indigo-500" />
            Recent Approved Submissions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4">Task Title</th>
                <th className="px-6 py-4">Buyer</th>
                <th className="px-6 py-4">Coins</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {approvedSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400"
                  >
                    No approved submissions yet
                  </td>
                </tr>
              ) : (
                (approvedSubmissions || []).map((sub, i) => (
                  <tr
                    key={sub._id || i}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {sub.task_title || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {sub.buyer_email}
                    </td>

                    <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {sub.payable_amount} Coins
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-900/30">
                        approved
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}