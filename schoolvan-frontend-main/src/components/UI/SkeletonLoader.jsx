import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonLoader = ({ className = '', variant = 'rectangular' }) => {
  const roundedClass = variant === 'circular' ? 'rounded-full' : 'rounded-2xl';

  return (
    <motion.div
      className={`bg-gray-200 overflow-hidden relative ${roundedClass} ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{ translateX: ['-100%', '100%'] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear'
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
        }}
      />
    </motion.div>
  );
};
