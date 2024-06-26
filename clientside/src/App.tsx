import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wallet from './pages/Wallet/Wallet';
import NavbarWrapper from './layout/Navbarwrapper';

const App: React.FC = () => {
  return (
    <Router>
      <NavbarWrapper>
        <div className='min-h-screen'>
          <div className='pt-16'></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wallet' element={<Wallet />} />
          </Routes>
        </div>
      </NavbarWrapper>
    </Router>
  );
};

export default App;
