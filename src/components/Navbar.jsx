import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/actions';

function Navbar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.loggedInUser);
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md rounded-b-2xl">
            <div className="w-10/12 mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-xl font-bold max-h-10">
                    Sanvahan
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/17489/17489509.png"
                        className="max-h-10 inline-flex m-2"
                        alt="Logo"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 justify-between items-center">
                    {loggedInUser ? (
                        <>
                            <NavLink to="/" className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
                                Admin Panel
                            </NavLink>
                            <NavLink to="/customer" className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
                                Customer Panel
                            </NavLink>
                            <NavLink to="/truck-owner" className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
                                Truck Owner Panel
                            </NavLink>
                            <button onClick={handleLogout} className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="text-white hover:text-gray-400 transition duration-200 min-w-40 text-center">
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
