import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import Loader from '../shared/Loader';
import ImageGallery from '../product-details/ImageGallery';
import OrderModal from '../product-details/OrderModal';




const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <Loader />;

  const handleOrderClick = () => {
    if (!user) return navigate('/login');
    setShowModal(true);
  };

  const handleSuccess = async () => {
    setShowModal(false);
    await fetchCart();
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <ImageGallery images={product.images} />

      <div>
        <p className="text-sm text-gray-500 uppercase">{product.brand}</p>
        <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
        <p className="text-xs text-gray-400 mt-1">Product ID: {product._id}</p>
        <p className="text-2xl font-bold text-brand-dark mt-4">${(product.price * qty).toFixed(2)}</p>

        <div className="flex items-center gap-4 mt-4">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 border rounded-full">−</button>
          <span className="w-8 text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 border rounded-full">+</button>
        </div>

        <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

        {product.benefits?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Benefits</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        )}

        <button
          onClick={handleOrderClick}
          disabled={product.quantity === 0}
          className="mt-8 w-full md:w-auto px-8 py-3 bg-brand-dark text-white rounded-full disabled:opacity-40"
        >
          {product.quantity === 0 ? 'Out of Stock' : 'Order Now'}
        </button>
      </div>

      {showModal && (
        <OrderModal
          product={product}
          quantity={qty}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default ProductDetails;