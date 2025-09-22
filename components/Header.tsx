import React from 'react';
import type { View } from '../types';
import { LogoIcon, SellIcon, UserIcon, BrowseIcon } from './IconComponents';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems: { view: View; label: string; icon: JSX.Element }[] = [
    { view: 'browse', label: 'Browse', icon: <BrowseIcon /> },
    { view: 'sell', label: 'Sell Item', icon: <SellIcon /> },
    { view: 'profile', label: 'Profile', icon: <UserIcon /> },
  ];

  return (
    <header className="bg-background/90 backdrop-blur-sm border-b border-accent shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('browse')}>
            <LogoIcon />
            <h1 className="text-2xl font-bold text-primary">Smart Resale Market</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ view, label, icon }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  currentView === view
                    ? 'bg-primary text-textdark'
                    : 'text-textlight hover:bg-accent'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
       {/* Mobile Navigation */}
      <nav className="md:hidden bg-background/80 backdrop-blur-sm flex justify-around p-2 border-t border-accent">
        {navItems.map(({ view, label, icon }) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center space-y-1 w-full p-2 rounded-lg transition-colors duration-200 ${
              currentView === view
                ? 'bg-primary text-textdark'
                : 'text-textlight hover:bg-accent'
            }`}
          >
            {icon}
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;