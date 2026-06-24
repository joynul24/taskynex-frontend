import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/firebase.config";

export default function TaskDetails() {

    const { id } = useParams();
    const navigate = useNavigate()
    const [task, setTask] = useState({});
    const user = auth?.currentUser;

    const [submissionDetails, setSubmissionDetails] = useState("");

    useEffect(() => {

        axios.get(`https://taskynex-backend.vercel.app/tasks/${id}`)
            .then(res => {
                setTask(res.data);
            });

    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const submission = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,

            worker_email: user.email,
            worker_name: user.displayName,

            buyer_name: task.buyer_name,
            buyer_email: task.buyer_email,

            submission_details: submissionDetails,
        };

        try {
            const res = await axios.post(
                "https://taskynex-backend.vercel.app/submissions",
                submission
            );

            if (res.data.insertedId) {
                toast.success("Task submitted successfully");
                setSubmissionDetails("");
                navigate("/dashboard/worker/submissions")
            }
        } catch (err) {
            toast.error("Submission failed");
        }
    };


    return (

        <div className="max-w-4xl mx-auto font-sans transition-colors duration-300
bg-white text-slate-900
dark:bg-slate-950 dark:text-slate-200">

            <img
                src={task.task_image_url}
                className="rounded-xl"
            />

            <h1 className="text-3xl font-bold mt-5">
                {task.task_title}
            </h1>

            <p className="mt-5">
                {task.task_detail}
            </p>

            <div className="mt-5 space-y-2">

                <p>
                    Buyer :
                    {task.buyer_name}
                </p>

                <p>
                    Pay :
                    {task.payable_amount}
                </p>

                <p>
                    Completion :
                    {task.completion_date}
                </p>

                <p>
                    Workers :
                    {task.required_workers}
                </p>

            </div>
         <div className="mt-10 border rounded-xl p-6 bg-white dark:bg-slate-900">

    <h2 className="text-2xl font-bold mb-5">
        Submit Your Work
    </h2>

    <form onSubmit={handleSubmit}>

        <textarea
            required
            rows="6"
            value={submissionDetails}
            onChange={(e)=>setSubmissionDetails(e.target.value)}
            placeholder="Write your submission details..."
            className="w-full border rounded-lg p-4 bg-transparent"
        />

        <button
            className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
            Submit Task
        </button>

    </form>

</div>
        </div>

    );
}