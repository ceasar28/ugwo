import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wallet from './pages/Wallet/Wallet';
import NavbarWrapper from './layout/Navbarwrapper';
import Profile from './pages/profile/Profile';
import Payment from './pages/Payment/Payment';

const App: React.FC = () => {
  return (
    <Router>
      <NavbarWrapper>
        <div className='min-h-screen'>
          <div className='pt-16'></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/payment/:walletAddress/:amountETH' element={<Payment />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </NavbarWrapper>
    </Router>
  );
};

export default App;
