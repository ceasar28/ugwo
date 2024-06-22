import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContent from './pages/main/MainContent';
import Transaction from './pages/Transaction/Transaction';
import Send from './pages/action/Send';
import Request from './pages/action/Request';
import Invites from './pages/invitess/Invites';
import Deposit from './pages/action/Deposit';
import Sidebar from './layout/Sidebar';
import Connect from './pages/connect/Connect';
import NavbarWrapper from './context/NavbarWrapper';
import FloatingNavbar from './layout/FloatingNavbar';
import Dashboard from './pages/dashboard/Dashboard';


const App  = () => {
  return (
    <Router>
      <NavbarWrapper>
      <Sidebar/>
      <FloatingNavbar/>
      </NavbarWrapper>      
      <Routes>
        <Route index element={<MainContent/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/connect' element={<Connect/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/send' element={<Send/>}/>
        <Route path='/request' element={<Request/>}/>
        <Route path='/invite' element={<Invites/>}/>
        <Route path='/deposit' element={<Deposit/>}/> 
           
      </Routes>
    </Router>
  )
}

export default App
