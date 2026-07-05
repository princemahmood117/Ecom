import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', brand: '', description: '', price: '', quantity: '' });
  const [benefits, setBenefits] = useState(['']);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const updateBenefit = (i, val) => {
    const updated = [...benefits];
    updated[i] = val;
    setBenefits(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length !== 4) return alert('Please upload exactly 4 images');
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    benefits.filter(Boolean).forEach((b) => fd.append('benefits', b));
    images.forEach((img) => fd.append('images', img));

    try {
      await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin/products');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input required placeholder="Product Name" className="w-full border rounded-lg px-3 py-2"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Brand Name" className="w-full border rounded-lg px-3 py-2"
          value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <textarea required placeholder="Description" className="w-full border rounded-lg px-3 py-2"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <div className="flex gap-3">
          <input required type="number" placeholder="Price" className="w-1/2 border rounded-lg px-3 py-2"
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input required type="number" placeholder="Quantity" className="w-1/2 border rounded-lg px-3 py-2"
            value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Images (exactly 4)</label>
          <input required type="file" multiple accept="image/*" onChange={(e) => setImages([...e.target.files])} />
        </div>

        <div>
          <label className="text-sm font-medium">Benefits</label>
          {benefits.map((b, i) => (
            <input key={i} className="w-full border rounded-lg px-3 py-2 mt-2" value={b}
              onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
          ))}
          <button type="button" onClick={() => setBenefits([...benefits, ''])} className="text-sm text-brand-pink mt-2">
            + Add benefit
          </button>
        </div>

        <button type="submit" disabled={saving} className="w-full bg-brand-dark text-white rounded-lg py-3">
          {saving ? 'Saving...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;