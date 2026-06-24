import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function MainLayout() {
  return (

    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300
bg-white text-slate-900
dark:bg-slate-950 dark:text-slate-200">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
}
