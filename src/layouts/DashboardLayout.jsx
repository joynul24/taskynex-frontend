import { useState, useEffect, useCallback } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiPlusCircle, FiUsers, FiDollarSign, FiLogOut, FiCheckSquare, FiArchive, FiLayout, FiMenu, FiX } from 'react-icons/fi';
import { auth } from '../firebase/firebase.config.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useTheme } from '../context/ThemeProvider.jsx';
import { FiMoon, FiSun } from "react-icons/fi";
import axios from "axios";

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [dbUser, setDbUser] = useState(null);


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `https://taskynex-backend.vercel.app/users/${user.email}`
      );

      setDbUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchUser();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUser = localStorage.getItem("updatedUser");

      if (updatedUser) {
        setDbUser(JSON.parse(updatedUser));
        localStorage.removeItem("updatedUser");
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCoin = () => {
      fetchUser();
    };

    window.addEventListener("coinUpdated", updateCoin);

    return () => {
      window.removeEventListener("coinUpdated", updateCoin);
    };
  }, [user]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Decide role based on localStorage
  const userRole = dbUser?.role;

  const availableCoins = dbUser?.coins;

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('user-role');
    navigate('/login');
  };

  const workerMenu = [
    { label: 'Home', path: '/dashboard/worker', icon: <FiHome size={18} /> },
    { label: 'Task List', path: '/dashboard/worker/tasks', icon: <FiList size={18} /> },
    { label: 'My Submissions', path: '/dashboard/worker/submissions', icon: <FiCheckSquare size={18} /> },
    { label: 'Withdrawals', path: '/dashboard/worker/withdrawals', icon: <FiDollarSign size={18} /> },
  ];

  const buyerMenu = [
    { label: 'Home', path: '/dashboard/buyer', icon: <FiHome size={18} /> },
    { label: 'Add New Task', path: '/dashboard/buyer/add-task', icon: <FiPlusCircle size={18} /> },
    { label: 'My Tasks', path: '/dashboard/buyer/my-tasks', icon: <FiArchive size={18} /> },
    { label: 'Purchase Coin', path: '/dashboard/buyer/purchase-coin', icon: <FiDollarSign size={18} /> },
    { label: 'Payment History', path: '/dashboard/buyer/payment-history', icon: <FiDollarSign size={18} /> },
  ];

  const adminMenu = [
    { label: 'Home', path: '/dashboard/admin', icon: <FiHome size={18} /> },
    { label: 'Manage Users', path: '/dashboard/admin/manage-users', icon: <FiUsers size={18} /> },
    { label: 'Manage Tasks', path: '/dashboard/admin/manage-tasks', icon: <FiList size={18} /> },
  ];

  const menu = userRole === 'admin' ? adminMenu : (userRole === 'buyer' ? buyerMenu : workerMenu);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-4 relative">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-6 right-4 p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <FiX size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 uppercase tracking-wider">
              Taskynex
            </span>
          </Link>
          {/* Profile Section */}
          <div className='flex gap-2'>
            <img
              src={
                user?.photoURL || "https://joynul2024.sirv.com/clients/profile_avatar.jpg"
              }
              alt={user?.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-600"
            />

            <div className="flex-1 overflow-hidden">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">
                {user?.displayName || "Anonymous User"}
              </h4>

              <p className="text-xs text-slate-500 truncate">
                {user?.email}
              </p>

              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] uppercase font-semibold">
                {dbUser?.role}
              </span>
            </div>
          </div>
          {availableCoins !== null && (
            <div className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-bold text-sm px-3 py-2 rounded-lg flex items-center gap-2 border border-indigo-100 dark:border-indigo-500/20">
              <FiDollarSign size={16} /> {dbUser?.coins ?? 0} Coins
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menu.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === item.path
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FiLayout size={18} /> Website Home
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors">
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 justify-between md:justify-end z-10 transition-colors shrink-0">
          {/* Mobile menu toggle button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <FiMenu size={24} />
            </button>
            <div className="font-bold text-lg dark:text-white">Taskynex</div>
          </div>
          <div className="flex items-center justify-end">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? (
                <FiSun size={22} className="text-yellow-400" />
              ) : (
                <FiMoon size={22} className="text-slate-700" />
              )}
            </button>

            {/* Notification */}
            <button className="p-2 relative rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 absolute top-2 right-2"></div>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50 dark:bg-slate-950 transition-colors">
          <Outlet />
        </div>
      </main>
    </div>
  );
}