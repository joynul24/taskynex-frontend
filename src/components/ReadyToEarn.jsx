import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const ReadyToEarn = () => {
  const leftCoins = [
    { size: "w-10 h-10 md:w-12 md:h-12", top: "55%", left: "6%", delay: 0, rotate: 15 },
    { size: "w-7 h-7 md:w-8 md:h-8", top: "70%", left: "2%", delay: 0.5, rotate: -20 },
    { size: "w-6 h-6 md:w-7 md:h-7", top: "45%", left: "15%", delay: 1.2, rotate: 45 },
    { size: "w-5 h-5", top: "52%", left: "22%", delay: 0.8, rotate: -10, op: 0.7 },
  ];

  const rightCoins = [
    { size: "w-12 h-12 md:w-14 md:h-14", top: "20%", right: "4%", delay: 0.3, rotate: -30 },
    { size: "w-7 h-7 md:w-8 md:h-8", top: "35%", right: "12%", delay: 1.5, rotate: 25 },
    { size: "w-6 h-6 md:w-7 md:h-7", top: "50%", right: "2%", delay: 0.9, rotate: -15 },
    { size: "w-5 h-5", top: "42%", right: "18%", delay: 2.1, rotate: 40, op: 0.6 },
  ];

  return (
    <section className="py-24 px-6 mt-10 mb-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden w-full select-none transition-colors duration-300">
      

      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden lg:block">
        {leftCoins.map((coin, idx) => (
          <motion.div
            key={`left-${idx}`}
            className={`absolute ${coin.size} bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5),inset_-2px_-2px_6px_rgba(0,0,0,0.4)] flex items-center justify-center border border-yellow-200/50`}
            style={{ top: coin.top, left: coin.left, opacity: coin.op || 1 }}
            animate={{
              y: [0, -12, 0],
              rotate: [coin.rotate, coin.rotate + 10, coin.rotate],
            }}
            transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
          >
            <span className="text-[10px] md:text-xs font-black text-amber-950/80 drop-shadow-sm">T</span>
          </motion.div>
        ))}

        {rightCoins.map((coin, idx) => (
          <motion.div
            key={`right-${idx}`}
            className={`absolute ${coin.size} bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5),inset_-2px_-2px_6px_rgba(0,0,0,0.4)] flex items-center justify-center border border-yellow-200/50`}
            style={{ top: coin.top, right: coin.right, opacity: coin.op || 1 }}
            animate={{
              y: [0, -15, 0],
              rotate: [coin.rotate, coin.rotate - 15, coin.rotate],
            }}
            transition={{ duration: 6 + idx, repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
          >
            <span className="text-[10px] md:text-xs font-black text-amber-950/80 drop-shadow-sm">T</span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -inset-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-3xl blur-[6px] opacity-90"></div>
        <div className="absolute -inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-3xl"></div>

        <div className="relative bg-white dark:bg-[#070b19] border border-slate-200 dark:border-slate-800 rounded-[22px] p-10 md:p-16 text-center overflow-hidden transition-colors duration-300">
          
          <div className="absolute inset-y-0 left-0 w-1/2 opacity-20 dark:opacity-30 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-cyan-500/40 via-transparent to-transparent pointer-events-none"></div>
          <svg className="absolute inset-y-0 left-0 w-1/2 h-full stroke-cyan-500/30 dark:stroke-cyan-500/20 stroke-[1] fill-none opacity-40 pointer-events-none hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 L30,40 L10,60 L50,70 L20,90 L60,100 M0,50 L40,30 L25,80 L70,50" />
            <circle cx="30" cy="40" r="1" fill="#06b6d4" />
            <circle cx="50" cy="70" r="1" fill="#06b6d4" />
            <circle cx="25" cy="80" r="1" fill="#06b6d4" />
          </svg>

          <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 dark:opacity-30 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-fuchsia-500/40 via-transparent to-transparent pointer-events-none"></div>
          <svg className="absolute inset-y-0 right-0 w-1/2 h-full stroke-fuchsia-500/30 dark:stroke-fuchsia-500/20 stroke-[1] fill-none opacity-40 pointer-events-none hidden sm:block" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100,10 L70,30 L90,50 L50,40 L80,70 L40,90 M100,60 L60,45 L75,85 L45,60" />
            <circle cx="70" cy="30" r="1" fill="#d946ef" />
            <circle cx="50" cy="40" r="1" fill="#d946ef" />
            <circle cx="75" cy="85" r="1" fill="#d946ef" />
          </svg>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white font-sans">
              Ready to start earning?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed opacity-90">
              Join thousands of users completing tasks and earning coins right now. Sign up takes less than a minute.
            </p>
            
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-7 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl shadow-md hover:bg-slate-900 dark:hover:bg-slate-50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-sm md:text-base"
            >
              Create Free Account <FiChevronRight className="ml-1.5 w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ReadyToEarn;