import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    parentPhone: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [phoneExceededWarning, setPhoneExceededWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    if (name === "fullName") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Student full name is required.";
      } else if (trimmed.length < 2) {
        error = "Student full name must be at least 2 characters.";
      }
    }

    if (name === "parentPhone") {
      const raw = value.trim();
      if (!raw) {
        error = "Phone number is required.";
      } else if (raw.length > 10) {
        error = "Phone number cannot be greater than 10 digits (11 or more digits not accepted).";
      } else if (raw.length < 10) {
        error = `Phone number must be exactly 10 digits (${raw.length}/10 entered).`;
      } else if (!/^\d{10}$/.test(raw)) {
        error = "Phone number must contain only 10 numbers.";
      }
    }

    if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Email address is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(trimmed)) {
        error = "Email address must end strictly with @gmail.com";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length > 10) {
        error = "Password maximum length is 10 characters.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters (maximum 10).";
      } else {
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=~/\\\[\]]/.test(value);
        if (!hasNumber || !hasSymbol) {
          error = "Strong password required: must include numbers and symbols.";
        }
      }
    }

    return error;
  };

  // Handle Input Changes with strict constraints
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "parentPhone") {
      // Check if user tried to type/paste more than 10 digits or 11th number
      const digitsOnly = value.replace(/\D/g, "");
      if (value.length > 10 || digitsOnly.length > 10) {
        setPhoneExceededWarning("Greater than 10 numbers detected! 11 or more digits are not accepted.");
      } else {
        setPhoneExceededWarning("");
      }

      // Restrict to max 10 digits in state
      const truncated = digitsOnly.slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: truncated }));

      if (touched.parentPhone) {
        const err = validateField("parentPhone", truncated);
        setErrors((prev) => ({ ...prev, parentPhone: err }));
      }
      return;
    }

    if (name === "password") {
      // Restrict password to max 10 characters
      const truncatedPass = value.slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: truncatedPass }));

      if (touched.password) {
        const err = validateField("password", truncatedPass);
        setErrors((prev) => ({ ...prev, password: err }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Validate entire form before submit
  const validateAll = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      parentPhone: validateField("parentPhone", formData.parentPhone),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password)
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      parentPhone: true,
      email: true,
      password: true
    });

    return !Object.values(newErrors).some((err) => Boolean(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      const firstError = 
        validateField("fullName", formData.fullName) ||
        validateField("parentPhone", formData.parentPhone) ||
        validateField("email", formData.email) ||
        validateField("password", formData.password) ||
        "Please resolve form errors before proceeding.";

      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: firstError,
        confirmButtonColor: "#F4B400"
      });
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          parentPhone: formData.parentPhone.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        }),
      });

      const data = await res.json();

      if (data.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("studentEmail", formData.email.trim().toLowerCase());
        localStorage.setItem("studentName", formData.fullName.trim());
        Swal.fire({
          icon: "success",
          title: "Registered Successfully!",
          text: "Your student account has been created and you are now logged in.",
          confirmButtonColor: "#F4B400"
        });
        setFormData({
          fullName: "",
          parentPhone: "",
          email: "",
          password: ""
        });
        setErrors({});
        setTouched({});
        navigate("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.error || "Please check your information and try again.",
          confirmButtonColor: "#F4B400"
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not connect to registration server. Please try again later.",
        confirmButtonColor: "#F4B400"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <Helmet>
        <title>Register | SchoolVan</title>
        <meta name="description" content="Register as a new student to use SchoolVan transport services." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 glass-card p-10 card-lift">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-sm"
          >
            <UserPlus className="h-8 w-8 text-[#F4B400]" />
          </motion.div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register as a new student with safe school van service
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            
            {/* 1) Student Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Student Full Name <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                touched.fullName && errors.fullName
                  ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                  : touched.fullName && !errors.fullName && formData.fullName.trim()
                  ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                  : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
              }`}>
                <User className={`h-5 w-5 shrink-0 ${touched.fullName && errors.fullName ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Student full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
                />
                {touched.fullName && !errors.fullName && formData.fullName.trim() && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                )}
              </div>
              {touched.fullName && errors.fullName && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle size={13} className="shrink-0" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* 2) Phone Number (Accept only 10 numbers; > 10 not accepted) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs font-semibold ${
                  formData.parentPhone.length === 10 ? "text-green-600" : "text-gray-400"
                }`}>
                  {formData.parentPhone.length}/10 digits
                </span>
              </div>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                (touched.parentPhone && errors.parentPhone) || phoneExceededWarning
                  ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                  : touched.parentPhone && !errors.parentPhone && formData.parentPhone.length === 10
                  ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                  : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
              }`}>
                <Phone className={`h-5 w-5 shrink-0 ${(touched.parentPhone && errors.parentPhone) || phoneExceededWarning ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type="tel"
                  name="parentPhone"
                  maxLength={10}
                  placeholder="Enter 10-digit Phone Number"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium tracking-wide"
                />
                {formData.parentPhone.length === 10 && !errors.parentPhone && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                )}
              </div>
              
              {/* Error messages for phone: > 10 numbers or not 10 numbers */}
              {phoneExceededWarning && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1 pl-1 bg-red-50 p-1.5 rounded-md border border-red-200">
                  <AlertCircle size={13} className="shrink-0" /> {phoneExceededWarning}
                </p>
              )}
              {touched.parentPhone && errors.parentPhone && !phoneExceededWarning && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle size={13} className="shrink-0" /> {errors.parentPhone}
                </p>
              )}
            </div>

            {/* 3) Email Address (Ending strictly @gmail.com) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                touched.email && errors.email
                  ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                  : touched.email && !errors.email && formData.email
                  ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                  : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
              }`}>
                <Mail className={`h-5 w-5 shrink-0 ${touched.email && errors.email ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type="email"
                  name="email"
                  placeholder="student@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
                />
                {touched.email && !errors.email && formData.email && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                )}
              </div>
              <div className="flex justify-between items-center mt-1 pl-1">
                {touched.email && errors.email ? (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle size={13} className="shrink-0" /> {errors.email}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500">
                    Must strictly end with <span className="font-bold text-[#F4B400]">@gmail.com</span>
                  </p>
                )}
              </div>
            </div>

            {/* 4) Password (Max 10 chars, strong with numbers & symbols) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs font-semibold ${
                  formData.password.length === 10 ? "text-amber-600" : "text-gray-400"
                }`}>
                  {formData.password.length}/10 max
                </span>
              </div>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                touched.password && errors.password
                  ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                  : touched.password && !errors.password && formData.password
                  ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                  : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
              }`}>
                <Lock className={`h-5 w-5 shrink-0 ${touched.password && errors.password ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  maxLength={10}
                  placeholder="Strong password (max 10 chars)"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors shrink-0"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {touched.password && errors.password && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle size={13} className="shrink-0" /> {errors.password}
                </p>
              )}
            </div>

          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-gray-900 bg-[#F4B400] hover:bg-yellow-500 focus:outline-none transition-all cursor-pointer ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#F4B400] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
