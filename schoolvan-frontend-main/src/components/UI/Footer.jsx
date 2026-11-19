import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';

const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-12 pb-6 text-gray-400 relative overflow-hidden font-sans">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F4B400]/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-8">
          
          {/* Brand & About */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex flex-col items-start group">
              <div className="bg-white p-2 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                <img src="/images/gadilogo.png" alt="Logo" className="h-14 w-auto" />
              </div>
              <h4 className="text-2xl font-extrabold text-white tracking-tight">
                GadiWaleKaka<span className="text-[#F4B400]">.Com</span>
              </h4>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm pr-4">
              Providing safe, reliable, and comfortable daily transportation for students. We give parents complete peace of mind while ensuring kids enjoy their journey to school.
            </p>
            <div className="flex gap-3 pt-2">
              {[FacebookIcon, TwitterIcon, InstagramIcon].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl hover:bg-[#F4B400] hover:border-[#F4B400] hover:text-gray-950 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:ml-8">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B400]"></span>
              Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Partner Schools', path: '/school' },
                { name: 'Student Rules', path: '/rules' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="group flex items-center text-sm text-gray-400 hover:text-[#F4B400] transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B400]"></span>
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-[#F4B400]/10 transition-colors mt-0.5">
                  <MapPin size={16} className="text-[#F4B400]" />
                </div>
                <span className="leading-relaxed">Headquarters, Bhor, Pune, <br/>Maharashtra 412206</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-[#F4B400]/10 transition-colors">
                  <Phone size={16} className="text-[#F4B400]" />
                </div>
                <span>+91 8600757587</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-[#F4B400]/10 transition-colors">
                  <Mail size={16} className="text-[#F4B400]" />
                </div>
                <span>gadiwalekaka@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-900 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} GadiWaleKaka.Com. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/rules" className="hover:text-[#F4B400] transition-colors">Privacy Policy</Link>
            <Link to="/rules" className="hover:text-[#F4B400] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
