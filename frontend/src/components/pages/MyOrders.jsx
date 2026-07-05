import { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../shared/Loader';
import OrderCard from '../orders/OrderCard';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/my-orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  const handleCancel = (id) => setOrders((prev) => prev.filter((o) => o._id !== id));

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => <OrderCard key={o._id} order={o} onCancel={handleCancel} />)}
        </div>
      )}
    </div>
  );
};

export default MyOrders;