import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/new" element={<CreateProductPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
      </Routes>
    </div>
  );
}

export default App;