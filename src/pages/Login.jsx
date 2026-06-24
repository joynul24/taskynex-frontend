import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { auth, googleProvider } from '../firebase/firebase.config.js';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useApi } from '../api/useApi.js';

export default function Login() {
  const navigate = useNavigate();
  const { fetchApi } = useApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const navigateBasedOnRole = (role) => {
    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'buyer') navigate('/dashboard/buyer');
    else navigate('/dashboard/worker');
  };

  const getRoleAndNavigate = async (userEmail, userName = '', photoUrl = '') => {
    try {
      const user = await fetchApi(`/users/${userEmail}`);

      // Existing user
      if (user) {
        localStorage.setItem('user-role', user.role);
        navigateBasedOnRole(user.role);
        return;
      }

      // New Google user
      const newUser = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: userName || 'Google User',
          email: userEmail,
          photoUrl: photoUrl || '',
          role: 'worker',
        }),
      });

      if (newUser?.success) {
        localStorage.setItem('user-role', newUser.user.role);
        navigateBasedOnRole(newUser.user.role);
      } else {
        toast.error('Registration failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginLoading) return;
    setLoginLoading(true);

    try {
      // ✅ ADMIN SHORTCUT LOGIN (NO FIREBASE)
      if (email === 'admin' && password === 'devjoynul26') {
        localStorage.setItem('user-role', 'admin');
        toast.success('Welcome back, Admin!');
        navigate('/dashboard/admin');
        return;
      }

      // ✅ NORMAL USERS ONLY FIREBASE LOGIN
      const result = await signInWithEmailAndPassword(auth, email, password);

      toast.success('Successfully logged in!');

      await getRoleAndNavigate(
        result.user.email,
        result.user.displayName,
        result.user.photoURL
      );

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoginLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    if (loginLoading) return;

    setLoginLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      toast.success('Logged in with Google!');

      await getRoleAndNavigate(
        result.user.email,
        result.user.displayName,
        result.user.photoURL
      );
    } catch (err) {
      toast.error(err.message || 'Google Login Failed');
    } finally {
      setLoginLoading(false);
    }
  };


  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <Helmet>
        <title>Taskynex | Login</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl dark:shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400">Sign in to your Taskynex account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com (or 'admin')"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-slate-700" />
              <span className="text-slate-600 dark:text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${loginLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
          >
            {loginLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <FiLogIn />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          <span className="text-xs text-slate-400 uppercase font-medium">Or continue with</span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loginLoading}
          className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loginLoading ? 'Please wait...' : 'Sign in with Google'}
        </button>

        <p className="text-center mt-8 text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Register now</Link>
        </p>
      </motion.div>
    </div>
  );
}