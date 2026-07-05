import { useEffect, useState } from 'react';

import FilterSidebar from '../products/FilterSidebar';
import ProductGrid from '../products/ProductGrid';
import Loader from '../shared/Loader';
import api from '../../services/api';

const Cosmetics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (sort) params.append('sort', sort);
        if (filter !== 'all') params.append('filter', filter);

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 400);
    return () => clearTimeout(debounce);
  }, [search, sort, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8">
      <FilterSidebar
        search={search} setSearch={setSearch}
        sort={sort} setSort={setSort}
        filter={filter} setFilter={setFilter}
      />
      {loading ? <Loader /> : <ProductGrid products={products} />}
    </div>
  );
};

export default Cosmetics;