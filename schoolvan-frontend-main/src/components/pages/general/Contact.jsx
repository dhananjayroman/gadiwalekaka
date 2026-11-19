import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MessageSquare, Send, MapPin, Clock, Headset } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const message = `Hello Dhananjay, I am ${formData.name}. Phone: ${formData.phone}, Email: ${formData.email}. Message: ${formData.message}`;
        const url = `https://wa.me/919767839472?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        Swal.fire('Error', 'Failed to send contact data', 'error');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Contact Us | SchoolVan</title>
        <meta name="description" content="Get in touch with SchoolVan. We're here to answer any questions or feedback about our student transportation services." />
      </Helmet>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#F4B400] animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">24/7 Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Get in <span className="text-[#F4B400]">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Reach out to us and we will get back to you as soon as possible. Whether it's a query, suggestion, or feedback, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-5 mb-12 lg:mb-0"
          >
            <div className="bg-gray-900 p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden h-full flex flex-col">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F4B400]/20 rounded-full blur-3xl" />
              
              <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-8 flex-1">
                {[
                  { icon: MapPin, title: "Our Office", desc: "GadiWaleKaka Headquarters, Bhor, Pune, Maharashtra 412206" },
                  { icon: Phone, title: "Phone", desc: "+91 8600757587" },
                  { icon: Clock, title: "Working Hours", desc: "Mon - Sat: 8:00 AM - 6:00 PM" }
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="bg-gray-800 p-4 rounded-2xl group-hover:bg-[#F4B400] group-hover:text-gray-900 transition-colors text-[#F4B400]">
                      <info.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{info.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
                <p className="text-gray-400 font-medium">Follow us on social media</p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F4B400] hover:text-gray-900 cursor-pointer transition-colors">
                    <Headset size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User size={16} className="text-[#F4B400]"/> Full Name
                    </label>
                    <input
                      type="text" name="name" placeholder="John Doe" required
                      value={formData.name} onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4B400]/50 focus:border-[#F4B400] transition-all outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone size={16} className="text-[#F4B400]"/> Phone Number
                    </label>
                    <input
                      type="tel" name="phone" placeholder="+91 0000000000" required
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4B400]/50 focus:border-[#F4B400] transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Mail size={16} className="text-[#F4B400]"/> Email Address
                  </label>
                  <input
                    type="email" name="email" placeholder="john@example.com" required
                    value={formData.email} onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4B400]/50 focus:border-[#F4B400] transition-all outline-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#F4B400]"/> Message
                  </label>
                  <textarea
                    name="message" rows="5" placeholder="How can we help you today?" required
                    value={formData.message} onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4B400]/50 focus:border-[#F4B400] transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={isLoading}
                  className={`btn-primary w-full flex items-center justify-center gap-3 mt-4 text-lg py-4 rounded-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message & Open WhatsApp <Send size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 bg-white p-2 md:p-4 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="rounded-[2rem] overflow-hidden w-full h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15154.542456488118!2d73.83447955541992!3d18.156829700000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a3a0e051c5eb%3A0xc6fb0e060ebf08!2sBhor%2C%20Maharashtra%20412206!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="GadiWaleKaka Office Location"
            ></iframe>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;

