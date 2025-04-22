import { dummyProducts } from '../utils/dummyData';
import { Product, CreateProductPayload, UpdateProductPayload } from '../types/product';

// Mock data storage
let products = [...dummyProducts];
let nextId = products.length + 1;

// Mock API handlers
export const mockFetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...products];
};

export const mockFetchProductById = async (id: number): Promise<Product> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const product = products.find(p => p.id === id);
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return { ...product };
};

export const mockCreateProduct = async (productData: CreateProductPayload): Promise<Product> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Generate a fake image URL based on the product name
  // In a real app, the server would handle the file upload
  const imageUrl = `https://images.pexels.com/photos/6957068/pexels-photo-6957068.jpeg?auto=compress&cs=tinysrgb&w=800`;
  
  const newProduct: Product = {
    id: nextId++,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    imageUrl
  };
  
  products.push(newProduct);
  return { ...newProduct };
};

export const mockUpdateProduct = async (id: number, productData: UpdateProductPayload): Promise<Product> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  // Update the product, keeping the existing image if no new one is provided
  const updatedProduct: Product = {
    ...products[productIndex],
    name: productData.name,
    description: productData.description,
    price: productData.price,
    // In a real app, if a new image was uploaded, this would be updated
  };
  
  products[productIndex] = updatedProduct;
  return { ...updatedProduct };
};

export const mockDeleteProduct = async (id: number): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  products = products.filter(p => p.id !== id);
};