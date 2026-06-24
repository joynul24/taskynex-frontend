import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { auth } from '../../../firebase/firebase.config';

export default function BuyerPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = auth?.currentUser?.email;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://taskynex-backend.vercel.app/payments/${userEmail}`
        );

        const data = await res.json();
        setPayments(data);
      } catch (error) {
        console.error("Failed to load payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userEmail]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <Helmet>
        <title>Taskynex | Payment History</title>
      </Helmet>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Payment History
        </h1>
        <p className="text-slate-500 mt-2">
          View all your coin purchase transactions
        </p>
      </motion.div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        {loading ? (
          <p className="text-slate-400 text-center py-10">
            Loading payment history...
          </p>
        ) : payments.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            No payment history found
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3">#</th>
                <th className="py-3">Transaction ID</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Coins</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((pay, index) => (
                <motion.tr
                  key={pay._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(148, 163, 184, 0.1)",
                  }}
                  className="border-b border-slate-100 dark:border-slate-800 transition"
                >
                  <td className="py-3">{index + 1}</td>

                  <td className="py-3 font-mono text-xs text-slate-500">
                    {pay.transactionId || "N/A"}
                  </td>

                  <td className="py-3 font-semibold text-slate-900 dark:text-white">
                    ${pay.amount}
                  </td>

                  <td className="py-3 text-indigo-500 font-bold">
                    {pay.coins} Coins
                  </td>

                  <td className="py-3 text-slate-500">
                    {pay.createdAt
                      ? new Date(pay.createdAt).toLocaleString()
                      : "N/A"}
                  </td>

                  <td className="py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Success
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}