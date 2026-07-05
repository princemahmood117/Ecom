import ProductCard from "./ProductCard";


const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-gray-500 text-lg">
        Sorry, product not available
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  );
};

export default ProductGrid;