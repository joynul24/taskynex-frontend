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

            {submissions.map((submission) => (

              <tr key={submission._id}>

                <td>{submission.task_title}</td>

                <td>{submission.buyer_name}</td>

                <td>{submission.payable_amount} Coins</td>

                <td>
                  {new Date(
                    submission.current_date
                  ).toLocaleDateString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm
                    ${submission.status === "pending"
                        ? "bg-yellow-500"
                        : submission.status === "approved"
                          ? "bg-green-600"
                          : "bg-red-600"
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