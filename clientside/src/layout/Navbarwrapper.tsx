import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from './Sidebar';

interface NavbarWrapperProps {
  children: React.ReactNode;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => (
  <div>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

export default NavbarWrapper;
