import React from 'react';
import { FaArrowUpLong } from "react-icons/fa6";

function LandingPage() {
  const lines = ["WE CREATE", "EYE OPENING", "PRESENTATIONS"];

  return (
    <div className="w-full h-screen bg-black text-white font-bold font-['Arial'] pt-10">

      {/* Hero Text Section */}
      <div className="px-20 mt-40 space-y-2">
        {lines.map((line, index) => (
          <div className="relative overflow-hidden" key={index}>
            {/* Red box behind "EYE" */}
            {index === 1 && (
              <div className="absolute w-14 h-8 bg-[#FF4A2D] left-0 top-1/2 -translate-y-1/2 z-0 rounded-sm"></div>
            )}
            <h1 className="relative z-10 text-[7vw] leading-[6.5vw] uppercase tracking-tight">
              {line}
            </h1>
          </div>
        ))}
      </div>

      {/* Bottom Tagline + CTA */}
      <div className="px-20 mt-20 border-t border-zinc-700 py-5 flex justify-between items-center">

        {/* Taglines */}
        <div className="flex flex-col gap-1 text-sm font-light tracking-tight">
          <p>For public and private companies</p>
          <p>From the first pitch to IPO</p>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <div className="px-5 py-2 border-2 border-zinc-500 rounded-full text-sm uppercase font-light hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            Start the project
          </div>
          <div className="w-10 h-10 flex items-center justify-center border-2 border-zinc-700 rounded-full">
            <span className="rotate-[45deg]">
              <FaArrowUpLong />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
