import { Product, CreateProductPayload, UpdateProductPayload } from '../types/product';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// Fetch a single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}`);
  }
  return response.json();
};

// Create a new product
export const createProduct = async (productData: CreateProductPayload): Promise<Product> => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('price', productData.price.toString());
  
  if (productData.image) {
    formData.append('image', productData.image);
  }

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return response.json();
};

// Update an existing product
export const updateProduct = async (id: number, productData: UpdateProductPayload): Promise<Product> => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('price', productData.price.toString());
  
  if (productData.image) {
    formData.append('image', productData.image);
  }

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to update product with ID ${id}`);
  }

  return response.json();
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product with ID ${id}`);
  }
};