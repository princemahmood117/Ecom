import { useEffect, useState } from 'react';
import api from '../../../services/api';
import Loader from '../../shared/Loader';
import DeleteConfirmModal from '../../admin/DeleteConfirmModal';
import EditProductModal from '../../admin/EditProductModal';
import { getImageUrl } from '../../../utils/getImageUrl.js';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 8 });
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    if (filter !== 'all') params.append('filter', filter);
    const { data } = await api.get(`/products?${params}`);
    setProducts(data.products);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [page, search, sort, filter]);

  const handleDelete = async () => {
    await api.delete(`/products/${deleteTarget}`);
    setDeleteTarget(null);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">Sort</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="all">All</option>
          <option value="new">Newly Listed</option>
        </select>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">ID</th>
                <th className="p-3">Brand</th><th className="p-3">Description</th><th className="p-3">Qty</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3"><img src={getImageUrl(p.images[0])} className="w-12 h-12 rounded object-cover" alt={p.name} /></td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-gray-400">{p._id.slice(-6)}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3 max-w-xs truncate">{p.description}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => setEditTarget(p)} className="text-blue-600">Edit</button>
                    <button onClick={() => setDeleteTarget(p._id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full ${page === i + 1 ? 'bg-brand-dark text-white' : 'border'}`}>
            {i + 1}
          </button>
        ))}
      </div>

      {deleteTarget && <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {editTarget && (
        <EditProductModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => { setEditTarget(null); fetchProducts(); }}
        />
      )}
    </div>
  );
};

export default AllProducts;