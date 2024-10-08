'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        background: "linear-gradient(to right, #6F46F1,#633DF3, #663DF3,#6940F1)",
        padding: '10px 0',
        zIndex: 1100,
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="flex items-center">
          <Link href="/home">
            <Image
              src="/autochart_logo.png"
              alt="AutoChart Logo"
              width={100}
              height={100}
              className="h-12 w-auto"
              style={{ filter: 'invert(100%) brightness(2000%)' }}
            />
          </Link>
        </div>
        <div className="flex items-center">
          <IconButton onClick={handleMenuClick} style={{ padding: '0' }}>
            <Avatar
              style={{
                cursor: 'pointer',
                backgroundColor: '#fff',
                color: '#000',
                width: '45px',
                height: '45px',
              }}
            >
              <FiUser size={24} />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                borderRadius: '10px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                padding: '10px 0',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Dr. John Doe
            </MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
