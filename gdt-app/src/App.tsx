import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Downloads from './Downloads'; // Import your Downloads component

function App() {
  return (
    <Router>
      <div>
        <div className='map'></div>
        <div className='contentContainer'>
          <Routes>
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;