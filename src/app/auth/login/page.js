"use client";
import { supabase } from '@/app/createClient';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Image Section */}
          <div className="md:w-1/2 bg-gray-900 flex items-center justify-center p-8">
            <div className="text-center">
              <Image 
                src="/muslim.png" 
                alt="Alim Logo" 
                width={300} 
                height={300} 
                className="rounded-full border-4 border-indigo-500 shadow-lg" 
              />
              <h2 className="text-3xl font-bold text-white mt-6">
                Welcome to Alim
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Your comprehensive guide to supporting and empowering your spiritual journey.
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="md:w-1/2 bg-gray-900 p-8 flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <h1 className="text-4xl font-extrabold text-white mb-2">
                  Login
                </h1>
                <p className="text-gray-400">
                  Enter your email and password to login
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out" 
                  />
                </div>

                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Password
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out" 
                  />
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out text-white font-semibold"
                >
                  Login
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account? <a href="/auth/signup" className="text-indigo-500 hover:text-indigo-700 transition">Create Account</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;