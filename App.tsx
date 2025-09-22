import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BrowseView from './views/BrowseView';
import SellView from './views/SellView';
import ProfileView from './views/ProfileView';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('browse');

  const renderView = useCallback(() => {
    switch (currentView) {
      case 'sell':
        return <SellView />;
      case 'profile':
        return <ProfileView />;
      case 'browse':
      default:
        return <BrowseView />;
    }
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-textlight">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;