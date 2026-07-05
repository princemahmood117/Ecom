import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";


const statusColors = {
  Pending: 'bg-gray-100 text-gray-700',
  'New Order': 'bg-blue-100 text-blue-700',
  Shipped: 'bg-yellow-100 text-yellow-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const OrderCard = ({ order, onCancel }) => {
  const handleCancel = async () => {
    if (!confirm('Cancel this order?')) return;
    await api.delete(`/orders/${order._id}`);
    onCancel(order._id);
  };

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Order #{order._id.slice(-6)}</span>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
      </div>
      {order.items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <img src={getImageUrl(item.image)} className="w-14 h-14 object-cover rounded-lg" alt={item.name} />
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="font-bold">Total: ${order.totalPrice.toFixed(2)}</span>
        {order.status !== 'Delivered' && (
          <button onClick={handleCancel} className="text-red-600 text-sm hover:underline">Cancel Order</button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;