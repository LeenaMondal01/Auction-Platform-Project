import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideDrawer from './layout/SideDrawer'
import Home from './pages/Home'
 import { ToastContainer} from 'react-toastify';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/userSlice';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  },[]);
  return <Router>
    <SideDrawer />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/submit-commission' element={<SubmitCommission/>} />
      <Route path='/how-it-works-info' element={<HowItWorks/>}></Route>
      <Route path='/about' element={<About/>}></Route>

    </Routes>
    <ToastContainer position='top-right'/>
  </Router>
}

export default App
