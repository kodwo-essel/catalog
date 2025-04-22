import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductForm from '../components/products/ProductForm';
import Button from '../components/ui/Button';
import { useProducts } from '../hooks/useProducts';
import { CreateProductPayload } from '../types/product';

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, isCreating } = useProducts();
  
  const handleSubmit = (data: CreateProductPayload) => {
    createProduct(data, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

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
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProductForm
            onSubmit={handleSubmit}
            isLoading={isCreating}
            formType="create"
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default CreateProductPage;