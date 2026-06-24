import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);

    const res = await fetch("https://taskynex-backend.vercel.app/admin/users");
    const data = await res.json();

    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this user?");

    if (!ok) return;

    const res = await fetch(
      `https://taskynex-backend.vercel.app/admin/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("User Removed");
      loadUsers();
    }
  };

  const handleRoleChange = async (id, role) => {
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
      loadUsers();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <Helmet>
        <title>Manage Users</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Total Users : {users.length}
        </p>
      </motion.div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow overflow-auto">

        {loading ? (
          <div className="p-10 text-center text-gray-900 dark:text-white">
            Loading...
          </div>
        ) : (
          <table className="table w-full text-gray-900 dark:text-white">

            <thead className="text-gray-900 dark:text-white">

              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Coin</th>
                <th>Role</th>
                <th>Update Role</th>
                <th>Remove</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr key={user._id}>

                  <td>

                    <img
                      src={
                        user.photoUrl ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />

                  </td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.coins}</td>

                  <td>

                    <span className="badge badge-primary">
                      {user.role}
                    </span>

                  </td>

                  <td>

                    <select
                      className="select select-bordered text-gray-900 dark:text-white bg-white dark:bg-slate-800"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="admin">
                        Admin
                      </option>

                      <option value="buyer">
                        Buyer
                      </option>

                      <option value="worker">
                        Worker
                      </option>

                    </select>

                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                      className="btn bg-red-500 border-none btn-sm"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}