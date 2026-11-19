import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../../UI/AnimatedSection";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/home");
    }
  }, [navigate]);

  // Validation function for email and password
  const validateField = (name, value) => {
    let error = "";

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

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateField("email", val) }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value.slice(0, 10); // Enforce max 10 chars
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateField("password", val) }));
    }
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const validateAll = () => {
    const emailErr = validateField("email", email);
    const passErr = validateField("password", password);

    setErrors({ email: emailErr, password: passErr });
    setTouched({ email: true, password: true });

    return !emailErr && !passErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      const firstError =
        validateField("email", email) ||
        validateField("password", password) ||
        "Please resolve errors before signing in.";

      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: firstError,
        confirmButtonColor: "#F4B400"
      });
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (data.ok) {
        // Login successful
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("studentEmail", email.trim().toLowerCase());
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          confirmButtonColor: "#F4B400"
        });
        navigate("/profile");
      } else {
        // Login failed
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: data.error || "Please check email or password",
          confirmButtonColor: "#F4B400"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Try again later.",
        confirmButtonColor: "#F4B400"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <Helmet>
        <title>Login | SchoolVan</title>
        <meta name="description" content="Sign in to your SchoolVan student account." />
      </Helmet>
      <AnimatedSection animationType="scale" className="max-w-md w-full">
        <div className="space-y-8 glass-card p-10 w-full card-lift">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-sm"
            >
              <LogIn className="h-8 w-8 text-[#F4B400]" />
            </motion.div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your student account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              
              {/* Email Address (Strictly @gmail.com) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                  touched.email && errors.email
                    ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                    : touched.email && !errors.email && email
                    ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                    : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
                }`}>
                  <Mail className={`h-5 w-5 shrink-0 ${touched.email && errors.email ? "text-red-400" : "text-gray-400"}`} />
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur("email", email)}
                    autoComplete="username"
                    required
                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
                  />
                  {touched.email && !errors.email && email && (
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
              
              {/* Password (Max 10 chars, strong with numbers & symbols) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs font-semibold ${
                    password.length === 10 ? "text-amber-600" : "text-gray-400"
                  }`}>
                    {password.length}/10 max
                  </span>
                </div>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/50 transition-all duration-300 ${
                  touched.password && errors.password
                    ? "border-red-400 bg-red-50/30 focus-within:ring-2 focus-within:ring-red-200 focus-within:border-red-500"
                    : touched.password && !errors.password && password
                    ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500"
                    : "border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#F4B400]/50 focus-within:border-[#F4B400]"
                }`}>
                  <Lock className={`h-5 w-5 shrink-0 ${touched.password && errors.password ? "text-red-400" : "text-gray-400"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    maxLength={10}
                    placeholder="Enter Password (max 10 chars)"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password", password)}
                    autoComplete="current-password"
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
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-[#F4B400] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Login;
