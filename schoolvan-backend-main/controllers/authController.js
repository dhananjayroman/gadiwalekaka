import bcrypt from "bcryptjs";
import User from "../models/User.js";
import LoginLog from "../models/LoginLog.js";

export const registerStudent = async (req, res) => {
  const { fullName, parentPhone, email, password } = req.body;

  // 1) Validate Student Full Name
  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ ok: false, error: "Please enter student full name." });
  }

  // 2) Validate Phone Number (must be exactly 10 digits; greater than 10 not accepted)
  const phoneStr = parentPhone ? String(parentPhone).trim() : "";
  if (!phoneStr) {
    return res.status(400).json({ ok: false, error: "Phone number is required." });
  }
  if (phoneStr.length > 10) {
    return res.status(400).json({
      ok: false,
      error: "Phone number cannot be greater than 10 digits (11 or more digits not accepted)."
    });
  }
  if (!/^\d{10}$/.test(phoneStr)) {
    return res.status(400).json({
      ok: false,
      error: "Phone number must be exactly 10 digits."
    });
  }

  // 3) Validate Email Address ending strictly @gmail.com
  const emailStr = email ? String(email).trim().toLowerCase() : "";
  if (!emailStr) {
    return res.status(400).json({ ok: false, error: "Email address is required." });
  }
  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailStr)) {
    return res.status(400).json({
      ok: false,
      error: "Email address must end strictly with @gmail.com"
    });
  }

  // 4) Validate Password: max length 10, strong with numbers and symbols
  if (!password) {
    return res.status(400).json({ ok: false, error: "Password is required." });
  }
  if (password.length > 10) {
    return res.status(400).json({
      ok: false,
      error: "Password maximum length is 10 characters."
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      ok: false,
      error: "Password must be at least 6 characters (maximum 10 characters)."
    });
  }
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=~/\\\[\]]/.test(password);
  if (!hasNumber || !hasSymbol) {
    return res.status(400).json({
      ok: false,
      error: "Password must be strong: use numbers and symbols (maximum 10 characters)."
    });
  }

  try {
    const existingUser = await User.findOne({ email: emailStr });
    if (existingUser) {
      return res.status(400).json({ ok: false, error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName.trim(),
      parentPhone: phoneStr,
      email: emailStr,
      password: hashedPassword,
    });

    await newUser.save();
    
    req.login(newUser, async (err) => {
      if (err) {
        console.error("Auto-login error:", err);
        return res.status(500).json({ ok: false, error: "Registration succeeded but auto-login failed" });
      }
      
      try {
        await LoginLog.create({ email: emailStr });
      } catch (logErr) {
        console.error("Failed to log auto-login:", logErr);
      }
      
      return res.status(200).json({ ok: true, message: "Registration and login successful" });
    });
  } catch (err) {
    console.error("Registration error:", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ ok: false, error: messages.join(", ") });
    }
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { email } = req.user;

    await LoginLog.create({ email });

    res.status(200).json({ ok: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ ok: false, error: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ ok: true, message: "Logged out successfully" });
    });
  });
};
