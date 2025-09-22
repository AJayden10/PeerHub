import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { UserIcon } from '../components/IconComponents';

type ProfileTab = 'listings' | 'sales' | 'settings';

const ProfileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('listings');
  const userListings = MOCK_PRODUCTS.slice(0, 4); // Mock data for user's items

  const renderContent = () => {
    switch(activeTab) {
      case 'listings':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        );
      case 'sales':
        return <div className="text-center p-10 bg-card rounded-lg"><p className="text-gray-400">You have no past sales.</p></div>;
      case 'settings':
        return (
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-textlight mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Email Address</label>
                <input type="email" disabled value="srm-user@example.com" className="mt-1 block w-full bg-accent border-accent text-gray-400 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Shipping Address</label>
                <input type="text" disabled value="123 Market St, San Francisco, CA" className="mt-1 block w-full bg-accent border-accent text-gray-400 rounded-md shadow-sm" />
              </div>
              <button className="bg-primary text-textdark font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors">Update Information</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTabClass = (tab: ProfileTab) => {
    return activeTab === tab 
      ? 'border-primary text-primary' 
      : 'border-transparent text-gray-400 hover:text-textlight hover:border-gray-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-textlight">
            <UserIcon/>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary">John Doe</h2>
          <p className="text-gray-300">Joined in 2024</p>
          <div className="flex items-center space-x-2 mt-2 text-sm text-primary">
            <span>★★★★★</span>
            <span className="text-gray-400">(12 Reviews)</span>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b border-accent">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('listings')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('listings')}`}>
              My Listings (4)
            </button>
            <button onClick={() => setActiveTab('sales')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('sales')}`}>
              Past Sales
            </button>
            <button onClick={() => setActiveTab('settings')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${getTabClass('settings')}`}>
              Settings
            </button>
          </nav>
        </div>
        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;