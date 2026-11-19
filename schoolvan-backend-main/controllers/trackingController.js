import VanLocation from "../models/VanLocation.js";

// Helper to get or create the single van document
const getVanDocument = async () => {
  let van = await VanLocation.findOne();
  if (!van) {
    // Initialize with a default location (e.g. Pune coords) or just 0,0 if not started
    van = new VanLocation({
      latitude: 18.5204,
      longitude: 73.8567,
      tripStatus: "NOT_STARTED",
    });
    await van.save();
  }
  return van;
};

export const startTrip = async (req, res) => {
  try {
    const van = await getVanDocument();
    van.tripStatus = "ACTIVE";
    van.startedAt = new Date();
    van.lastUpdated = new Date();
    await van.save();
    
    const io = req.app.get("io");
    if (io) {
      io.emit("trip:started", van);
    }
    
    return res.status(200).json({ success: true, message: "Trip started", tracking: van });
  } catch (error) {
    console.error("Start Trip Error:", error);
    return res.status(500).json({ success: false, error: "Server error starting trip" });
  }
};

export const stopTrip = async (req, res) => {
  try {
    const van = await getVanDocument();
    van.tripStatus = "STOPPED";
    van.stoppedAt = new Date();
    van.lastUpdated = new Date();
    await van.save();
    
    const io = req.app.get("io");
    if (io) {
      io.emit("trip:stopped", van);
    }
    
    return res.status(200).json({ success: true, message: "Trip stopped", tracking: van });
  } catch (error) {
    console.error("Stop Trip Error:", error);
    return res.status(500).json({ success: false, error: "Server error stopping trip" });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude, accuracy, speed, heading } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, error: "Latitude and longitude are required" });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({ success: false, error: "Invalid latitude" });
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      return res.status(400).json({ success: false, error: "Invalid longitude" });
    }

    const van = await getVanDocument();
    van.latitude = lat;
    van.longitude = lng;
    van.accuracy = accuracy !== undefined && accuracy !== null ? Number(accuracy) : van.accuracy;
    van.speed = speed !== undefined && speed !== null && !isNaN(Number(speed)) ? Number(speed) : van.speed;
    van.heading = heading !== undefined && heading !== null && !isNaN(Number(heading)) ? Number(heading) : van.heading;
    van.lastUpdated = new Date();

    await van.save();

    const io = req.app.get("io");
    if (io) {
      io.emit("van:location:update", van);
    }

    return res.status(200).json({ success: true, message: "Location updated", tracking: van });
  } catch (error) {
    console.error("Update Location Error:", error);
    return res.status(500).json({ success: false, error: "Server error updating location" });
  }
};

export const getCurrentLocation = async (req, res) => {
  try {
    const van = await getVanDocument();
    return res.status(200).json({ success: true, tracking: van });
  } catch (error) {
    console.error("Get Location Error:", error);
    return res.status(500).json({ success: false, error: "Server error retrieving location" });
  }
};
