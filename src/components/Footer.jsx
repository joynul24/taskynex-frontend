import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 uppercase tracking-wider">
              Taskynex
            </span>
          </Link>
          <p className="text-sm text-slate-500 max-w-sm">
            Empowering the modern workforce with seamless automation, task delegation, and efficient micro-earning solutions.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Platform</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <Link to="#" className="hover:text-indigo-500 transition-colors">How it works</Link>
            <Link to="#" className="hover:text-indigo-500 transition-colors">Browse Tasks</Link>
            <Link to="#" className="hover:text-indigo-500 transition-colors">Top Earners</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <Link to="#" className="hover:text-indigo-500 transition-colors">About Us</Link>
            <Link to="#" className="hover:text-indigo-500 transition-colors">Careers</Link>
            <Link to="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="https://github.com/joynul24" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
              <FiGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/devjoynul/" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
              <FiLinkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
              <FiTwitter size={18} />
            </a>
            <a href="https://web.facebook.com/devjoynul" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
              <FiFacebook size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Taskynex. All rights reserved.
      </div>
    </footer>
  );
}
