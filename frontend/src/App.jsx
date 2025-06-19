import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideDrawer from './layout/SideDrawer'
import Home from './pages/Home'
import { ToastContainer} from 'react-toastify';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SubmitCommission from './pages/SubmitCommission';
import { useDispatch } from 'react-redux';
import { fetchUser,fetchLeaderboard } from './store/slices/userSlice';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';
import Leaderboard from './pages/Leaderboard';
import Auctions from './pages/Auctions';
import AuctionItem from './pages/AuctionItem';
import CreateAuction from './pages/CreateAuction'
import ViewMyAuctions from "./pages/ViewMyAuctions";
import ViewAuctionDetails from './pages/ViewAuctionDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';




const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
     dispatch(fetchLeaderboard());
  },[]);
  return( <Router>
    <SideDrawer />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/password/forgot' element={<ForgotPassword/>} />
      <Route path='/password/reset/:token' element={<ResetPassword/>} />
      <Route path='/submit-commission' element={<SubmitCommission/>} />
      <Route path='/how-it-works-info' element={<HowItWorks/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/auctions' element={<Auctions/>} />
      <Route path='/auction/item/:id' element={<AuctionItem/>} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path='/create-auction' element={<CreateAuction/>}></Route>
      <Route path='/view-my-auctions' element={<ViewMyAuctions/>}></Route>
      <Route path='/auction/details/:id' element={<ViewAuctionDetails/>}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/me' element={<UserProfile />}></Route>
    </Routes>
    <ToastContainer position='top-right'/>
  </Router>
  );
};

export default App;
