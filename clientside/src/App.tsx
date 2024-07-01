import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wallet from './pages/Wallet/Wallet';
/* import NavbarWrapper from './layout/Navbarwrapper'; */
import Profile from './pages/profile/Profile';
import Payment from './pages/Payment/Payment';
import Invoice from './pages/Invoice/Invoice';
import Navbar from './layout/Navbar';
import BottomNavbar from './layout/BottonNavbar';

const App: React.FC = () => {
  return (
    <Router>
      {/*  <NavbarWrapper> */}
      <Navbar />
      <div className='min-h-screen'>
        <Navbar />
        <div className='pt-16'></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/payment/:walletAddress/:amountETH/:note'
            element={<Payment />}
          />
          <Route
            path='/invoice/:clientName/:clientEmail/:vendorName/:service/:amount/:currency/:tax/:subtotal/:total/:isRecurring/:recurrenceFrequency'
            element={<Invoice />}
          />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <BottomNavbar />
      {/* </NavbarWrapper> */}
    </Router>
  );
};

export default App;
