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


const App  = () => {
  return (
    <Router>
      <NavbarWrapper>
      <Sidebar/>
      </NavbarWrapper>
      
      <Routes>
        <Route index element={<MainContent/>}/>
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
