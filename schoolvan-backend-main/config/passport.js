import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import CarOwner from "../models/CarOwner.js";

const LocalStrategy = passportLocal.Strategy;

const configurePassport = (passport) => {
  // Strategy for Students
  passport.use(
    "local-student",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Email and Password not registered. Please register first." });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          // Attach role for serialization
          const authUser = { id: user._id, role: 'student', email: user.email };
          return done(null, authUser);
        } catch (err) {
          console.error("Passport error:", err);
          return done(err);
        }
      }
    )
  );

  // Strategy for Car Owners
  passport.use(
    "local-carowner",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const owner = await CarOwner.findOne({ email });

          if (!owner) {
            return done(null, false, { message: "Email not found" });
          }

          const isMatch = await bcrypt.compare(password, owner.password);
          
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          // Attach role for serialization
          const authUser = { id: owner._id, role: 'carowner', email: owner.email };
          return done(null, authUser);
        } catch (err) {
          console.error("Passport error:", err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    // We serialize both the ID and the role so we know which collection to query on deserialize
    done(null, { id: user.id, role: user.role });
  });

  passport.deserializeUser(async (sessionUser, done) => {
    try {
      if (sessionUser.role === 'student') {
        const user = await User.findById(sessionUser.id);
        if (user) {
          return done(null, { id: user._id, role: 'student', email: user.email });
        }
      } else if (sessionUser.role === 'carowner') {
        const owner = await CarOwner.findById(sessionUser.id);
        if (owner) {
          return done(null, { id: owner._id, role: 'carowner', email: owner.email });
        }
      }
      done(null, false);
    } catch (err) {
      done(err, null);
    }
  });
};

export default configurePassport;
