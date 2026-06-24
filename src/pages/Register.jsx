import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiImage, FiBriefcase } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../firebase/firebase.config.js';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useApi } from '../api/useApi.js';

export default function Register() {
  const navigate = useNavigate();
  const { fetchApi } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    email: '',
    password: '',
    role: 'worker'
  });

  const navigateBasedOnRole = (role) => {
    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'buyer') navigate('/dashboard/buyer');
    else navigate('/dashboard/worker');
  };

  const getRoleAndNavigate = async (userEmail, userName, photoUrl, userRole) => {
    // Register user in db
    const registerRes = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: userName || 'User',
        email: userEmail,
        photoUrl: photoUrl || '',
        role: userRole || 'worker'
      })
    });

    if (registerRes?.success) {
      const role = registerRes.user.role;

      localStorage.setItem("user-role", role);
      navigateBasedOnRole(role);
    } else {
      toast.error("Registration failed");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(result.user, {
        displayName: formData.name,
        photoURL: formData.photoUrl
      });
      toast.success("Account created successfully!");
      await getRoleAndNavigate(result.user.email, formData.name, formData.photoUrl, formData.role);
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Registered with Google successfully!");
      // default google to worker
      await getRoleAndNavigate(result.user.email, result.user.displayName, result.user.photoURL, 'worker');
    } catch (error) {
      toast.error("Google registration failed.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center py-12 px-6">
      <Helmet>
        <title>Taskynex | Register</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl dark:shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400">Join Taskynex as a Worker or Buyer</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Profile URL</label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://..." className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Role</label>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all appearance-none cursor-pointer">
                <option value="worker">Worker (Earn Coins)</option>
                <option value="buyer">Buyer (Create Tasks)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
            Create Account
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          <span className="text-xs text-slate-400 uppercase font-medium">Or register with</span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Register with Google
        </button>

        <p className="text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

