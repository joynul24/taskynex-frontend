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
        setSubmissions(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 text-slate-900 dark:text-white">

      <Helmet>
        <title>Taskynex | My Submissions</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow text-slate-900 dark:text-white"
      >
        <h1 className="text-3xl font-bold">
          My Submissions
        </h1>

        <p className="text-slate-500 mt-2">
          Track the status of your submitted work.
        </p>
      </motion.div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl p-6 shadow text-slate-900 dark:text-white">

        <table className="table">

          <thead className="text-slate-700 dark:text-slate-300">
            <tr>
              <th>Task</th>
              <th>Buyer</th>
              <th>Pay</th>
              <th>Submission Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="text-slate-900 dark:text-white">

            {(submissions || []).map((submission) => (
              <tr
                key={submission._id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                  {submission.task_title}
                </td>

                <td className="p-3 text-slate-600 dark:text-slate-300">
                  {submission.buyer_name}
                </td>

                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                  {submission.payable_amount} Coins
                </td>

                <td className="p-3 text-slate-500 dark:text-slate-400 text-sm">
                  {new Date(submission.current_date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
        ${submission.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900"
                        : submission.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-900"
                          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900"
                      }`}
                  >
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        {submissions.length === 0 && (
          <div className="text-center py-10 text-slate-600 dark:text-slate-400">
            No submissions found.
          </div>
        )}

      </div>
    </div>
  );
}