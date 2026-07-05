import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import api from '../../services/api';


const OrderModal = ({ product, quantity, onClose, onSuccess }) => {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', email: '', fullLocation: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/orders/cart', {
        productId: product._id,
        quantity,
        ...form,
      });
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl p-6 w-full max-w-md"
        >
          <h3 className="text-xl font-bold mb-1">Place Your Order</h3>
          <p className="text-sm text-gray-500 mb-4">{product.name} · ID: {product._id.slice(-6)}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Full Name" className="w-full border rounded-lg px-3 py-2"
              value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input required placeholder="Phone Number" className="w-full border rounded-lg px-3 py-2"
              value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
            <input required type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea required placeholder="Full Location" className="w-full border rounded-lg px-3 py-2"
              value={form.fullLocation} onChange={(e) => setForm({ ...form, fullLocation: e.target.value })} />

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 border rounded-lg py-2">Cancel</button>
              <button type="submit" disabled={submitting} className="flex-1 bg-brand-dark text-white rounded-lg py-2">
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;