import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Navigation, ShieldAlert, ShieldCheck, Play, Square, Activity, Clock, Wifi, WifiOff } from "lucide-react";

const DriverTracking = () => {
  const [tripStatus, setTripStatus] = useState("NOT_STARTED"); // NOT_STARTED, ACTIVE, STOPPED
  const [permissionStatus, setPermissionStatus] = useState("Checking Permission...");
  const [syncStatus, setSyncStatus] = useState("Not synced");
  
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    speed: null,
    heading: null,
    timestamp: null
  });

  const watchIdRef = useRef(null);
  const lastSyncTimeRef = useRef(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Clean up watcher on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleStartTrip = async () => {
    if (!navigator.geolocation) {
      setPermissionStatus("Geolocation is not supported by your browser.");
      return;
    }

    if (tripStatus === "ACTIVE") return;

    try {
      const res = await fetch(`${backendUrl}/api/tracking/start`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setPermissionStatus("Failed to start trip on server.");
        return;
      }
    } catch (error) {
      console.error("Server Error:", error);
      setPermissionStatus("Server connection failed.");
      return;
    }

    setTripStatus("ACTIVE");
    setPermissionStatus("Requesting Location...");
    setSyncStatus("Waiting for GPS...");

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        setPermissionStatus("Permission Granted");
        
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const acc = Math.round(position.coords.accuracy);
        const spd = position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0;
        const hdg = position.coords.heading !== null && position.coords.heading !== undefined ? Math.round(position.coords.heading) : null;
        const ts = new Date(position.timestamp).toLocaleTimeString();

        setLocationData({
          latitude: lat,
          longitude: lng,
          accuracy: acc,
          speed: spd,
          heading: hdg,
          timestamp: ts
        });

        // Throttle updates to backend (every 5 seconds)
        const now = Date.now();
        if (now - lastSyncTimeRef.current >= 5000) {
          lastSyncTimeRef.current = now;
          try {
            const res = await fetch(`${backendUrl}/api/tracking/location`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                latitude: lat,
                longitude: lng,
                accuracy: acc,
                speed: spd,
                heading: hdg,
                timestamp: position.timestamp
              })
            });
            const data = await res.json();
            if (data.success) {
              setSyncStatus("Location synced");
            } else {
              setSyncStatus("Unable to sync location");
            }
          } catch (error) {
             setSyncStatus("Unable to sync location");
          }
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setPermissionStatus("Permission Denied: Location permission is required.");
            break;
          case error.POSITION_UNAVAILABLE:
            setPermissionStatus("Location Unavailable: Please check your device's GPS signal.");
            break;
          case error.TIMEOUT:
            setPermissionStatus("Timeout: The request to get user location timed out.");
            break;
          default:
            setPermissionStatus("An unknown GPS error occurred.");
            break;
        }
        setTripStatus("STOPPED");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );
  };

  const handleStopTrip = async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    
    try {
      await fetch(`${backendUrl}/api/tracking/stop`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to stop trip on server", error);
    }

    setTripStatus("STOPPED");
    setPermissionStatus("Tracking Stopped.");
    setSyncStatus("Not synced");
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans">
      <Helmet>
        <title>Driver Tracking | SchoolVan</title>
        <meta name="description" content="Share live school van location." />
      </Helmet>

      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            School Van <span className="text-[#F4B400]">Location Sharing</span>
          </h1>
          <p className="text-gray-600 mt-2">Start your trip to share the van's live location with parents.</p>
        </motion.div>

        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <div className={`p-4 rounded-full mb-4 ${tripStatus === 'ACTIVE' ? 'bg-green-100 text-green-600' : tripStatus === 'STOPPED' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
              {tripStatus === 'ACTIVE' ? (
                <div className="relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <Activity size={32} className="relative" />
                </div>
              ) : (
                <MapPin size={32} />
              )}
            </div>
            
            <h2 className={`text-2xl font-black uppercase tracking-wider ${tripStatus === 'ACTIVE' ? 'text-green-600' : tripStatus === 'STOPPED' ? 'text-red-600' : 'text-gray-600'}`}>
              {tripStatus.replace("_", " ")}
            </h2>
            
            <div className="flex items-center gap-2 mt-2 text-sm">
              {permissionStatus.includes("Granted") ? (
                <ShieldCheck size={16} className="text-green-500" />
              ) : (
                <ShieldAlert size={16} className="text-yellow-500" />
              )}
              <span className="text-gray-600 font-medium">{permissionStatus}</span>
            </div>
            
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500">
              {syncStatus.includes("synced") ? <Wifi size={12} className="text-green-500" /> : <WifiOff size={12} className="text-gray-400" />}
              <span>{syncStatus}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Speed</span>
              <p className="text-2xl font-black text-gray-900 mt-1">{locationData.speed !== null ? `${locationData.speed} km/h` : "--"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Accuracy</span>
              <p className="text-2xl font-black text-gray-900 mt-1">{locationData.accuracy !== null ? `±${locationData.accuracy}m` : "--"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center col-span-2">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Last Recorded</span>
              <p className="text-base font-bold text-gray-700 mt-1">{locationData.timestamp || "--"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {tripStatus !== "ACTIVE" ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartTrip}
                className="w-full py-4 bg-[#F4B400] hover:bg-yellow-500 text-gray-950 font-black text-lg rounded-2xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Play size={20} fill="currentColor" /> Start Trip
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStopTrip}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Square size={20} fill="currentColor" /> Stop Trip
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverTracking;
