import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/actions";

import Logo from "../assets/th.jpg";

function Navbar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.loggedInUser?.user);
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
            <div className="w-10/12 mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2 text-white text-2xl font-bold">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/17489/17489509.png"
                        className="h-10 w-10"
                        alt="Logo"
                    />
                    <span>Sanvahan</span>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 items-center relative">
                    {loggedInUser ? (
                        <>
                            {loggedInUser?.role === "admin" && (
                                <NavLink
                                    to="/"
                                    className="text-white hover:text-gray-400 transition duration-200"
                                >
                                    Admin Panel
                                </NavLink>
                            )}
                            {loggedInUser?.role === "customer" && (
                                <NavLink
                                    to="/"
                                    className="text-white hover:text-gray-400 transition duration-200"
                                >
                                    Customer Panel
                                </NavLink>
                            )}
                            {loggedInUser?.role === "truckOwner" && (
                                <NavLink
                                    to="/"
                                    className="text-white hover:text-gray-400 transition duration-200"
                                >
                                    Truck Owner Panel
                                </NavLink>
                            )}

                            {/* Profile Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    className="h-12 w-12 rounded-full border-2 border-white overflow-hidden focus:outline-none"
                                >
                                    <img
                                        src={Logo} // Replace with actual user profile image URL
                                        alt="User Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-[9999]">
                                        <div className="px-4 py-2 text-gray-800 font-bold border-b">
                                            {loggedInUser.username}
                                        </div>
                                        <NavLink
                                            to="/dashboard"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            to="/settings"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>

                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="text-white hover:text-gray-400 transition duration-200"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;




// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../redux/actions/actions';

// function Navbar() {
//     const dispatch = useDispatch();
//     const loggedInUser = useSelector((state) => state.loggedInUser);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch(logoutUser());
//         navigate('/login');
//     };

//     return (
//         <nav className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50">
//             <div className="w-10/12 mx-auto flex justify-between items-center">
//                 {/* Logo */}
//                 <div className="flex items-center space-x-2 text-white text-2xl font-bold">
//                     <img
//                         src="https://cdn-icons-png.flaticon.com/128/17489/17489509.png"
//                         className="h-10 w-10"
//                         alt="Logo"
//                     />
//                     <span>Sanvahan</span>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="flex space-x-6 items-center">
//                     {loggedInUser ? (
//                         <>
//                             <NavLink to="/" className="text-white hover:text-gray-400 transition duration-200">Admin Panel</NavLink>
//                             <NavLink to="/customer" className="text-white hover:text-gray-400 transition duration-200">Customer Panel</NavLink>
//                             <NavLink to="/truck-owner" className="text-white hover:text-gray-400 transition duration-200">Truck Owner Panel</NavLink>
//                             <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200">Logout</button>
//                         </>
//                     ) : (
//                         <>
//                             <NavLink to="/login" className="text-white hover:text-gray-400 transition duration-200">Login</NavLink>
//                             <NavLink to="/register" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">Register</NavLink>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;