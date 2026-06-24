import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WorkerTaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/tasks")
            .then(res => {
                if (Array.isArray(res.data)) {
                    setTasks(res.data);
                } else if (res.data && Array.isArray(res.data.tasks)) {
                    setTasks(res.data.tasks);
                } else {
                    setTasks([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setTasks([]);
                setLoading(false);
            });
    }, []);

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    return (
        <div className="max-w-7xl text-slate-800 dark:text-slate-100 mx-auto flex flex-col gap-6">

            <Helmet>
                <title>Taskynex | Task List</title>
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800"
            >
                <h1 className="text-3xl text-slate-700 dark:text-slate-300 font-black">
                    Available Tasks
                </h1>

                <p className="text-gray-500 dark:text-slate-400 mt-2">
                    Find and complete tasks to earn coins.
                </p>
            </motion.div>

            {
                loading ?

                    <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                        Loading...
                    </div>

                    :

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {safeTasks.map(task => (

                            <div
                                key={task._id}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 p-5 transition-colors"
                            >

                                <img
                                    src={task.task_image_url}
                                    alt=""
                                    className="w-full h-48 object-cover rounded-lg border border-slate-100 dark:border-slate-800"
                                />

                                <h2 className="font-bold text-xl mt-4 text-slate-900 dark:text-white truncate">
                                    {task.task_title}
                                </h2>

                                <p className="mt-2 text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        Buyer :
                                    </span>{" "}
                                    {task.buyer_name}
                                </p>

                                <p className="text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        Completion :
                                    </span>{" "}
                                    {task.completion_date}
                                </p>

                                <p className="text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        Pay :
                                    </span>{" "}
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                                        {task.payable_amount} Coins
                                    </span>
                                </p>

                                <p className="text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        Required Workers :
                                    </span>{" "}
                                    {task.required_workers}
                                </p>

                                <Link
                                    to={`/dashboard/task-details/${task._id}`}
                                    className="btn btn-primary w-full mt-4 block text-center"
                                >
                                    View Details
                                </Link>

                            </div>

                        ))}

                    </div>
            }

        </div>
    );
}
