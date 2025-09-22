import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-2 right-2 bg-primary text-textdark text-xs font-semibold px-2 py-1 rounded-full">{product.condition}</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 uppercase font-semibold">{product.category}</p>
        <h3 className="text-lg font-bold text-textlight mt-1 truncate">{product.name}</h3>
        <div className="mt-auto pt-4">
          <p className="text-2xl font-black text-primary">${product.price.toFixed(2)}</p>
          <button className="w-full mt-2 bg-primary text-textdark font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;