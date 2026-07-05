import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import Loader from '../shared/Loader';
import { getImageUrl } from '../../utils/getImageUrl';


const Cart = () => {
  const { cart, fetchCart } = useCart();
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await api.post('/orders/confirm');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to confirm order');
    } finally {
      setConfirming(false);
    }
  };

  if (confirming) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.items?.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 border rounded-lg p-4">
              <img src={getImageUrl(item.image)} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-bold">Total: ${cart.totalPrice?.toFixed(2)}</span>
            <button onClick={handleConfirm} className="px-8 py-3 bg-brand-dark text-white rounded-full">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;