import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} AutoChart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;