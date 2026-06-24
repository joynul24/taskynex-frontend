import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { auth } from "../../../firebase/firebase.config";

export default function WorkerSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`/submissions/worker/${user.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSubmissions(res.data);
        } else if (res.data && Array.isArray(res.data.submissions)) {
          setSubmissions(res.data.submissions);
        } else {
          setSubmissions([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmissions([]);
      });
  }, [user]);

  const safeSubmissions = Array.isArray(submissions) ? submissions : [];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 text-slate-900 dark:text-white">

      <Helmet>
        <title>Taskynex | My Submissions</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800"
      >
        <h1 className="text-3xl font-bold">
          My Submissions
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track the status of your submitted work.
        </p>
      </motion.div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl p-6 shadow text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800">

        <table className="table w-full">

          <thead className="text-slate-700 dark:text-slate-300">
            <tr>
              <th className="text-left p-3">Task</th>
              <th className="text-left p-3">Buyer</th>
              <th className="text-left p-3">Pay</th>
              <th className="text-left p-3">Submission Date</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-slate-900 dark:text-white">

            {safeSubmissions.map((submission) => (
              <tr
                key={submission._id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                  {submission.task_title || "N/A"}
                </td>

                <td className="p-3 text-slate-600 dark:text-slate-300">
                  {submission.buyer_name || "Unknown"}
                </td>

                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                  {submission.payable_amount} Coins
                </td>

                <td className="p-3 text-slate-500 dark:text-slate-400 text-sm">
                  {submission.current_date ? new Date(submission.current_date).toLocaleDateString() : "N/A"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                    ${submission.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/30"
                        : submission.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-900/30"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                      }`}
                  >
                    {submission.status || "pending"}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        {safeSubmissions.length === 0 && (
          <div className="text-center py-10 text-slate-600 dark:text-slate-400">
            No submissions found.
          </div>
        )}

      </div>
    </div>
  );
}