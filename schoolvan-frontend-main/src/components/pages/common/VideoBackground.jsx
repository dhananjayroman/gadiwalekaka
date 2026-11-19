import React from "react";
import { motion } from "framer-motion";

const VideoBackground = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gray-900"
    >
      <video 
        className="w-full h-full object-cover opacity-60" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/videos/istockvideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-gray-50"></div>
    </motion.div>
  );
};

export default VideoBackground;

