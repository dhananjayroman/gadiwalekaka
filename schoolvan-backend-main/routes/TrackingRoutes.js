import express from "express";
import { isCarOwner } from "../middleware/auth.js";
import { startTrip, stopTrip, updateLocation, getCurrentLocation } from "../controllers/trackingController.js";

const router = express.Router();

// Owner-only endpoints
router.post("/start", isCarOwner, startTrip);
router.post("/stop", isCarOwner, stopTrip);
router.put("/location", isCarOwner, updateLocation);

// Public endpoint (can be accessed by parents later)
router.get("/current", getCurrentLocation);

export default router;
