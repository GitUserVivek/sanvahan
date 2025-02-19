import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPanel from './pages/CustomerPanel';
import AdminPanel from './pages/AdminPanel';
import TruckOwnerPanel from './pages/TruckOwnerPanel';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegiserForm';
import PrivateRoute from './components/PrivateRoute';
import Navbar from "./components/Navbar"

function App() {

  return (
    <Router>
      <div className="App h-screen">
        {/* Add the Navbar here */}
        <Navbar />
        <Routes>
          {/* Route changes for React Router v6 */}


          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path="/" element={<PrivateRoute><AdminPanel /> </PrivateRoute>} />
          <Route path="/customer" element={<PrivateRoute><CustomerPanel /> </PrivateRoute>} />
          <Route path="/truck-owner" element={<PrivateRoute><TruckOwnerPanel /> </PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
