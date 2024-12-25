import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mountain, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { TOUR_CATEGORIES } from '../types/categories';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTourMenu, setShowTourMenu] = useState(false);
  const [mobileTourMenu, setMobileTourMenu] = useState(false); // State for mobile tour menu
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
    setShowTourMenu(false);
    setMobileTourMenu(false); // Reset mobile menu state on navigation
  }, [location]);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Mountain Mirage" className="h-12 w-12" />
              <span className="ml-2 text-xl font-bold text-gray-800">Mountain Mirage Backpackers</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            
            <div className="relative">
              <button 
                className="flex items-center text-gray-600 hover:text-blue-600"
                onMouseEnter={() => setShowTourMenu(true)}
                onClick={() => setShowTourMenu(!showTourMenu)}
              >
                Tours <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {showTourMenu && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1"
                  onMouseLeave={() => setShowTourMenu(false)}
                >
                  {TOUR_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to={`/tours?category=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
            <Link to="/events" className="text-gray-600 hover:text-blue-600">Events</Link>
            <Link to="/past-events" className="text-gray-600 hover:text-blue-600">Past Events</Link>
            <Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</Link>
            
            <div className="block">
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileTourMenu(!mobileTourMenu)}
              >
                <span>Tours</span>
                {mobileTourMenu ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {mobileTourMenu && (
                <div className="pl-6">
                  {TOUR_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to={`/tours?category=${encodeURIComponent(category)}`}
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Blog</Link>
            <Link to="/events" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Events</Link>
            <Link to="/past-events" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Past Events</Link>
            <Link to="/careers" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Careers</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
