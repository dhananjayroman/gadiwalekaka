import express from "express";
import passport from "passport";
import { carOwnerLogin } from "../controllers/carOwnerController.js";

const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local-carowner", (err, user, info) => {
      if (err) return res.status(500).json({ ok: false, error: "Server error" });
      if (!user) return res.status(401).json({ ok: false, error: info.message || "Authentication failed" });
      req.logIn(user, (err) => {
        if (err) return res.status(500).json({ ok: false, error: "Error establishing session" });
        next();
      });
    })(req, res, next);
  },
  carOwnerLogin
);




export default router;







