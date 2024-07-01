import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from react-icons

const BottomNavbar: React.FC = () => {
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();



  const handleDisconnectWallet = useCallback(() => {
    disconnect(); // Initiate disconnect
    navigate('/');
  }, [disconnect, navigate]);

  return (
    <>
      <footer
        className="bg-primary-100 fixed bottom-0 left-0 w-full z-50 flex justify-around p-2 lg:static lg:flex-row lg:justify-between lg:w-[70vw] lg:m-auto"
      >
        <Link to="/wallet">
          <FaWallet className="text-2xl text-primary-600" />
        </Link>
        <Link to="/profile">
          <FaUser className="text-2xl text-primary-600" />
        </Link>
        <button onClick={handleDisconnectWallet}>
          <FaSignOutAlt className="text-2xl text-primary-600" />
        </button>
      </footer>
    </>
  );
};

export default BottomNavbar;
