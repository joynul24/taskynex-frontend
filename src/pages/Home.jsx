import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiZap, FiShield, FiLayout, FiChevronRight, FiStar, FiTrendingUp, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import ReadyToEarn from '../components/ReadyToEarn';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const heroSlides = [
    {
      title: "Accelerate your Workflow",
      highlight: "Workflow",
      desc: "Taskynex helps modern teams ship faster with intelligent prioritization, real-time collaboration, and powerful automated data syncing.",
    },
    {
      title: "Monetize Your Free Time",
      highlight: "Earnings",
      desc: "Complete simple tasks from anywhere in the world and earn coins. Secure payouts with blazing fast processing times.",
    },
    {
      title: "Delegate & Get Things Done",
      highlight: "Done",
      desc: "Post your tasks and let our global workforce handle them. Pay only for approved results with transparent pricing.",
    },
    {
      title: "Fast Tracking Analytics",
      highlight: "Analytics",
      desc: "Get real-time insights on your tasks and workforce. Ensure every minute is tracked for perfect quality.",
    },
    {
      title: "Seamless Team Integration",
      highlight: "Integration",
      desc: "Incorporate task creation natively from your existing tools. A secure and robust API ready to empower you.",
    },
    {
      title: "Scale Your Operations",
      highlight: "Scale",
      desc: "Expand your business efficiently without the overhead. Leverage our micro-workforce to handle mass volume work swiftly.",
    },
    {
      title: "Trusted by Global Enterprise",
      highlight: "Enterprise",
      desc: "Enterprise-grade security, dedicated account managers, and priority matching for your high stake projects.",
    }
  ];

  const topWorkers = [
    { id: 1, name: "Alex Rivera", coins: 45200, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sarah Chen", coins: 39800, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Mike Johnson", coins: 35100, avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Elena Rodriguez", coins: 32400, avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "David Kim", coins: 28900, avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Lisa Patel", coins: 25600, avatar: "https://i.pravatar.cc/150?u=6" },
  ];

  const testimonials = [
    { id: 1, name: "James Wilson", role: "Buyer", text: "Taskynex has completely transformed how I handle data entry and quick research tasks. The workforce is incredibly fast.", avatar: "https://i.pravatar.cc/150?u=7" },
    { id: 2, name: "Maria Garcia", role: "Worker", text: "I've been using Taskynex in my free time and the extra income has been amazing. The platform is smooth and payouts are instant.", avatar: "https://i.pravatar.cc/150?u=8" },
    { id: 3, name: "Robert Taylor", role: "Buyer", text: "The UI is clean, minimalistic, and just works. Managing hundreds of task submissions is a breeze with their dashboard.", avatar: "https://i.pravatar.cc/150?u=9" },
  ];

  return (
    <div className="flex-1 w-full bg-white dark:bg-slate-950 overflow-hidden">
      <Helmet>
        <title>Taskynex | Home</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-10 px-6 md:px-10">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-5xl z-10 mx-auto md:mt-20" data-aos="fade-up">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full pb-16 min-h-[450px]"
          >
            {heroSlides.map((slide, idx) => (
              <SwiperSlide key={idx} className="w-full h-full flex flex-col justify-center">
                <div className="text-center max-w-4xl mx-auto py-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-8 shadow-sm">
                    <span className="mr-2 px-2 py-0.5 rounded-full bg-indigo-500 text-white">New</span>
                    Join Taskynex 2.0 Today
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 inline-block px-2">
                      {slide.highlight}
                    </span>
                    {slide.title.split(slide.highlight)[1]}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold shadow-2xl shadow-indigo-500/30 transition-all hover:translate-y-[-2px]">
                      Get Started for Free
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-bold backdrop-blur-md transition-all">
                      Login to Dashboard
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-8 w-full max-w-5xl h-48 sm:h-64 bg-slate-50 border-slate-200 dark:bg-slate-900 rounded-t-3xl border-t border-x dark:border-slate-800 p-4 shadow-2xl overflow-hidden flex gap-4 z-10" data-aos="fade-up" data-aos-delay="200">
          <div className="w-1/4 h-full bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
            <motion.div animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 4 }} className="w-full h-3 bg-indigo-300 dark:bg-indigo-500/50 rounded-full origin-left"></motion.div>
            <motion.div animate={{ scaleX: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 3 }} className="w-3/4 h-3 bg-slate-300 dark:bg-slate-700/80 rounded-full origin-left"></motion.div>
            <div className="w-1/2 h-3 bg-slate-300/50 dark:bg-slate-700/50 rounded-full mt-4"></div>

            {/* Animated floating block */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="mt-auto h-16 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-3 flex flex-col justify-center"
            >
              <div className="w-full h-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-full overflow-hidden">
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1/2 h-full bg-indigo-500 rounded-full" />
              </div>
            </motion.div>

          </div>
          <div className="flex-1 h-full bg-slate-100 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 p-6 grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="w-10 h-2 bg-indigo-400 rounded-full mb-3"></div>
              <div className="w-20 h-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-full overflow-hidden relative">
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full" />
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <div className="w-32 h-6 bg-emerald-100 dark:bg-emerald-500/20 rounded mb-3 flex items-center px-2">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                <div className="w-16 h-2 bg-emerald-400/50 rounded-full"></div>
              </div>
              <div className="w-16 h-3 bg-emerald-50 dark:bg-slate-800 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="px-6 md:px-10 py-16 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <FiDollarSign className="w-5 h-5" />,
              title: "Earn as a Worker",
              desc: "Complete simple micro-tasks, accumulate coins, and seamlessly withdraw your earnings into real USD.",
              color: "text-indigo-600 dark:text-indigo-400",
              bgHover: "hover:bg-indigo-500",
              iconBg: "bg-indigo-100 dark:bg-indigo-500/10"
            },
            {
              icon: <FiBriefcase className="w-5 h-5" />,
              title: "Hire as a Buyer",
              desc: "Create tasks, target global workers, and easily manage proof submissions through your dedicated dashboard.",
              color: "text-cyan-600 dark:text-cyan-400",
              bgHover: "hover:bg-cyan-500",
              iconBg: "bg-cyan-100 dark:bg-cyan-500/10"
            },
            {
              icon: <FiShield className="w-5 h-5" />,
              title: "Secure Coin System",
              desc: "Enjoy transparent coin-to-USD pricing, secure Stripe payments, and manually verified admin approval for safety.",
              color: "text-purple-600 dark:text-purple-400",
              bgHover: "hover:bg-purple-500",
              iconBg: "bg-purple-100 dark:bg-purple-500/10"
            }
          ].map((feature, idx) => (
            <motion.div
              whileHover={{ y: -5 }}
              className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all duration-300"
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${feature.iconBg} ${feature.bgHover} group-hover:text-white`}>
                  <div className={`${feature.color} group-hover:text-white transition-colors`}>{feature.icon}</div>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Workers Section */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Top Performing <span className="text-indigo-500">Workers</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Meet our most dedicated taskers who have earned the most coins on the platform this month.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topWorkers.map((worker, idx) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={worker.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg dark:shadow-none"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="relative mb-4">
                <img src={worker.avatar} alt={worker.name} className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 object-cover" />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-lg">
                  <FiStar size={12} className="mr-1 fill-white" /> Rank #{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{worker.name}</h3>
              <div className="flex items-center text-emerald-500 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full mt-2">
                <FiTrendingUp size={16} className="mr-2" />
                {worker.coins.toLocaleString()} Coins
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="bg-slate-50 dark:bg-slate-900 py-24 px-6 md:px-10 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Seamless Process for Both <span className="text-indigo-500">Earners & Buyers</span></h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Our platform bridges the gap between those who need quick tasks done and those looking to monetize their spare time efficiently.</p>

            <div className="space-y-6">
              {[
                "Register securely and choose your role.",
                "Buyers fund accounts & post targeted micro-tasks.",
                "Workers complete tasks and provide reviewable proof.",
                "Instant approval releases coins directly to worker wallets."
              ].map((step, i) => (
                <div key={i} className="flex flex-row items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">{i + 1}</div>
                  <p className="font-medium text-slate-800 dark:text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-3xl transform rotate-3 scale-105 opacity-20 dark:opacity-40 blur-xl"></div>
            <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <h4 className="font-bold text-slate-900 dark:text-white">Recent Activity</h4>
                <span className="text-xs px-3 py-1 font-semibold flex items-center gap-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full">
                  <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-emerald-500" />
                  Live Updates
                </span>
              </div>
              {[1, 2, 3].map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  key={item}
                  className="flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-default border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden flex items-center justify-center">
                      <div className="w-6 h-6 bg-indigo-500 dark:bg-indigo-400 rounded-full opacity-50 blur-sm"></div>
                    </div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }} className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950"></motion.div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 2 + idx, ease: "linear" }} className="w-full h-full bg-slate-400 dark:bg-slate-500" />
                    </div>
                    <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exta Section 2: Stats */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "15,000+" },
            { label: "Tasks Completed", value: "1M+" },
            { label: "Coins Distributed", value: "50M+" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
              <h3 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 mb-2">{stat.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 md:px-10 max-w-4xl mx-auto overflow-hidden text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-slate-900 dark:text-white" data-aos="fade-up">What our <span className="text-indigo-500">Users</span> say</h2>

        <div data-aos="fade-up" data-aos-delay="200" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="flex flex-col items-center gap-6">
                  <div className="text-slate-300 dark:text-slate-700">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  </div>
                  <p className="text-lg md:text-2xl font-medium text-slate-800 dark:text-slate-300 italic max-w-2xl mx-auto">"{t.text}"</p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-left">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover" />
                    <div className="text-left">
                      <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Extra Section 3: CTA */}
      {/* <section className="py-20 px-6 mt-10 mb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-tr from-indigo-600 to-purple-700 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20" data-aos="zoom-in-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Ready to start earning?</h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto relative z-10">Join thousands of users completing tasks and earning coins right now. Sign up takes less than a minute.</p>
          <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-700 hover:bg-slate-50 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 relative z-10">
            Create Free Account <FiChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section> */}
      <ReadyToEarn></ReadyToEarn>
    </div>
  );
}
