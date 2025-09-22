import React, { useState, useCallback } from 'react';
import { CATEGORIES, CONDITIONS } from '../constants';
import { Category, Condition } from '../types';
import type { PriceSuggestion } from '../types';
import { getFairMarketValue } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { CameraIcon, PriceTagIcon } from '../components/IconComponents';

const SellView: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<Category>(Category.OTHER);
  const [condition, setCondition] = useState<Condition>(Condition.GOOD);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<PriceSuggestion | null>(null);
  const [listingPrice, setListingPrice] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGetSuggestion = useCallback(async () => {
    if (!itemName || !description) {
      setError("Please fill in Item Name and Description to get a price suggestion.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await getFairMarketValue(itemName, category, condition, description);
      setSuggestion(result);
      setListingPrice(result.suggestedPrice.toString());
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [itemName, category, condition, description]);

  const resetForm = () => {
    setItemName('');
    setCategory(Category.OTHER);
    setCondition(Condition.GOOD);
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setSuggestion(null);
    setListingPrice('');
    setError(null);
  };
  
  const handleListForSale = () => {
    // In a real app, this would submit the form data to a backend.
    alert(`Item "${itemName}" listed for $${listingPrice}! (This is a demo)`);
    resetForm();
  };

  const inputStyles = "mt-1 block w-full bg-accent text-textlight border border-accent rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary";

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-6">List a New Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Item Name</label>
              <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} className={inputStyles} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as Category)} className={inputStyles}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Condition</label>
                  <select value={condition} onChange={e => setCondition(e.target.value as Condition)} className={inputStyles}>
                    {CONDITIONS.map(con => <option key={con} value={con}>{con}</option>)}
                  </select>
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className={inputStyles}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Upload Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Item Preview" className="mx-auto h-32 w-auto object-cover rounded-md" />
                  ) : (
                    <CameraIcon />
                  )}
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-accent rounded-md font-medium text-primary hover:text-secondary p-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Price Suggestion */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-primary flex items-center mb-4"><PriceTagIcon/> Get AI Price Suggestion</h3>
            <p className="text-sm text-gray-300 mb-4">Fill in your item's details, then click below to get a smart price suggestion powered by AI.</p>
            <button onClick={handleGetSuggestion} disabled={isLoading} className="w-full bg-primary text-textdark font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 disabled:bg-accent disabled:text-gray-400 flex items-center justify-center">
              {isLoading && <Spinner size="5" color="text-textdark"/>}
              <span className="ml-2">{isLoading ? 'Analyzing...' : 'Suggest Fair Market Value'}</span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {suggestion && (
            <div className="bg-green-900/50 p-6 rounded-lg shadow-lg border border-green-500/30 animate-fade-in">
              <h3 className="text-xl font-bold text-green-300 mb-2">Pricing Analysis</h3>
              <p className="text-sm text-green-400 italic mb-4">&ldquo;{suggestion.reasoning}&rdquo;</p>
              <div className="text-center bg-background p-4 rounded-lg my-4">
                <p className="text-sm text-gray-400">Suggested Price</p>
                <p className="text-5xl font-extrabold text-primary">${suggestion.suggestedPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-300 mt-1">Range: ${suggestion.lowPrice.toFixed(2)} - ${suggestion.highPrice.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Your Listing Price ($)</label>
                <input type="number" value={listingPrice} onChange={e => setListingPrice(e.target.value)} className={inputStyles} placeholder="Enter your price" />
              </div>
              <button onClick={handleListForSale} className="w-full mt-4 bg-primary text-textdark font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-200">
                List Your Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellView;