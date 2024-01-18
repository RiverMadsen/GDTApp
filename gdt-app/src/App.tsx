import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Downloads from './Downloads'; // Import your Downloads component
import Mapping from './Mapping';
import { initDB } from './DBFunctions';


function App() {
  useEffect(() => {
    initDB();
  }, []);
  return (
    <Router>
      <div>
        <div id="map" className='map'></div>
        <div className='contentContainer'>
          <Routes>
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/mapping" element={<Mapping />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;