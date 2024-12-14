import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-16">
          {/* Image Container */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden drop-shadow-lg p-4 transition-all duration-300">
              <Image src="/muslim.png" alt="Alim Logo" width={300} height={300} className="w-full h-full object-contain select-none pointer-events-none"/>
            </div>
          </div>

          {/* Content Container */}
          <div className="text-center md:text-left max-w-md space-y-6 select-none">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                What is Alim?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A comprehensive guide designed to support and empower new Muslims on their spiritual journey.
              </p>
            </div>

            <Button variant="contained" color="success" size="large" className="rounded-full w-full md:w-auto px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-green-600 dark:hover:bg-green-700" href="/signup">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
