import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('vaibhav@gmail.com');
  const [password, setPassword] = useState('Vaibhav@123');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  setError('');
  if (!email || !password) {
    setError("Please enter both email and password.");
    return;
  }

  try {
    const res = await axios.post(
      BASE_URL + "/user/login",
      { email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data));
    navigate("/home");
  } catch (err) {
    const msg = err?.response?.data?.message || "Login failed. Please try again.";
    setError(msg);
    console.error("Login failed:", err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 sm:p-10 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Login 
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm sm:text-base text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:outline-indigo-400 rounded-lg p-2 sm:p-3 transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mt-1">
              <a href="#" className="text-indigo-400 text-xs sm:text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-200"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6">
          New to DevHub?{' '}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
