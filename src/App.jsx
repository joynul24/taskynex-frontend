import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import WorkerHome from './pages/WorkerHome.jsx';
import WorkerTaskList from './pages/dashboard/worker/WorkerTaskList.jsx';
import WorkerSubmissions from './pages/dashboard/worker/WorkerSubmissions.jsx';
import WorkerWithdrawals from './pages/dashboard/worker/WorkerWithdrawals.jsx';

import BuyerHome from './pages/dashboard/buyer/BuyerHome.jsx';
import BuyerAddTask from './pages/dashboard/buyer/BuyerAddTask.jsx';
import BuyerMyTasks from './pages/dashboard/buyer/BuyerMyTasks.jsx';
import BuyerPurchaseCoin from './pages/dashboard/buyer/BuyerPurchaseCoin.jsx';
import BuyerPaymentHistory from './pages/dashboard/buyer/BuyerPaymentHistory.jsx';

import AdminHome from './pages/AdminHome.jsx';
import AdminManageUsers from './pages/dashboard/admin/AdminManageUsers.jsx';
import AdminManageTasks from './pages/dashboard/admin/AdminManageTasks.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskDetails from './pages/dashboard/worker/TaskDetails.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Worker Routes */}
              <Route path="worker" element={<WorkerHome />} />
              <Route path="worker/tasks" element={<WorkerTaskList />} />
              <Route path='task-details/:id' element={<TaskDetails></TaskDetails>}/>
              <Route path="worker/submissions" element={<WorkerSubmissions />} />
              <Route path="worker/withdrawals" element={<WorkerWithdrawals />} />
              
              {/* Buyer Routes */}
              <Route path="buyer" element={<BuyerHome />} />
              <Route path="buyer/add-task" element={<BuyerAddTask />} />
              <Route path="buyer/my-tasks" element={<BuyerMyTasks />} />
              <Route path="buyer/purchase-coin" element={<BuyerPurchaseCoin />} />
              <Route path="buyer/payment-history" element={<BuyerPaymentHistory />} />

              {/* Admin Routes */}
              <Route path="admin" element={<AdminHome />} />
              <Route path="admin/manage-users" element={<AdminManageUsers />} />
              <Route path="admin/manage-tasks" element={<AdminManageTasks />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
