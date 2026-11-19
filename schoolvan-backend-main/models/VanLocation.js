import mongoose from "mongoose";

const vanLocationSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    accuracy: {
      type: Number,
    },
    speed: {
      type: Number,
    },
    heading: {
      type: Number,
    },
    tripStatus: {
      type: String,
      enum: ["NOT_STARTED", "ACTIVE", "STOPPED"],
      default: "NOT_STARTED",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    startedAt: {
      type: Date,
    },
    stoppedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const VanLocation = mongoose.model("VanLocation", vanLocationSchema);

export default VanLocation;
