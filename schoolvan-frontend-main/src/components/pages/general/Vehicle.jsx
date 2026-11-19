import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield, ShieldCheck, ThermometerSnowflake, CheckCircle2, PlayCircle } from "lucide-react";

const vehicles = [
  { id: 1, src: "/images/bus-1.jpeg", title: "Premium School Bus", desc: "Spacious seating with strict safety protocols designed for longer routes.", capacity: 40, driver: "Eknath Roman", available: 10, number: "MH-12-NX-8984" },
  { id: 2, src: "/images/bus-2.jpeg", title: "Comfort School Van", desc: "Ideal for smaller groups, equipped with modern amenities and quick boarding.", capacity: 15, driver: "Eknath Roman", available: 10, number: "MH-12-NX-8984" },
  { id: 3, src: "/images/bus-3.jpeg", title: "Mini Bus Express", desc: "Fast and reliable transit with dedicated caretakers for neighborhood routes.", capacity: 25, driver: "Eknath Roman", available: 10, number: "MH-12-NX-8984" },
];

const Vehicle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Our Vehicles | SchoolVan</title>
        <meta name="description" content="Explore our fleet of well-maintained, comfortable, and safe school vans and buses." />
      </Helmet>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our <span className="text-[#F4B400]">Vehicles Facility</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We take pride in offering a comfortable and safe ride for your children. Our fleet of well-maintained vehicles ensures timely and reliable transportation.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 gap-12 items-center">
          {/* Carousel Section */}
          <div className="lg:col-span-8 mb-12 lg:mb-0">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-900 aspect-[16/10] group border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={vehicles[currentIndex].src}
                  alt={vehicles[currentIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4B400] text-gray-900 text-xs font-bold uppercase tracking-wider mb-4">
                    <PlayCircle size={14} /> Fleet Spotlight
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{vehicles[currentIndex].title}</h3>
                  <p className="text-gray-300 text-lg max-w-2xl mb-6">{vehicles[currentIndex].desc}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Vehicle No.</p>
                      <p className="text-white font-bold">{vehicles[currentIndex].number}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Driver</p>
                      <p className="text-white font-bold">{vehicles[currentIndex].driver}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Capacity</p>
                      <p className="text-white font-bold">{vehicles[currentIndex].capacity} Seats</p>
                    </div>
                    <div className="bg-[#F4B400]/20 backdrop-blur-md rounded-xl p-3 border border-[#F4B400]/30">
                      <p className="text-xs text-yellow-300 uppercase font-semibold mb-1">Available</p>
                      <p className="text-yellow-400 font-bold">{vehicles[currentIndex].available} Seats</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Controls */}
              <button 
                onClick={handlePrev}
                aria-label="Previous vehicle"
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-[#F4B400] hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20 hover:border-transparent hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                aria-label="Next vehicle"
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-[#F4B400] hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20 hover:border-transparent hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-8 right-12 flex gap-2">
                {vehicles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to vehicle ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-[#F4B400]' : 'w-2.5 bg-white/40 hover:bg-white'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">Premium Amenities</h3>
            
            {[
              { icon: ShieldCheck, title: "GPS Tracking", desc: "Real-time location monitoring for complete peace of mind.", color: "text-[#F4B400]", bg: "bg-yellow-50" },
              { icon: ThermometerSnowflake, title: "Air Conditioned", desc: "Comfortable climate control for all weather conditions.", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Shield, title: "Trained Staff", desc: "Experienced drivers and caretakers dedicated to child safety.", color: "text-green-500", bg: "bg-green-50" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex gap-5 items-start"
              >
                <div className={`${feature.bg} p-4 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={feature.color} size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
                    {feature.title} <CheckCircle2 size={16} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;

