import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 40, color = '#F4B400' }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        style={{
          width: size,
          height: size,
          border: `4px solid ${color}40`,
          borderTop: `4px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
      />
    </div>
  );
};
