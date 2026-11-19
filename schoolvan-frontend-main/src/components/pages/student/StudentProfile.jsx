import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, CheckCircle, Clock, MapPin, Phone, School, Bus, LogOut, Edit3 } from "lucide-react";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [admissionDetails, setAdmissionDetails] = useState(null);

  useEffect(() => {
    // Read from localStorage
    const storedName = localStorage.getItem("studentName") || "Student";
    const storedEmail = localStorage.getItem("studentEmail") || "No email provided";
    const storedAdmission = localStorage.getItem("studentAdmission");

    setStudentName(storedName);
    setStudentEmail(storedEmail);
    if (storedAdmission) {
      try {
        setAdmissionDetails(JSON.parse(storedAdmission));
      } catch (err) {
        console.error("Failed to parse admission details from localStorage");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleEditAdmission = () => {
    navigate("/about");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen relative overflow-hidden font-sans">
      <Helmet>
        <title>Student Profile | SchoolVan</title>
        <meta name="description" content="View your SchoolVan student profile and admission details." />
      </Helmet>
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/30 via-transparent to-transparent -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          {/* Welcome Card */}
          <motion.div variants={fadeInUp} className="glass-card p-8 md:p-10 card-lift border-t-4 border-[#F4B400] relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#F4B400] to-yellow-300 rounded-full flex items-center justify-center text-gray-900 font-bold text-3xl shadow-lg border-4 border-white">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{studentName}</h1>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Mail size={16} />
                    <span className="font-medium">{studentEmail}</span>
                  </div>
                  
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-bold">
                    {admissionDetails ? (
                      <><span className="text-green-500"><CheckCircle size={16} /></span> <span className="text-gray-700">Admission Active</span></>
                    ) : (
                      <><span className="text-yellow-500"><Clock size={16} /></span> <span className="text-gray-700">Admission Pending</span></>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3">
                <button onClick={handleEditAdmission} className="btn-primary flex items-center justify-center gap-2 px-6 py-2.5 text-sm w-full md:w-auto">
                  <Edit3 size={16} /> {admissionDetails ? "Edit Form" : "Fill Form"}
                </button>
                <button onClick={handleLogout} className="btn-secondary flex items-center justify-center gap-2 px-6 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 w-full md:w-auto">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Admission Details Card */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="p-2 bg-[#F4B400] text-gray-900 rounded-xl shadow-md">
                <School size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Admission Details</h2>
            </div>

            {admissionDetails ? (
              <div className="glass-card p-8 md:p-10 card-lift space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 text-[#F4B400] rounded-xl"><School size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">School</p>
                      <p className="text-lg font-bold text-gray-900">{admissionDetails.schoolName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 text-[#F4B400] rounded-xl"><User size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grade / Class</p>
                      <p className="text-lg font-bold text-gray-900">{admissionDetails.studentClass}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 text-[#F4B400] rounded-xl"><Phone size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Parent Contact</p>
                      <p className="text-lg font-bold text-gray-900">{admissionDetails.parentPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 text-[#F4B400] rounded-xl"><Clock size={20} /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup / Drop Time</p>
                      <p className="text-lg font-bold text-gray-900">{admissionDetails.pickupTiming} - {admissionDetails.dropTiming}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-gray-100">
                  <div className="p-3 bg-yellow-50 text-[#F4B400] rounded-xl"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup Address</p>
                    <p className="text-base font-medium text-gray-700">{admissionDetails.pickupAddress}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F4B400]">
                  <Bus size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Admission Details Found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">You have not submitted an admission form yet. Please submit the form to see your details here.</p>
                <button onClick={handleEditAdmission} className="btn-primary">
                  Fill Admission Form
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentProfile;
