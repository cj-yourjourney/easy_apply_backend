import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='signup' element={<Signup /> }/>
      </Routes>
    </Router>
   
  );
}

export default App;
