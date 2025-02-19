import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/actions';

function Navbar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.loggedInUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
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
                <div className="flex space-x-6 items-center">
                    {loggedInUser ? (
                        <>
                            <NavLink to="/" className="text-white hover:text-gray-400 transition duration-200">Admin Panel</NavLink>
                            <NavLink to="/customer" className="text-white hover:text-gray-400 transition duration-200">Customer Panel</NavLink>
                            <NavLink to="/truck-owner" className="text-white hover:text-gray-400 transition duration-200">Truck Owner Panel</NavLink>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="text-white hover:text-gray-400 transition duration-200">Login</NavLink>
                            <NavLink to="/register" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;