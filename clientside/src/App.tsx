import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import MainContent from './pages/main/MainContent';
import Transaction from './pages/Transaction/Transaction';
import Send from './pages/action/Send';
import Request from './pages/action/Request';
import Invites from './pages/invitess/Invites';
import Deposit from './pages/action/Deposit';
//import Sidebar from './layout/Sidebar';
import Connect from './pages/connect/Connect';
//import NavbarWrapper from './context/NavbarWrapper';
//import FloatingNavbar from './layout/FloatingNavbar';
import Dashboard from './pages/dashboard/Dashboard';
import logoImage from './assets/material-symbols_robot.png';
import Home from './pages/Home/Home';
import Wallet from './pages/Wallet/Wallet';


const App: React.FC = () => {
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
    <Router>
    {/*   <NavbarWrapper>
      <Sidebar/>
      <FloatingNavbar/>
      </NavbarWrapper>  */}     
         <div className="min-h-screen">
        <nav
          className="bg-primary-100 fixed top-0 left-0 w-full z-50 transition-opacity duration-300"
          style={{ opacity: navbarOpacity }}
        >
          <div className="w-full p-4 flex justify-center items-center">
            <Link to="/">
              <div className="flex items-center cursor-pointer">
                <div className="text-center item-center text-primary-600 text-2xl font-semibold font-['Inter']">
                  ụgwọ
                </div>
              </div>
            </Link>
          </div>
        </nav>

        <div className="pt-16"></div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wallet" element={<Wallet />} />
        {/* <Route index element={<MainContent/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/connect' element={<Connect/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/send' element={<Send/>}/>
        <Route path='/request' element={<Request/>}/>
        <Route path='/invite' element={<Invites/>}/>
        <Route path='/deposit' element={<Deposit/>}/>  */}
           
      </Routes>
      </div>
    </Router>
  )
}

export default App
