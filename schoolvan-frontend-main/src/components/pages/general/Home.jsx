import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdmissionPage from "../admissions/AdmissionPage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Clock, Heart, Users, Star, Award, 
  ChevronDown, CheckCircle, Bus, MapPin, Quote 
} from "lucide-react";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

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

  const faqs = [
    { question: "How safe are your school vans?", answer: "Our school vans go through rigorous daily checks. All our drivers are verified, background-checked, and have years of experience in student transportation." },
    { question: "Do you provide door-to-door service?", answer: "Yes, we provide safe door-to-door pickup and drop-off services to ensure maximum convenience and safety for your children." },
    { question: "How can I track the van?", answer: "We provide real-time updates and direct communication with the driver through our platform, giving parents complete peace of mind." },
    { question: "What happens if a van breaks down?", answer: "We have backup vehicles on standby in all our service areas to ensure there is minimal delay and students reach school on time." },
  ];

  return (
    <>
      <Helmet>
        <title>SchoolVan | Safe & Reliable Student Transport</title>
        <meta name="description" content="Ensure your child's daily commute is in safe hands. We provide verified drivers, timely pickups, and complete peace of mind for parents." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 pt-20 pb-24 lg:pt-32 lg:pb-36 min-h-[90vh] flex items-center">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/40 via-gray-50 to-gray-50 -z-10" />
        
        {/* Animated background blobs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left mb-16 lg:mb-0"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#F4B400] animate-pulse"></span>
                <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Trusted by 1000+ Parents</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                Safe & Reliable <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4B400] to-yellow-600">School Transport</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ensure your child's daily commute is in safe hands. We provide verified drivers, timely pickups, and complete peace of mind for parents.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex items-center justify-center gap-2 text-lg">
                    <Bus size={20} />
                    Book a Ride Now
                 </motion.button>
                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary flex items-center justify-center gap-2 text-lg">
                    Learn More
                 </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Image / Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:ml-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F4B400]/30 to-[#F4B400]/10 rounded-[3rem] transform rotate-3 scale-105 -z-10 blur-2xl"></div>
              <div className="relative rounded-[2.5rem] p-2 bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students boarding a yellow school van safely" 
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-[2rem] transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden sm:flex"
                >
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Safety Rate</p>
                    <p className="text-xl font-bold text-gray-900">100%</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Parents <span className="text-[#F4B400]">Trust Us</span>
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              We've built our service around the core values of safety, punctuality, and care.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: ShieldCheck, title: "Verified Drivers", desc: "Every driver undergoes strict background checks and training before they are allowed to drive our vans.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Clock, title: "Always on Time", desc: "Optimized routing and punctuality ensures students reach school and home exactly on time.", color: "text-[#F4B400]", bg: "bg-yellow-50" },
              { icon: Heart, title: "Caring Environment", desc: "We treat every child with the utmost care, ensuring they have a stress-free and pleasant journey.", color: "text-rose-500", bg: "bg-rose-50" }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -10 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon size={32} strokeWidth={2}/>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mb-12 lg:mb-0 relative"
            >
              <div className="absolute inset-0 bg-[#F4B400] rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000" alt="Happy students smiling inside a school van" loading="lazy" className="rounded-3xl shadow-2xl relative z-10 object-cover h-[500px] w-full" />
              
              {/* Decorative SVG */}
              <div className="absolute -bottom-10 -right-10 z-20 text-[#F4B400] opacity-80 hidden md:block">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                </svg>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                More Than Just <span className="text-[#F4B400]">Transportation</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                We bridge the gap between home and school with a service designed specifically for students' safety and parents' peace of mind.
              </motion.p>
              
              <div className="space-y-6">
                {[
                  "Door-to-door safe pickup and drop-off",
                  "Strict adherence to traffic and safety rules",
                  "Regular maintenance of all vehicles",
                  "Friendly staff trained in child safety"
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-1.5 rounded-full mt-1 shrink-0">
                      <CheckCircle className="text-[#F4B400]" size={20} />
                    </div>
                    <p className="text-gray-700 text-lg font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[#F4B400] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "5000+", label: "Happy Students" },
              { icon: Bus, number: "150+", label: "Safe Vans" },
              { icon: Award, number: "25+", label: "Partner Schools" },
              { icon: Star, number: "10+", label: "Years Experience" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
                    <stat.icon size={36} className="text-gray-900" />
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-900 font-bold text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
           <svg className="absolute left-0 top-20 text-gray-50 opacity-50" width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <path fill="currentColor" d="M45,-77C58.3,-69.3,69.1,-56,76.6,-41.4C84.1,-26.8,88.3,-11,85.2,3.3C82.1,17.6,71.7,30.4,61.1,41.9C50.5,53.4,39.7,63.6,26.5,70.1C13.3,76.6,-2.3,79.4,-17.1,76.7C-31.9,74,-45.9,65.8,-55.8,54.6C-65.7,43.4,-71.5,29.2,-75.4,14.4C-79.3,-0.4,-81.3,-15.8,-76.3,-28.9C-71.3,-42,-59.3,-52.8,-46.3,-60.7C-33.3,-68.6,-19.3,-73.6,-2.1,-70.7C15.1,-67.8,31.7,-84.7,45,-77Z" transform="translate(100 100)" />
           </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              What Parents <span className="text-[#F4B400]">Say</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Don't just take our word for it. Hear from the parents who trust us every day.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "Parent", text: "GadiWaleKaka has been a lifesaver. The drivers are polite, and my kids love traveling in their vans. Complete peace of mind!" },
              { name: "Rahul Deshmukh", role: "Parent", text: "Punctuality is their strong suit. The van is always on time, and the condition of the vehicles is top-notch." },
              { name: "Sneha Patel", role: "Parent", text: "Safety was my biggest concern, but their transparent communication and verified drivers made me trust them completely." }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-3xl p-8 relative border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 group"
              >
                <Quote className="absolute top-6 right-8 text-[#F4B400] opacity-20 group-hover:opacity-40 transition-opacity" size={80} />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-tr from-[#F4B400] to-yellow-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed relative z-10">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Our <span className="text-[#F4B400]">Gallery</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg"
            >
              Glimpses of our daily routes and happy students.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1584697964190-7cb805a5a22d?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1517520286547-488665f57a9e?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden bg-gray-800"
              >
                <img src={img} alt={`School van gallery image ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 opacity-80 hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Frequently Asked <span className="text-[#F4B400]">Questions</span>
            </motion.h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === index ? 'bg-white border-[#F4B400] shadow-lg' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <motion.div 
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 p-2 rounded-full ${activeFaq === index ? 'bg-[#F4B400] text-gray-900' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div id={`faq-answer-${index}`} className="px-6 pb-5 text-gray-600 leading-relaxed pt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action & Admissions */}
      <div id="admissions" className="relative bg-white pt-10">
        <AdmissionPage />
      </div>
    </>
  );
};

export default Home;

