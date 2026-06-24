import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

export default function AdminManageTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Task?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tasks/${id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Task deleted successfully.", "success");

            setTasks(tasks.filter((task) => task._id !== id));
          }
        } catch (err) {
          console.log(err);
          Swal.fire("Error", "Failed to delete task.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">

      <Helmet>
        <title>Taskynex | Manage Tasks</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm"
      >
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Manage Tasks
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Total Tasks : {tasks.length}
        </p>
      </motion.div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm overflow-x-auto">

        {loading ? (
          <div className="flex justify-center py-16 text-gray-900 dark:text-white">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <table className="table w-full text-gray-900 dark:text-white">

            <thead className="text-gray-900 dark:text-white">
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Email</th>
                <th>Buyer</th>
                <th>Workers</th>
                <th>Payable</th>
                <th>Deadline</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id} className="text-gray-900 dark:text-white">

                  <td>{index + 1}</td>

                  <td>{task.title}</td>

                  <td>{task.buyer_email}</td>

                  <td>{task.buyer_name}</td>

                  <td>{task.required_workers}</td>

                  <td>${task.payable_amount}</td>

                  <td>{task.completion_date}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn bg-red-500 border-none btn-sm"
                    >
                      Delete
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










// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { motion } from 'framer-motion';

// export default function AdminManageTasks() {
//   return (
//     <div className="max-w-7xl mx-auto flex flex-col gap-6">
//       <Helmet>
//         <title>Taskynex | Manage Tasks</title>
//       </Helmet>
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
//         <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Tasks</h1>
//         <p className="text-slate-500 mt-2">Oversee all tasks, delete inappropriate ones, and monitor platform health.</p>
//       </motion.div>
//       <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex items-center justify-center">
//         <p className="text-slate-400">Loading all tasks from database...</p>
//       </div>
//     </div>
//   );
// }
