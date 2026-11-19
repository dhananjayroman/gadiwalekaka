import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Users, MapPin, Phone, School, Clock, CalendarDays } from "lucide-react";
import Swal from "sweetalert2";

const ViewAdmission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmissions = async () => {
      const token = localStorage.getItem("carOwnerToken");

      if (!token) {
        Swal.fire("Access Denied", "Only car owners can view this page.", "warning");
        return navigate("/carowner-login");
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admissions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized or fetch failed");
        }

        const data = await res.json();
        setAdmissions(data);
      } catch (err) {
        console.error("Error fetching admissions:", err);
        Swal.fire("Session Expired", "Please log in again.", "error");
        navigate("/carowner-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmissions();
  }, [navigate]);

  const deleteAdmission = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("carOwnerToken");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admissions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        setAdmissions((prev) => prev.filter((a) => a._id !== id));
        Swal.fire('Deleted!', 'The admission record has been deleted.', 'success');
      } else {
        Swal.fire("Error", "Failed to delete admission.", "error");
      }
    } catch (error) {
      console.error("Delete failed", error);
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Student <span className="text-[#F4B400]">Admissions</span>
            </h2>
            <p className="text-gray-600 mt-1">Manage your active school van riders</p>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <Users className="text-[#F4B400]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Admissions</p>
              <p className="text-xl font-bold text-gray-900">{admissions.length}</p>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <svg className="animate-spin h-10 w-10 text-[#F4B400]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : admissions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center"
          >
            <div className="bg-gray-50 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6">
              <CalendarDays className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Admissions Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">There are currently no student admissions registered for your school van service.</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white text-sm uppercase tracking-wider">
                    <th className="p-5 font-semibold">Student Info</th>
                    <th className="p-5 font-semibold">Contact</th>
                    <th className="p-5 font-semibold">School Details</th>
                    <th className="p-5 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {admissions.map((adm, idx) => (
                    <motion.tr 
                      key={adm._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <div className="font-bold text-gray-900 mb-1">{adm.studentName}</div>
                        <div className="text-sm text-gray-500">Class: <span className="font-medium text-gray-700">{adm.studentClass}</span></div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                          <Phone size={14} className="text-gray-400" /> {adm.studentContact}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-500 max-w-[200px]">
                          <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" /> 
                          <span className="truncate">{adm.studentAddress}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1 line-clamp-1">
                          <School size={14} className="text-gray-400" /> {adm.schoolName}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-100 w-fit px-2 py-1 rounded-md">
                          <Clock size={12} className="text-gray-500" /> {adm.schoolTime}
                        </div>
                      </td>
                      <td className="p-5 align-middle text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteAdmission(adm._id)}
                          className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors inline-flex justify-center items-center group"
                          title="Delete Record"
                        >
                          <Trash2 size={18} className="group-hover:animate-pulse" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewAdmission;

