import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-textlight mt-auto border-t border-accent">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Smart Resale Market. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Sustainable & Smart Commerce for Everyone.</p>
      </div>
    </footer>
  );
};

export default Footer;