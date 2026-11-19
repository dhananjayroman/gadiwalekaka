import express from "express";
import { studentLogin } from "../controllers/authController.js";

import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !String(email).trim()) {
      return res.status(400).json({ ok: false, error: "Email address is required." });
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(String(email).trim())) {
      return res.status(400).json({
        ok: false,
        error: "Email address must end strictly with @gmail.com"
      });
    }
    if (!password) {
      return res.status(400).json({ ok: false, error: "Password is required." });
    }
    if (password.length > 10) {
      return res.status(400).json({
        ok: false,
        error: "Password maximum length is 10 characters."
      });
    }
    next();
  },
  (req, res, next) => {
    passport.authenticate("local-student", (err, user, info) => {
      if (err) {
        return res.status(500).json({ ok: false, error: "Server error during authentication" });
      }
      if (!user) {
        return res.status(401).json({ ok: false, error: info.message || "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ ok: false, error: "Error establishing session" });
        }
        next();
      });
    })(req, res, next);
  },
  studentLogin
);

export default router;










