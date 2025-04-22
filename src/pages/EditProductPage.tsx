import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductForm from '../components/products/ProductForm';
import Button from '../components/ui/Button';
import { useProducts, useProduct } from '../hooks/useProducts';
import { UpdateProductPayload } from '../types/product';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0', 10);
  
  const { data: product, isLoading: isLoadingProduct, isError } = useProduct(productId);
  const { updateProduct, isUpdating } = useProducts();
  
  const handleSubmit = (data: UpdateProductPayload) => {
    updateProduct(
      { id: productId, product: data },
      {
        onSuccess: () => {
          navigate(`/products/${productId}`);
        },
      }
    );
  };
  
  if (isError) {
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
          onClick={() => navigate(`/products/${productId}`)}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Product
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
        
        {isLoadingProduct ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="flex justify-end gap-3">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ProductForm
              initialData={product}
              onSubmit={handleSubmit}
              isLoading={isUpdating}
              formType="edit"
            />
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default EditProductPage;