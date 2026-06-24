import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaCoins, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebase.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BuyerPurchaseCoin() {
  const user = auth.currentUser;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      id: 1,
      coins: 10,
      price: 1,
      gradient: "from-cyan-500 to-blue-600",
      popular: false,
    },
    {
      id: 2,
      coins: 150,
      price: 10,
      gradient: "from-purple-600 to-pink-500",
      popular: true,
    },
    {
      id: 3,
      coins: 500,
      price: 20,
      gradient: "from-orange-500 to-red-500",
      popular: false,
    },
    {
      id: 4,
      coins: 1000,
      price: 35,
      gradient: "from-green-500 to-emerald-600",
      popular: false,
    },
  ];

  const handlePurchase = async (pack) => {
    const result = await Swal.fire({
      title: "Purchase Coins?",
      html: `
      <h2 style="font-size:32px;font-weight:bold">${pack.coins} Coins</h2>
      <br/>
      <p>This is a Dummy Payment System.</p>
      <h1 style="color:#2563eb">$${pack.price}</h1>
      `,
      icon: "question",
      confirmButtonText: "Yes, Purchase",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      await axios.post("https://taskynex-backend.vercel.app/payments/dummy", {
        email: user.email,
        name: user.displayName,
        coins: pack.coins,
        amount: pack.price,
      });

      window.dispatchEvent(new Event("coinUpdated"));

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `${pack.coins} Coins Added Successfully.`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard/buyer/payment-history");
      });

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8 pb-10">

      <Helmet>
        <title>Taskynex | Purchase Coin</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl"
      >
        <h1 className="text-4xl font-black">
          Purchase Coins
        </h1>

        <p className="mt-3 opacity-90 text-lg">
          Choose your preferred package and instantly receive coins.
          (Dummy Payment)
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {packages.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.05,
              y: -10,
            }}
            whileTap={{
              scale: .95,
            }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${pack.gradient} p-8 shadow-2xl text-white cursor-pointer`}
          >

            {pack.popular && (
              <div className="absolute top-4 right-4 bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <FaCrown />
                Popular
              </div>
            )}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="text-6xl mb-6"
            >
              <FaCoins />
            </motion.div>

            <h2 className="text-5xl font-black">
              {pack.coins}
            </h2>

            <p className="text-lg opacity-90 mt-2">
              Coins
            </p>

            <div className="mt-8">
              <p className="text-sm opacity-80">
                Price
              </p>

              <h1 className="text-4xl font-black">
                ${pack.price}
              </h1>
            </div>

            <button
              disabled={loading}
              onClick={() => handlePurchase(pack)}
              className="mt-8 w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:scale-105 duration-300"
            >
              {loading ? "Processing..." : "Purchase Now"}
            </button>

            <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-white/10"></div>

            <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-white/10"></div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

