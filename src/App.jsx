import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerPanel from './pages/CustomerPanel';
import AdminPanel from './pages/AdminPanel';
import TruckOwnerPanel from './pages/TruckOwnerPanel';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegiserForm';
import PrivateRoute from './components/PrivateRoute';
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';

function App() {
  const loggedInUser = useSelector((state) => state.loggedInUser?.user);

  return (
    <Router>
      <div className="App h-screen flex flex-col">
        {/* Add the Navbar here */}
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />

          {/* Main route */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                {
                  loggedInUser?.role === 'admin' ? (
                    <AdminPanel />
                  ) : loggedInUser?.role === 'customer' ? (
                    <CustomerPanel />
                  ) : loggedInUser?.role === 'truckOwner' ? (
                    <TruckOwnerPanel />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CustomerPanel from './pages/CustomerPanel';
// import AdminPanel from './pages/AdminPanel';
// import TruckOwnerPanel from './pages/TruckOwnerPanel';
// import LoginForm from './pages/LoginForm';
// import RegisterForm from './pages/RegiserForm';
// import PrivateRoute from './components/PrivateRoute';
// import Navbar from "./components/Navbar"
// import { useSelector } from 'react-redux';

// function App() {
//   const loggedInUser = useSelector((state) => state.loggedInUser);


//   return (
//     <Router>
//       <div className="App h-screen flex flex-col">
//         {/* Add the Navbar here */}
//         <Navbar />
//         <Routes>
//           {/* Route changes for React Router v6 */}


//           <Route path='/login' element={<LoginForm />} />
//           <Route path='/register' element={<RegisterForm />} />
//           <Route path="/" element={<PrivateRoute><AdminPanel /> </PrivateRoute>} />
//           <Route path="/customer" element={<PrivateRoute><CustomerPanel /> </PrivateRoute>} />
//           <Route path="/truck-owner" element={<PrivateRoute><TruckOwnerPanel /> </PrivateRoute>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
