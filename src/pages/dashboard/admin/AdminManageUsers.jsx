import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://taskynex-backend.vercel.app/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;

    try {
      const res = await fetch(
        `https://taskynex-backend.vercel.app/admin/users/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success || data.deletedCount > 0) {
        toast.success("User Removed");
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove user");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await fetch(
        `https://taskynex-backend.vercel.app/admin/users/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Role Updated");
        setUsers(
          users.map((user) => (user._id === id ? { ...user, role } : user))
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4 py-6 text-slate-900 dark:text-white">
      <Helmet>
        <title>Taskynex | Manage Users</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all"
      >
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Manage Users
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
          Total Users : <span className="text-indigo-600 dark:text-indigo-400 font-bold">{users.length}</span>
        </p>
      </motion.div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 font-medium">
            No users available.
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            <table className="table w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider font-bold">
                  <th className="p-4 text-left w-20">Photo</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Coins</th>
                  <th className="p-4 text-left">Current Role</th>
                  <th className="p-4 text-left">Update Role</th>
                  <th className="p-4 text-center w-24">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="text-slate-700 dark:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-200 ease-in-out group"
                  >
                    <td className="p-4">
                      <img
                        src={user.photoUrl || "https://ui-avatars.com/api/?name=User"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                      />
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {user.email}
                    </td>
                    <td className="p-4 text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      {user.coins ?? 0} Coins
                    </td>
                    <td className="p-4 text-sm font-medium">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200 dark:border-purple-900/30"
                          : user.role === "buyer"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        className="select select-bordered select-sm text-sm rounded-xl font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                        <option value="worker">Worker</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="opacity-90 group-hover:opacity-100 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold px-3 py-1.5 rounded-xl text-xs tracking-wide border-none transition-all duration-150 shadow-sm hover:shadow-red-500/20"
                      >
                        Remove
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