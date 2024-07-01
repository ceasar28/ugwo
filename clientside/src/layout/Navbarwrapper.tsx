import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface NavbarWrapperProps {
  children: React.ReactNode;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  const location = useLocation();

  // Check if current location is not '/'
  const showSidebar = location.pathname !== '/';

  return (
    <div>
      <Navbar />
      <div className='flex'>
        {showSidebar && <Sidebar />}
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default NavbarWrapper;
