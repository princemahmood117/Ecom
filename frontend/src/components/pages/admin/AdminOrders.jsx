import { useEffect, useState } from 'react';
import api from '../../../services/api';
import Loader from '../../shared/Loader';


const statuses = ['New Order', 'Shipped', 'Delivered'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const { data } = await api.get('/orders/admin/all');
    
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/admin/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Customer</th><th className="p-3">Contact No.</th><th className="p-3">Products</th><th className="p-3">Total</th>
              <th className="p-3">Status</th><th className="p-3">Action</th> <br />              
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t align-top">
                <td className="p-3">{o.fullName}<br /><span className="text-xs text-gray-400">{o.user?.email}</span></td>
                <td className="p-3 flex items-center">{o?.phoneNumber}</td>
                <td className="p-3">
                  {o.items.map((i, idx) => (
                    <div key={idx} className="text-xs text-gray-600">{i.name} (x{i.quantity}) — {i.product?.toString().slice(-6)}</div>
                  ))}
                </td>
                <td className="p-3">${o.totalPrice.toFixed(2)}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="border rounded-lg px-2 py-1">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;