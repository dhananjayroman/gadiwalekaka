import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }
};

const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'slideUp', 
  delay = 0,
  once = true
}) => {
  const selectedVariant = variants[animationType] || variants.slideUp;

  // Clone variant and add delay if provided
  const customVariant = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
