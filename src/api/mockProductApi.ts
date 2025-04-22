import { 
  mockFetchProducts, 
  mockFetchProductById, 
  mockCreateProduct, 
  mockUpdateProduct, 
  mockDeleteProduct 
} from '../mocks/handlers';
import { Product, CreateProductPayload, UpdateProductPayload } from '../types/product';

// This file provides a mock implementation of the product API
// It will automatically be used when no real backend is available

export const fetchProducts = async (): Promise<Product[]> => {
  return mockFetchProducts();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  return mockFetchProductById(id);
};

export const createProduct = async (productData: CreateProductPayload): Promise<Product> => {
  return mockCreateProduct(productData);
};

export const updateProduct = async (id: number, productData: UpdateProductPayload): Promise<Product> => {
  return mockUpdateProduct(id, productData);
};

export const deleteProduct = async (id: number): Promise<void> => {
  return mockDeleteProduct(id);
};