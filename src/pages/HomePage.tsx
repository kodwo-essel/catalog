import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const HomePage: React.FC = () => {
  const { products, isLoading, isError } = useProducts();
  const [search, setSearch] = React.useState('');
  
  const filteredProducts = React.useMemo(() => {
    if (!search.trim()) return products;
    const searchLower = search.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower)
    );
  }, [products, search]);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
        </div>
        
        {isError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
            Failed to load products. Please try again later.
          </div>
        ) : (
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;