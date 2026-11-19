import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Mail, Lock, Car, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const CarOwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carowner/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.ok) {
        // store a fake token or backend-generated token
        localStorage.setItem('carOwnerLoggedIn', 'true');
        localStorage.setItem('carOwnerToken', data.token || "dummy-token");

        Swal.fire('Success', 'Logged in as Car Owner', 'success');
        navigate('/admissions');
      } else {
        Swal.fire('Login Failed', data.error || 'Invalid credentials', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Server error. Try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <Helmet>
        <title>Car Owner Portal | SchoolVan</title>
        <meta name="description" content="Sign in to manage your school van admissions." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 glass-card p-10 border-t-4 border-[#F4B400] card-lift">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4"
          >
            <Car className="h-8 w-8 text-[#F4B400]" />
          </motion.div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Car Owner Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your school van
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400] transition-all duration-300">
              <Mail className="h-5 w-5 text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
            
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400] transition-all duration-300">
              <Lock className="h-5 w-5 text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors shrink-0"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-gray-900 bg-[#F4B400] hover:bg-yellow-500 focus:outline-none transition-all ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? "Logging in..." : "Login as Car Owner"}
          </motion.button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Looking for student login?{" "}
            <Link to="/login" className="font-semibold text-[#F4B400] hover:underline">
              Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarOwnerLogin;
