import { useEffect, useState } from 'react';
import api from '../../../services/api';
import Loader from '../../shared/Loader';
import StatsChart from '../../admin/StatsChart';


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/orders/admin/stats').then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <p className="text-3xl font-bold mt-2">${stats.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <StatsChart data={stats.dailyEarnings} title="Daily Earnings" />
      </div>
      <div className="bg-white rounded-xl p-6 shadow">
        <StatsChart data={stats.monthlyEarnings} title="Monthly Earnings" />
      </div>
    </div>
  );
};

export default AdminDashboard;