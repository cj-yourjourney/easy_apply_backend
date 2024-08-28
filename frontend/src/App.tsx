import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import NavBarContainer from './components/Navbar/NavBarContainer';
import Login from './pages/Login';
import ProfileInfo from './pages/Profiles/ProfileInfo';
import UserSkill from './pages/Profiles/UserSkill';

function App() {
  return (
    <Router>
      <NavBarContainer />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/profile-info/" element={<ProfileInfo />} />
        <Route path="/profile-skills/" element={<UserSkill />} />
      </Routes>
    </Router>
  )
}

export default App;
