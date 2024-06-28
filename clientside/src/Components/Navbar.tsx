import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [navbarOpacity, setNavbarOpacity] = useState<number>(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setNavbarOpacity(0.8);
    } else {
      setNavbarOpacity(1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDisconnectWallet = useCallback(() => {
    disconnect(); // Initiate disconnect
    navigate('/');
  }, [disconnect, navigate]);

  return (
    <nav
      className="bg-primary-100 fixed top-0 left-0 w-full z-50 transition-opacity duration-300"
      style={{ opacity: navbarOpacity }}
    >
      <div className="w-[70vw] p-4 flex justify-between m-auto items-center">
        <Link to="/">
          <div className="flex items-center cursor-pointer">
            <div className="text-center item-center text-primary-600 text-2xl font-semibold font-['Inter']">
              ụgwọ
            </div>
          </div>
        </Link>
        <button
          onClick={handleDisconnectWallet}
          className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
        >
          Disconnect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
