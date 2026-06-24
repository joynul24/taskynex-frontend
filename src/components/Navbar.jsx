import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider.jsx';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <span className="text-white font-bold">T</span>
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 uppercase tracking-wider">
          Taskynex
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login</Link>
        <Link to="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Register</Link>
        <a href="https://github.com/joynul24" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Join as Developer
        </a>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <Link 
          to="/login"
          className="hidden md:block px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
        >
          Get Started
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[100%] left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Link to="/" onClick={closeMenu} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-3 border-b border-slate-100 dark:border-slate-800/50">Home</Link>
              <Link to="/login" onClick={closeMenu} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-3 border-b border-slate-100 dark:border-slate-800/50">Login</Link>
              <Link to="/register" onClick={closeMenu} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-3 border-b border-slate-100 dark:border-slate-800/50">Register</Link>
              <a href="https://github.com/example" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-3 border-b border-slate-100 dark:border-slate-800/50">
                Join as Developer
              </a>
              <Link 
                to="/login"
                onClick={closeMenu}
                className="mt-4 text-center px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
