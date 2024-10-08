import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-muted-foreground py-4"
      style={{ background: "linear-gradient(to right, #6F46F1,#633DF3, #663DF3,#6940F1)", padding: '10px 0', color: 'white' }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} AutoChart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;