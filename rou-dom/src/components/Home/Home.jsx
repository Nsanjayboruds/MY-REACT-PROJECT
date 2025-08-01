import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pro from './profile.jpg'; // Ensure profile.jpg is in /src/Home/

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/viewproject');
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      {/* Hero Section */}
      <section className="bg-orange-50 dark:bg-gray-800 rounded-xl shadow-xl sm:mx-16 mx-2 sm:py-20 py-14 transition-all duration-500">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-10">
            
            {/* Left: Text and Actions */}
            <div className="max-w-xl space-y-8 text-center sm:text-left animate-fadeInUp">
              <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Hi, I'm Nishant
                <span className="block mt-2 text-black dark:text-white text-3xl sm:text-4xl">
                  Web Developer | UI/UX Enthusiast
                </span>
              </h2>

              {/* SVG Link to Projects */}
              <Link to="/projects" className="inline-block">
                <svg
                  width="36"
                  height="36"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="orange"
                  className="transition-transform hover:scale-110 mb-4"
                >
                  <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                </svg>
              </Link>

              {/* Button to Navigate */}
              <button
                onClick={handleClick}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105"
              >
                Go to Projects
              </button>
            </div>

            {/* Right: Profile Image */}
            <div className="flex justify-center sm:justify-end">
              <img
                className="w-60 sm:w-80 grayscale hover:grayscale-0 transition-all duration-500 rounded-full border-4 border-orange-300 dark:border-gray-700 shadow-lg"
                src={pro}
                alt="Nishant Profile"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
