import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../services/api';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    if(!firstname || !lastname || !username || !email || !password){
      setError("All fields are required ")
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + '/user/signup',
        { firstname, lastname, username, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials.");
      } else {
        const msg=err?.response?.data?.message || "Signup failed. Please try again."
        setError(msg);
      }
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 sm:p-10 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              value={firstname}
              placeholder="Enter first name"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              value={lastname}
              placeholder="Enter last name"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter username"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSignup}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
