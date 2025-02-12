// src/components/Navbar.jsx

import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 shadow-md rounded-b-2xl ">
            <div className="w-10/12 mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-xl font-bold max-h-10">Sanvahan <img src='https://cdn-icons-png.flaticon.com/128/17489/17489509.png' className='max-h-10 inline-flex m-2' /> </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 justify-between items-center">
                    <NavLink to="/" className="text-white hover:text-gray-400 transition duration-200  min-w-40 text-center  ">
                        Admin Panel
                    </NavLink>
                    <NavLink to="/customer" className="text-white hover:text-gray-400 transition duration-200  min-w-40 text-center  ">
                        Customer Panel
                    </NavLink>
                    <NavLink to="/truck-owner" className="text-white hover:text-gray-400 transition duration-200  min-w-40 text-center  ">
                        Truck Owner Panel
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
