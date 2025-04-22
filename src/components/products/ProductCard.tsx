import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-lg overflow-hidden border border-zinc-200"
    >
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-zinc-900">
            {product.name}
          </h3>
          
          <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
            {product.description}
          </p>
          
          <p className="mt-2 text-lg font-medium text-brand-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;