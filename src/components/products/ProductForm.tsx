import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import ImageUpload from './ImageUpload';
import { Product, CreateProductPayload } from '../../types/product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: CreateProductPayload) => void;
  isLoading: boolean;
  formType: 'create' | 'edit';
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading,
  formType 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    description: '',
    price: 0,
    image: null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        image: null
      });
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, image: file }));
    
    // Clear error for image
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formType === 'create' && !formData.image) {
      newErrors.image = 'Please upload an image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        label="Product Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
      />
      
      <Input
        label="Price ($)"
        type="number"
        name="price"
        min="0.01"
        step="0.01"
        value={formData.price.toString()}
        onChange={handleChange}
        error={errors.price}
        required
      />
      
      <ImageUpload 
        onImageChange={handleImageChange}
        initialImage={initialData?.imageUrl}
        error={errors.image}
      />
      
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {formType === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProductForm;