export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  image: File | null;
}

export interface UpdateProductPayload {
  name: string;
  description: string;
  price: number;
  image?: File | null;
}