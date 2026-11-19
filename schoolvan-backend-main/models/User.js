import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Student full name is required"],
      trim: true,
    },
    parentPhone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Phone number must be exactly 10 digits (11 or more digits not accepted)",
      },
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(v);
        },
        message: "Email address must end strictly with @gmail.com",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "userregisters");

export default User;
