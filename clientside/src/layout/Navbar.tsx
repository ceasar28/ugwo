import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
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


  return (
    <>
      <nav
        className="bg-primary-100 fixed top-0 left-0 w-full z-50 transition-opacity duration-300"
        style={{ opacity: navbarOpacity }}
      >
        <div className="w-[70vw] p-4 justify-between m-auto items-center">
          <Link to="/">
            <div className=" items-center cursor-pointer">
              <div className="text-center item-center text-primary-600 text-2xl font-semibold font-['Inter']">
                ụgwọ
              </div>
            </div>
          </Link>
        </div>
      </nav>
     
    </>
  );
};

export default Navbar;
