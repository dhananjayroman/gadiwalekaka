import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Phone, School, Clock, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdmissionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    studentClass: "",
    studentAddress: "",
    studentContact: "",
    schoolName: "",
    schoolTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    if (!isValid) {
      Swal.fire("Warning", "Please fill in all required fields.", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", 
      });

      if (response.ok) {
        // Save to localStorage for Student Profile
        const admissionPayloadForProfile = {
          schoolName: formData.schoolName,
          studentClass: formData.studentClass,
          parentPhone: formData.studentContact,
          pickupAddress: formData.studentAddress,
          dropAddress: formData.studentAddress, 
          pickupTiming: formData.schoolTime.split(" to ")[0] || formData.schoolTime,
          dropTiming: formData.schoolTime.split(" to ")[1] || "",
        };
        localStorage.setItem("studentAdmission", JSON.stringify(admissionPayloadForProfile));

        Swal.fire("Success!", "Form submitted successfully!", "success");
        setFormData({
          studentName: "",
          studentClass: "",
          studentAddress: "",
          studentContact: "",
          schoolName: "",
          schoolTime: "",
        });
        navigate("/profile");
      } else {
        Swal.fire("Error", "Submission failed.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Error submitting the form.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-yellow-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-[#F4B400] text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm border border-yellow-200">Admissions Open</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            School Van <span className="text-gradient">Admission Form</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Register your child for our safe and reliable school van service. We will get back to you with the schedule and details shortly.
          </p>
        </motion.div>

        <div className="glass-card overflow-hidden">
          <div className="lg:grid lg:grid-cols-5">
            {/* Image Side */}
            <div className="lg:col-span-2 hidden lg:block relative bg-gray-900">
              <img 
                src="images/three-student.jpg" 
                alt="Students" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                <div className="bg-[#F4B400]/20 backdrop-blur-md p-3 rounded-2xl inline-block mb-4 border border-[#F4B400]/30">
                  <School className="text-[#F4B400]" size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-3">Safe Journeys</h3>
                <p className="text-gray-300 leading-relaxed">We ensure every ride is secure, supervised, and fun for the kids. Your trust is our priority.</p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-3 p-8 md:p-14 bg-white/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Student Name */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User size={18} className="text-[#F4B400]"/> Student Name
                    </label>
                    <input 
                      type="text" 
                      name="studentName" 
                      value={formData.studentName} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Student Class */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <School size={18} className="text-[#F4B400]"/> Class / Grade
                    </label>
                    <input 
                      type="text" 
                      name="studentClass" 
                      value={formData.studentClass} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="e.g. Grade 5"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin size={18} className="text-[#F4B400]"/> Address
                  </label>
                  <textarea 
                    name="studentAddress" 
                    rows="3" 
                    value={formData.studentAddress} 
                    onChange={handleChange} 
                    required 
                    className="input-field resize-none"
                    placeholder="Full residential address"
                  />
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone size={18} className="text-[#F4B400]"/> Contact Number
                  </label>
                  <input 
                    type="tel" 
                    name="studentContact" 
                    value={formData.studentContact} 
                    onChange={handleChange} 
                    required 
                    className="input-field"
                    placeholder="Parent/Guardian number"
                  />
                </div>

                {/* School Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <School size={18} className="text-[#F4B400]"/> School Name
                    </label>
                    <select 
                      name="schoolName" 
                      value={formData.schoolName} 
                      onChange={handleChange} 
                      required
                      className="input-field appearance-none cursor-pointer"
                    >
                      <option value="">-- Select School --</option>
                      <option value="Raja RaghunathRao Vidyalay Bhor">Raja RaghunathRao Vidhalaya Bhor</option>
                      <option value="Vidhyapratishthan Vidyalay Bhor">Jijamata English Medium School Bhor</option>
                      <option value="Jijamata Vidyalay Bhor">Vidhyapratishthan English Medium School Bhor</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock size={18} className="text-[#F4B400]"/> School Time
                    </label>
                    <input 
                      type="text" 
                      name="schoolTime" 
                      value={formData.schoolTime} 
                      onChange={handleChange} 
                      required 
                      className="input-field"
                      placeholder="e.g. 9:00 AM to 4:00 PM"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button 
                  type="submit" 
                  disabled={isLoading}
                  className={`btn-primary w-full flex items-center justify-center gap-2 mt-4 text-lg py-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <CheckCircle size={24} /> Submit Application
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionPage;

