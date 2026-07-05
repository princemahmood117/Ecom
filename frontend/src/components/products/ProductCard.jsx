import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product._id}`}
    className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
  >
    <div className="aspect-square overflow-hidden bg-gray-100">
      <img
        // src={product.images[0]}
        src={getImageUrl(product.images[0])}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
      <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-brand-dark">${product.price}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  </Link>
);

export default ProductCard;