import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMoon } from "react-icons/fi";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
    const location = useLocation();
    const [selected, setSelected] = useState(getSelected(location.pathname));
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        setSelected(getSelected(location.pathname));
    }, [location.pathname]);
    
    function getSelected(pathname) {
        if (pathname === "/") return "Home";
        if (pathname === "/todos") return "Your Tasks";
        return "";
    }
    
    const handleClick = (option) => {
        setSelected(option);
        setMenuOpen(false);
    }
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg">
            <div className="logo">
                <span className="font-bold text-3xl tracking-wider"><img src="/logo.png" alt="iTaks" className="h-20" /></span>
            </div>
            <div className="flex items-center">
                <button onClick={toggleDarkMode} className="text-white focus:outline-none">
                    {isDarkMode ? <img src="sun.png" alt="Sun icon" className="h-6 w-6" /> : <img src="moon.png" alt="Moon icon" className="h-6 w-6" />}
                </button>
            </div>
            <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col items-center space-y-4 p-4 bg-blue-500 absolute top-16 left-0 right-0">
                    <li>
                        <Link
                            to="/"
                            className={`nav-link ${selected === 'Home' ? 'selected' : ''}`}
                            onClick={() => handleClick('Home')}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/todos"
                            className={`nav-link ${selected === 'Your Tasks' ? 'selected' : ''}`}
                            onClick={() => handleClick('Your Tasks')}
                        >
                            Your Tasks
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className={`hidden md:flex space-x-8 md:pr-14 p-5`}>
                <li className='mt-2 md:mt-0'>
                    <Link
                        to="/"
                        className={`nav-link ${selected === 'Home' ? 'selected' : ''}`}
                        onClick={() => handleClick('Home')}
                    >
                        Home
                    </Link>
                </li>
                <li className='mt-2 md:mt-0'>
                    <Link
                        to="/todos"
                        className={`nav-link ${selected === 'Your Tasks' ? 'selected' : ''}`}
                        onClick={() => handleClick('Your Tasks')}
                    >
                        Your Tasks
                    </Link>
                </li>
            </ul>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    {menuOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
