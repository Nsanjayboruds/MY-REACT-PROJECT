import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import video from '../header/logo.mp4';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Github', path: '/github' },
    ];

    return (
        <header className="shadow-lg sticky top-0 z-50 bg-gradient-to-r from-white via-orange-50 to-white backdrop-blur-md">
            <nav className="max-w-screen-xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-16 h-12 rounded-full ring-2 ring-orange-500 drop-shadow-lg"
                    />
                    <span className="text-xl font-bold text-orange-700 hidden sm:inline">Nborude</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-8 items-center">
                    {navLinks.map(({ name, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `text-sm font-semibold px-3 py-2 rounded transition duration-300 ${
                                    isActive
                                        ? 'text-orange-700 bg-orange-100'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                                }`
                            }
                        >
                            {name}
                        </NavLink>
                    ))}
                    <Link
                        to="#"
                        className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium transition duration-300"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden px-4 transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-screen py-4' : 'max-h-0'
                }`}
            >
                <ul className="space-y-3">
                    {navLinks.map(({ name, path }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block text-base font-semibold py-2 px-4 rounded transition ${
                                        isActive
                                            ? 'text-orange-700 bg-orange-100'
                                            : 'text-gray-700 hover:bg-orange-50'
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="#"
                            className="block bg-orange-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition"
                        >
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
