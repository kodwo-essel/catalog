import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cat, Plus } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Cat className="h-8 w-8 text-brand-600" />
            <span className="text-xl font-semibold text-zinc-900">
              PetProducts
            </span>
          </Link>
          
          <Link to="/products/new">
            <Button 
              size="sm" 
              icon={<Plus className="h-4 w-4" />}
            >
              Add Product
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;