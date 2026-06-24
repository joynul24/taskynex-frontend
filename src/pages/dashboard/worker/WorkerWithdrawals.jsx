import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { auth } from "../../../firebase/firebase.config";

export default function WorkerWithdrawals() {
  const user = auth.currentUser;

  const [coins, setCoins] = useState(0);
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [history, setHistory] = useState([]);

  const withdrawAmount = withdrawCoin ? withdrawCoin / 20 : 0;

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://taskynex-backend.vercel.app/users/${user.email}`)
      .then((res) => setCoins(res.data?.coins || 0));

    axios
      .get(`https://taskynex-backend.vercel.app/withdrawals/worker/${user.email}`)
      .then((res) => setHistory(res.data || []));
  }, [user?.email]);

  const isEligible = withdrawCoin >= 200 && withdrawCoin <= coins;

  const handleWithdraw = async () => {
    const payload = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: Number(withdrawCoin),
      withdrawal_amount: Number(withdrawAmount),
      payment_system: paymentSystem,
      account_number: accountNumber,
    };

    await axios.post("https://taskynex-backend.vercel.app/withdrawals", payload);

    alert("Withdrawal request sent!");
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">

      <Helmet>
        <title>Taskynex | Withdrawals</title>
      </Helmet>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-6 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl"
      >
        <h1 className="text-3xl font-extrabold">Withdrawals 💸</h1>

        <p className="mt-2 opacity-90 text-white/90">
          Manage your earnings and cash out easily
        </p>

        <div className="mt-4 flex gap-6 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur text-white">
            Coins: <b>{coins}</b>
          </div>

          <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur text-white">
            Balance: <b>${(coins / 20).toFixed(2)}</b>
          </div>
        </div>
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg space-y-4 hover:shadow-2xl transition-all duration-300"
      >

        {/* Coin input */}
        <input
          type="number"
          placeholder="Enter coins to withdraw"
          value={withdrawCoin}
          onChange={(e) => setWithdrawCoin(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700
          bg-white dark:bg-slate-800 text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Amount */}
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-semibold">
          Withdraw Amount: ${withdrawAmount}
        </div>

        {/* Payment */}
        <select
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700
          bg-white dark:bg-slate-800 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(e) => setPaymentSystem(e.target.value)}
        >
          <option value="">Select Payment System</option>
          <option value="bkash">Bkash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
          <option value="other">Other</option>
        </select>

        {/* Account */}
        <input
          type="text"
          placeholder="Account Number"
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-700
          bg-white dark:bg-slate-800 text-gray-900 dark:text-white
          focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        {/* Button */}
        {isEligible ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWithdraw}
            className="w-full py-3 rounded-xl font-bold text-white
            bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg
            hover:shadow-2xl transition-all"
          >
            Withdraw Now 🚀
          </motion.button>
        ) : (
          <p className="text-red-500 font-semibold text-center">
            Insufficient coins (Minimum 200 required)
          </p>
        )}
      </motion.div>

      {/* HISTORY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Withdraw History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No withdrawals yet
          </p>
        ) : (
          history.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 mb-2 rounded-xl border border-gray-200 dark:border-slate-700
              bg-gray-50 dark:bg-slate-800 hover:shadow-md transition"
            >
              <div className="flex justify-between text-gray-900 dark:text-white">
                <span>💰 {item.withdrawal_coin} coins</span>
                <span className="font-bold text-indigo-500">
                  ${item.withdrawal_amount}
                </span>
              </div>

              <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                Status:{" "}
                <span className="font-semibold text-yellow-500">
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
