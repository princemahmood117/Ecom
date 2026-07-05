import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import api from '../../services/api';
import Loader from '../shared/Loader';
import ProductCard from '../products/ProductCard';


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products?limit=5&sort=newest');
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
      );
    }
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/cosmetics" className="px-6 py-3 bg-brand-dark text-white rounded-full hover:opacity-90 transition">
          View More
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;