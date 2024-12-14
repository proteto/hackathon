import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 lg:space-x-16">
          {/* Image Container */}
          <div className="flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-full p-4 w-full md:w-auto">
              <Image src="/muslim.png" alt="Alim Logo" width={300} height={300} className="w-full h-full object-contain select-none pointer-events-none rounded-full" />
            </div>
          </div>

          {/* Content Container */}
          <div className="text-center md:text-left max-w-md space-y-6 select-none">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 tracking-tight leading-tight">
                What is Alim?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A comprehensive guide designed to support and empower new Muslims on their spiritual journey.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="submit" variant="contained" color="success" size="large" className="w-full rounded-full px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-green-600 dark:hover:bg-green-700" href='/signup'>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

