import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";

export default function BuyerHome() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = user?.email;

  // ================= AUTH =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ================= LOAD DATA =================
  useEffect(() => {
    if (!email) return;

    fetchStats();
    fetchSubmissions();
  }, [email]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `https://taskynex-backend.vercel.app/buyer/stats/${email}`
      );
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://taskynex-backend.vercel.app/submissions/buyer/${email}`
      );

      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= APPROVE =================
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `https://taskynex-backend.vercel.app/submissions/approve/${id}`
      );

      fetchSubmissions();
      fetchStats();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REJECT =================
  const handleReject = async (id) => {
    try {
      await axios.patch(
        `https://taskynex-backend.vercel.app/submissions/reject/${id}`
      );

      fetchSubmissions();
      fetchStats();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOADING =================
  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Loading user...
      </p>
    );
  }

  if (!email) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Please login first
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 text-slate-900 dark:text-slate-100">

      <Helmet>
        <title>Taskynex | Buyer Dashboard</title>
      </Helmet>

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border"
      >
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Buyer Dashboard</h1>
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Stat title="Total Tasks" value={stats?.totalTasks || 0} />

        <Stat
          title="Pending Workers"
          value={stats?.pendingWorkers || 0}
        />

        <Stat
          title="Total Payment"
          value={`$${stats?.totalPayment || 0}`}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border overflow-x-auto">

        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          Tasks To Review
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400">
            No submissions found
          </p>
        ) : (
          <table className="w-full text-sm">

            <thead>
              <tr className="bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">
                <th className="p-3 text-left">Worker</th>
                <th className="p-3 text-left">Task</th>
                <th className="p-3 text-left">Pay</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {(submissions || []).map((sub) => (
                <tr
                  key={sub._id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >

                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {sub.worker_name || sub.worker_email}
                  </td>

                  <td className="p-3 text-slate-700 dark:text-slate-300">
                    {sub.task_title}
                  </td>

                  <td className="p-3 text-indigo-600 dark:text-indigo-400 font-bold">
                    ${sub.payable_amount}
                  </td>

                  <td className="p-3">

                    <div className="flex gap-2 justify-center">

                      {/* VIEW */}
                      <button
                        onClick={() => setSelected(sub)}
                        className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition cursor-pointer"
                      >
                        View
                      </button>

                      {/* APPROVE */}
                      <button
                        onClick={() => handleApprove(sub._id)}
                        className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer"
                      >
                        Approve
                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() => handleReject(sub._id)}
                        className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition cursor-pointer"
                      >
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-[400px]"
          >

            <h2 className="text-xl font-bold mb-2">
              Submission Details
            </h2>

            <p><b>Task:</b> {selected.task_title}</p>
            <p><b>Worker:</b> {selected.worker_email}</p>
            <p><b>Amount:</b> ${selected.payable_amount}</p>
            <p className="mt-2 text-sm text-gray-500">
              {selected.submission_detail || "No details"}
            </p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded"
            >
              Close
            </button>

          </motion.div>

        </div>
      )}

    </div>
  );
}

// ================= STAT COMPONENT =================
function Stat({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        {value}
      </h2>
    </div>
  );
}