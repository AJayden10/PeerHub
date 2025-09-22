import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES, CONDITIONS } from '../constants';
import { SearchIcon } from '../components/IconComponents';
import type { Product } from '../types';
import { Category, Condition } from '../types';

const BrowseView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<Condition | 'all'>('all');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesCondition = selectedCondition === 'all' || product.condition === selectedCondition;
      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [searchTerm, selectedCategory, selectedCondition]);

  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Find Your Next Treasure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-3">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-accent text-textlight border border-accent rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="w-full p-3 bg-accent text-textlight border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="condition-filter" className="block text-sm font-medium text-gray-300 mb-1">Condition</label>
            <select
              id="condition-filter"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as Condition | 'all')}
               className="w-full p-3 bg-accent text-textlight border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Conditions</option>
              {CONDITIONS.map(con => <option key={con} value={con}>{con}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseView;