import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { auth } from '../../../firebase/firebase.config.js';
import { useApi } from '../../../api/useApi.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function BuyerMyTasks() {
  const { fetchApi, loading } = useApi();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const [editingTask, setEditingTask] = useState(null);

  const [updateForm, setUpdateForm] = useState({
    title: '',
    detail: '',
    required_workers: '',
    payable_amount: '',
    completion_date: '',
    submission_info: '',
    task_image_url: '',
  });


  const handleEdit = (task) => {
    setEditingTask(task);

    setUpdateForm({
      title: task.title,
      detail: task.detail,
      required_workers: task.required_workers,
      payable_amount: task.payable_amount,
      completion_date: task.completion_date,
      submission_info: task.submission_info,
      task_image_url: task.task_image_url,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);

    setUpdateForm({
      title: '',
      detail: '',
      required_workers: '',
      payable_amount: '',
      completion_date: '',
      submission_info: '',
      task_image_url: '',
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchApi(
      `/tasks/${editingTask._id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updateForm),
      }
    );

    if (res?.success) {
      toast.success("Task Updated Successfully");
      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id
            ? {
              ...task,
              ...updateForm,
            }
            : task
        )
      );

      closeModal();
      navigate("/dashboard/buyer/my-tasks");
    }
  };



  const loadTasks = useCallback(async () => {
    if (!auth.currentUser?.email) return;

    const data = await fetchApi(
      `/tasks/buyer/${auth.currentUser.email}`
    );

    if (data) setTasks(data);
  }, [fetchApi]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (id) => {
    const res = await fetchApi(`/tasks/${id}`, {
      method: 'DELETE',
    });

    if (res) {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4 md:px-6">
      <Helmet>
        <title>Taskynex | My Tasks</title>
      </Helmet>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-indigo-100 text-sm mt-1">
          Manage and control your posted tasks
        </p>
      </motion.div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-400">No tasks found</p>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">

                {/* HEADER */}
                <thead>
                  <tr className="bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">
                    <th className="p-3 text-left whitespace-nowrap">Image</th>
                    <th className="p-3 text-left whitespace-nowrap">Title</th>
                    <th className="p-3 text-center whitespace-nowrap">Workers</th>
                    <th className="p-3 text-center whitespace-nowrap">Pay</th>
                    <th className="p-3 text-center whitespace-nowrap">Total</th>
                    <th className="p-3 text-center whitespace-nowrap">Date</th>
                    <th className="p-3 text-center whitespace-nowrap">Action</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {(tasks || []).map((task) => (
                    <tr
                      key={task._id}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800/50 transition"
                    >
                      <td className="p-3">
                        <img
                          src={task.task_image_url}
                          alt="task"
                          className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                        />
                      </td>

                      <td className="p-3 font-semibold text-slate-800 dark:text-white max-w-[220px] truncate">
                        {task.title}
                      </td>

                      <td className="text-center">
                        <span className="px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                          {task.required_workers}
                        </span>
                      </td>

                      <td className="text-center text-slate-600 dark:text-slate-300">
                        ${task.payable_amount}
                      </td>

                      <td className="text-center font-bold text-indigo-600 dark:text-indigo-400">
                        {task.required_workers * task.payable_amount}
                      </td>

                      <td className="text-center text-slate-500 dark:text-slate-400">
                        {task.completion_date}
                      </td>

                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="px-3 py-1 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(task._id)}
                          className="px-3 py-1 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="lg:hidden space-y-4 mt-4 w-full">
              {(tasks || []).map((task) => (
                <div
                  key={task._id}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition w-full"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={task.task_image_url}
                      alt="task"
                      className="w-12 h-12 object-cover rounded-lg border border-slate-100 dark:border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-slate-800 dark:text-white text-sm sm:text-base break-words whitespace-normal line-clamp-2" title={task.title}>
                        {task.title}
                      </h2>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Date: {task.completion_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3 text-sm border-t border-slate-100 dark:border-slate-800/60 pt-2.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      Workers: <span className="text-slate-700 dark:text-slate-300 font-semibold">{task.required_workers}</span>
                    </span>

                    <span className="text-slate-600 dark:text-slate-300">
                      Pay: <span className="text-emerald-600 dark:text-emerald-400 font-bold">${task.payable_amount}</span>
                    </span>
                  </div>

                  <div className="mt-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    Total: <span className="text-slate-900 dark:text-white">${(task.required_workers * task.payable_amount).toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(task)}
                      className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition active:scale-95 cursor-pointer"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white transition active:scale-95 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL HERE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl text-white bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">

            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-5">
              <h2 className="text-2xl font-bold text-white">
                Update Task
              </h2>
            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="p-6 space-y-4"
            >

              <input
                type="text"
                value={updateForm.title}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    title: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl border"
                placeholder="Task Title"
              />

              <textarea
                rows="4"
                value={updateForm.detail}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    detail: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl border"
                placeholder="Task Detail"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="number"
                  value={updateForm.required_workers}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      required_workers: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl border"
                  placeholder="Workers"
                />

                <input
                  type="number"
                  value={updateForm.payable_amount}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      payable_amount: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl border"
                  placeholder="Pay Amount"
                />

              </div>

              <input
                type="date"
                value={updateForm.completion_date}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    completion_date: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl border"
              />

              <input
                type="text"
                value={updateForm.submission_info}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    submission_info: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl border"
                placeholder="Submission Info"
              />

              <input
                type="url"
                value={updateForm.task_image_url}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    task_image_url: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl border"
                placeholder="Image URL"
              />

              {updateForm.task_image_url && (
                <img
                  src={updateForm.task_image_url}
                  alt="preview"
                  className="w-24 h-24 rounded-2xl object-cover border"
                />
              )}

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl text-red-500 bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-indigo-600 text-white cursor-pointer"
                >
                  Update Task
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}