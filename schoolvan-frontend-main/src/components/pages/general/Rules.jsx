import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

const Rules = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const rulesList = [
    { title: "Maintain discipline while boarding", desc: "Do not rush or push others while getting in or out of the van." },
    { title: "Wear seat belts", desc: "It is mandatory for every student to wear a seat belt throughout the journey." },
    { title: "Avoid behavior that disturbs others", desc: "Do not create noise, shout, or trouble other students." },
    { title: "Be polite and respectful", desc: "Stay calm, speak respectfully, and show courtesy to the driver." },
    { title: "Do not touch windows or panels", desc: "It can be dangerous to touch windows or internal panels while moving." },
    { title: "Only bring essential items", desc: "Avoid bringing large or hazardous items inside the van." },
    { title: "Avoid carrying food or drinks", desc: "Especially avoid messy or spill-prone items inside the vehicle." },
    { title: "Minimize noise near the school", desc: "Keep noise under control, especially around the school area." },
    { title: "Follow instructions from the driver", desc: "Always listen to the van driver or assistant for your safety." },
    { title: "Get off the van calmly", desc: "When the van stops, do not rush. Exit one student at a time." },
  ];

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-transparent -z-10" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-100/40 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-[#F4B400] transition-colors font-semibold bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
            <ShieldAlert size={64} className="mx-auto mb-6 text-[#F4B400] opacity-90" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Rules for Students</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Please adhere to these guidelines to ensure a safe, disciplined, and comfortable journey for everyone.</p>
          </div>

          <div className="p-8 md:p-14">
            <div className="relative border-l-4 border-yellow-200 ml-4 md:ml-8 space-y-12">
              {rulesList.map((rule, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-12"
                >
                  <div className="absolute -left-[26px] top-0 bg-white border-4 border-[#F4B400] text-[#F4B400] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#F4B400]/50 hover:shadow-lg transition-all duration-300 card-lift">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {rule.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {rule.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex gap-4 items-center"
            >
              <AlertCircle size={32} className="text-[#F4B400] shrink-0" />
              <p className="text-gray-800 font-medium">Failure to comply with these rules may result in temporary or permanent suspension from the van service.</p>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Rules;

