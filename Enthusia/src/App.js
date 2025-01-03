// import React, { useState } from 'react';
import './App.css';
import React from 'react';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import About from './component/About';
import Home from './component/Home';
import Sponsor from './component/Sponsor';
import Contact from './component/Contact';
import Apply from './component/Apply';
import AdminPage from './component/AdminPage';
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes> {/* Wrap Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About/>} />
          <Route path='/Sponsor' element={<Sponsor/>} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Apply' element={<Apply />} />
          <Route path='/admin' element={<AdminPage/>} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;