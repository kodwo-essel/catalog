import React from 'react';
import { Cat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Cat className="h-6 w-6 text-teal-700" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                PetProducts
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              High-quality products for your beloved pets. Designed with care for a happy and healthy pet life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Products
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Food & Treats
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Toys
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Health & Wellness
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-teal-700">
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} PetProducts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;