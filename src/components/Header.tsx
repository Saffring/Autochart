import React from 'react';
import { FiUser } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="AutoChart Logo" className="h-8 w-auto mr-2" />
          <span className="text-xl font-bold">AutoChart</span>
        </div>
        <div className="flex items-center">
          <FiUser className="mr-2" />
          <span>Dr. John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;