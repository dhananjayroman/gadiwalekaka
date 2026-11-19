import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Heart, Award, CheckCircle } from 'lucide-react';
import AdmissionPage from '../admissions/AdmissionPage';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen overflow-hidden">
      <Helmet>
        <title>About Us | SchoolVan</title>
        <meta name="description" content="Learn about our commitment to providing a safe, reliable, and joyous daily commute for your children." />
      </Helmet>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent -z-10" />
      <div className="absolute top-40 -left-20 w-96 h-96 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#F4B400] animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Who We Are</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Redefining <span className="text-[#F4B400]">Student</span> Transportation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            We are committed to providing a safe, reliable, and joyous daily commute for your children, giving parents complete peace of mind.
          </motion.p>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative mb-16 lg:mb-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F4B400]/20 to-[#F4B400]/5 rounded-[2.5rem] transform -rotate-3 scale-105 -z-10 blur-xl"></div>
            <div className="relative rounded-[2.5rem] p-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" 
                alt="School van with happy kids" 
                loading="lazy"
                className="w-full h-auto rounded-[2rem] object-cover aspect-[4/3] lg:aspect-auto lg:h-[550px] transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden md:flex"
              >
                <div className="bg-yellow-100 p-3 rounded-full text-[#F4B400]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-500 font-medium">Safe Rides</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-5 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="text-5xl font-black text-[#F4B400]">5+</div>
                <div className="text-sm font-bold text-gray-700 leading-snug uppercase tracking-wide">
                  Years of <br /> Excellence
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Parents Choose Us
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed">
              Our school van service goes beyond just picking up and dropping off. We build a trusted environment where kids feel comfortable and parents feel secure.
            </motion.p>
            
            <div className="space-y-5">
              {[
                { icon: ShieldCheck, title: "Safety First", desc: "Rigorous background checks and strict safety protocols.", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Heart, title: "Child Friendly", desc: "Caretakers trained to manage kids with love and immense patience.", color: "text-rose-500", bg: "bg-rose-50" },
                { icon: Award, title: "Punctuality", desc: "We value your time and ensure on-time pickups and drops.", color: "text-[#F4B400]", bg: "bg-yellow-50" }
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
                  <div className={`${feature.bg} ${feature.color} p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} strokeWidth={2.5}/>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="pt-6">
              <Link to="/rules">
                <button className="btn-primary flex items-center gap-2 px-8 py-4 text-lg group">
                  Read Rules for Students 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
      
      {/* Admission Form Section */}
      <div className="mt-20">
        <AdmissionPage />
      </div>
    </div>
  );
};

export default About;

