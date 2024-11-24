import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { FiHome, FiPlus, FiUser, FiLogIn, FiInfo } from 'react-icons/fi'; 

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile navigation toggle

  const toggleNav = () => {
    setIsOpen(!isOpen); // Toggling the navigation menu visibility
  };

  return (
    <nav className="bg-lime-600 p-4 text-white"> {/* Navbar container with background color and padding */}
      <div className="container mx-auto flex justify-between items-center"> {/* Flex container for content alignment */}
       
        <div className="text-xl font-bold hidden lg:block"> {/* Brand name, hidden on small screens */}
          <Link to="/">Mello Techy</Link> {/* Link to the homepage */}
        </div>

        {/* Mobile navigation button */}
        <button
          className="lg:hidden p-2" // Button visible only on small screens
          onClick={toggleNav} // Trigger the navigation toggle on button click
          aria-label="Toggle Navigation" // Accessibility label for the button
        >
         
          {/* Hamburger menu icon displayed when navigation is closed */}
          {!isOpen && (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}

          {/* Cross icon displayed when navigation is open */}
          {isOpen && (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </button>

        {/* Navbar links */}
        <ul
          className={`${
            isOpen ? 'block' : 'hidden' // Toggle display of navigation items based on isOpen state
          } lg:flex space-x-4 mt-4 lg:mt-0`} // Items arranged horizontally on large screens
        >
          {/* Home link */}
          <li className="relative group">
            <Link to="/" className="p-2 hover:bg-blue-700 rounded-full">
              <FiHome size={18} /> {/* Home icon */}
            </Link>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Home {/* Tooltip text shown on hover */}
            </div>
          </li>

          {/* Add Recipe link */}
          <li className="relative group">
            <Link to="/addRecipe" className="p-2 hover:bg-blue-700 rounded-full">
              <FiPlus size={18} /> {/* Add Recipe icon */}
            </Link>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Add Recipe {/* Tooltip text shown on hover */}
            </div>
          </li>

          {/* Register link */}
          <li className="relative group">
            <Link to="/register" className="p-2 hover:bg-blue-700 rounded-full">
              <FiUser size={18} /> {/* Register icon */}
            </Link>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Register {/* Tooltip text shown on hover */}
            </div>
          </li>

          {/* Login link */}
          <li className="relative group">
            <Link to="/login" className="p-2 hover:bg-blue-700 rounded-full">
              <FiLogIn size={18} /> {/* Login icon */}
            </Link>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Login {/* Tooltip text shown on hover */}
            </div>
          </li>

          {/* About link */}
          <li className="relative group">
            <Link to="/about" className="p-2 hover:bg-blue-700 rounded-full">
              <FiInfo size={18} /> {/* About icon */}
            </Link>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 bg-gray-800 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              About {/* Tooltip text shown on hover */}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
