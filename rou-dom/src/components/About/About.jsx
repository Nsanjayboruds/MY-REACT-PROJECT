import React from 'react';

export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="container mx-auto px-6 text-gray-700 dark:text-gray-300 md:px-12 xl:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1226.jpg?semt=ais_hybrid&w=740"
              alt="Startup Illustration"
              className="rounded-xl shadow-lg hover:scale-105 transition duration-500"
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 animate-fadeIn">
            <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-transparent mb-6">
              Passionate React Developers 🚀
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              React development is carried out by developers who are deeply committed to building interactive and scalable UIs.
            </p>
            <p className="text-base leading-relaxed">
              Whether it's web apps, dashboards, or complex frontends — we focus on delivering fast, maintainable, and beautiful experiences using the latest in modern JavaScript.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
