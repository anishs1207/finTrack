import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/final_logo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header({ login, logout, register }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/v1/user/logout');
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            alert("There was an error logging out.");
        }
    };

    // Function to determine active class
    const getNavLinkClass = (path) => {
        return location.pathname === path ? "text-blue-400" : "text-white hover:text-gray-400";
    };

    return (
        <header className="bg-gray-900 text-white flex justify-between items-center h-20 px-6 shadow-xl transition-all">
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-15 lg:h-15" src={logo} alt="Logo" />
                </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8">
                <Link to="/home" className={`text-lg font-semibold transition-colors ${getNavLinkClass("/home")}`}>
                    Home
                </Link>
                <Link to="/about" className={`text-lg font-semibold transition-colors ${getNavLinkClass("/about")}`}>
                    About
                </Link>
                <Link to="/contact-us" className={`text-lg font-semibold transition-colors ${getNavLinkClass("/contact-us")}`}>
                    Contact Us
                </Link>
                <Link to="/dashboard" className={`text-lg font-semibold transition-colors ${getNavLinkClass("/dashboard")}`}>
                    Dashboard
                </Link>
            </nav>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="cursor-pointer text-2xl transition-all duration-300"
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times transform rotate-90' : 'fa-bars'} text-white`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <>
                    <div
                        onClick={toggleMenu}
                        className="lg:hidden absolute top-0 left-0 w-full h-full bg-gray-900 opacity-80 z-40"
                    />
                    <div
                        ref={menuRef}
                        className="lg:hidden absolute top-16 left-0 w-full bg-gray-800 text-white text-center py-4 shadow-xl z-50 transition-transform duration-300 transform translate-y-0"
                    >
                        <Link to="/home" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/home")}`} onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link to="/about" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/about")}`} onClick={toggleMenu}>
                            About
                        </Link>
                        <Link to="/contact-us" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/contact-us")}`} onClick={toggleMenu}>
                            Contact Us
                        </Link>

                        {register && (
                            <Link
                                to="/register"
                                className={`block py-2 text-lg font-semibold ${getNavLinkClass("/register")}`}
                                onClick={toggleMenu}
                            >
                                Register
                            </Link>
                        )}

                        {login && (
                            <Link
                                to="/login"
                                className={`block py-2 text-lg font-semibold ${getNavLinkClass("/login")}`}
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                        )}

                        {logout && (
                            <>
                                <Link
                                    onClick={() => { handleLogout(); toggleMenu(); }}
                                    className={`block py-2 text-lg font-semibold ${getNavLinkClass("/logout")}`}
                                >
                                    Logout
                                </Link>
                                <Link to="/dashboard" className={`block py-2 text-lg font-semibold ${getNavLinkClass("/dashboard")}`} onClick={toggleMenu}>
                                    Dashboard
                                </Link>
                            </>

                        )}
                    </div>
                </>
            )}

            <div className="hidden lg:block flex">
                {register && (
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 mr-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Register
                    </Link>
                )}

                {login && (
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 mr-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                        Login
                    </Link>
                )}

                {logout && (
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg mr-5 hover:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
