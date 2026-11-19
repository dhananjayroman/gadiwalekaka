import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.99 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut"
      }}
      className={`min-h-[calc(100vh-80px)] w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
