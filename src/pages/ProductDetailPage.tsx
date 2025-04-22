import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useProduct, useProducts } from '../hooks/useProducts';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0', 10);
  
  const { data: product, isLoading, isError } = useProduct(productId);
  const { deleteProduct, isDeleting } = useProducts();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Handle product deletion
  const handleDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 aspect-square bg-gray-200 rounded-lg"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mt-4"></div>
              <div className="flex gap-2 mt-6">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (isError || !product) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Product not found or an error occurred. Please try again later.
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mt-4"
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Products
        </Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Products
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg shadow-md"
          />
        </motion.div>
        
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <p className="text-2xl font-semibold text-teal-700 mt-2">
            {formatPrice(product.price)}
          </p>
          
          <div className="mt-6 prose prose-sm text-gray-700">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button
              onClick={() => navigate(`/products/${product.id}/edit`)}
              icon={<Edit className="h-4 w-4" />}
            >
              Edit Product
            </Button>
            
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              icon={<Trash2 className="h-4 w-4" />}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              isLoading={isDeleting}
              icon={<Trash2 className="h-4 w-4" />}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ProductDetailPage;