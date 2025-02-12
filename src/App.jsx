import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPanel from './components/CustomerPanel';
import AdminPanel from './components/AdminPanel';
import TruckOwnerPanel from './components/TruckOwnerPanel';
import Navbar from './components/navbar';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Add the Navbar here */}
        <Navbar />
        <Routes>
          {/* Route changes for React Router v6 */}
          <Route path="/" element={<AdminPanel />} />
          <Route path="/customer" element={<CustomerPanel />} />
          <Route path="/truck-owner" element={<TruckOwnerPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
