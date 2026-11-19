import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, IndianRupee, MapPin, Info, Award } from "lucide-react";

const schoolsData = [
  {
    title: "Raja RaghunathRao Vidhalaya Bhor",
    description: "Academic excellence and holistic growth.",
    pickup: "7:30 AM",
    drop: "1:00 PM",
    timing: "8:00 AM - 1:00 PM",
    fee: "₹700",
    distance: "5 km",
    image: "/images/school-1.jpg",
  },
  {
    title: "Jijamata English Medium School Bhor",
    description: "Creativity and discipline in a green campus.",
    pickup: "7:30 AM",
    drop: "1:00 PM",
    timing: "8:00 AM - 1:00 PM",
    fee: "₹700",
    distance: "7 km",
    image: "/images/school-2.jpg",
  },
  {
    title: "Vidhyapratishthan English Medium School Bhor",
    description: "Value-based education from one of the oldest schools.",
    pickup: "10:00 AM",
    drop: "5:00 PM",
    timing: "10:30 AM - 5:00 PM",
    fee: "₹700",
    distance: "10 km",
    image: "/images/school-3.jpg",
  },
];

const School = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);

  const handleMoreInfo = (school) => {
    setSelectedSchool(school);
    setTimeout(() => {
      const element = document.getElementById("schoolDetails");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Partner Schools | SchoolVan</title>
        <meta name="description" content="Explore our network of partner schools where we provide dedicated, timely, and safe transportation services for students." />
      </Helmet>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#F4B400]"></span>
            <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Our Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Partner <span className="text-[#F4B400]">Schools</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We provide dedicated, timely, and safe transportation services for students from the most reputed institutions in the region.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolsData.map((school, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden shrink-0 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10" />
                <img
                  src={school.image}
                  alt={`Image of ${school.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-2xl font-bold text-white line-clamp-2 leading-tight">
                    {school.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                  {school.description}
                </p>
                
                <div className="mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:bg-yellow-50/50 transition-colors">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-white p-1.5 rounded-lg shadow-sm text-[#F4B400]">
                        <Clock size={16} />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase font-semibold">Timing</span>
                        <p className="font-bold text-gray-900 text-sm">{school.timing}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-white p-1.5 rounded-lg shadow-sm text-[#F4B400]">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase font-semibold">Distance</span>
                        <p className="font-bold text-gray-900 text-sm">{school.distance}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-500 uppercase">Monthly Fee</span>
                    <span className="text-xl font-extrabold text-[#F4B400]">{school.fee}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleMoreInfo(school)}
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-auto text-lg py-3"
                >
                  <Info size={18} /> View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedSchool && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 64 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
              id="schoolDetails"
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl border border-gray-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
                
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-100 mb-4 text-yellow-600 font-semibold text-sm">
                      <Award size={14} /> Selected School
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                      {selectedSchool.title}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-blue-500">
                          <Clock size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pickup Time</p>
                          <p className="text-xl font-extrabold text-gray-900">{selectedSchool.pickup}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
                        <div className="bg-white p-3 rounded-xl shadow-sm text-rose-500">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Drop Time</p>
                          <p className="text-xl font-extrabold text-gray-900">{selectedSchool.drop}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl min-w-[280px] text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl" />
                    <IndianRupee size={40} className="text-[#F4B400] mx-auto mb-4" />
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">Monthly Charges</p>
                    <p className="text-5xl font-black text-white mb-2">₹700</p>
                    <p className="text-sm text-gray-500 font-medium">per student / month</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default School;


