import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-9xl font-black text-gray-200">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-24 h-24 text-[#F4B400] bg-white rounded-full p-2" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like the school van took a wrong turn. The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4"
            >
              <Home size={20} /> Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;

