import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Bus, MapPin, Clock, User, Navigation, ShieldCheck, Wifi, WifiOff, RefreshCcw, LocateFixed, Expand } from "lucide-react";
import { io } from "socket.io-client";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

// Custom SVGs encoded for Google Maps icons
const vanIconSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <circle cx="12" cy="12" r="12" fill="#F4B400" stroke="white" stroke-width="2"/>
    <path d="M8 8v6M15 8v6M4 14h15.6M18 19h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 8.8 19.1 8 18 8H6a2 2 0 0 0-2 2v10h3" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7" cy="19" r="2" fill="none" stroke="black" stroke-width="2"/>
    <path d="M9 19h5" fill="none" stroke="black" stroke-width="2"/>
    <circle cx="16" cy="19" r="2" fill="none" stroke="black" stroke-width="2"/>
  </svg>`
)}`;

const schoolIconSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
    <circle cx="12" cy="12" r="12" fill="white" stroke="#374151" stroke-width="2"/>
    <path d="M14 20v-4a2 2 0 1 0-4 0v4m8-10 4 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8l4-2m10-5v17m-14-11 8-4 8 4m-14-1v17M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
)}`;

const TrackVan = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Load from .env
  });

  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [activeMarker, setActiveMarker] = useState("van"); // 'van' or null

  const [vanLocation, setVanLocation] = useState({
    lat: 18.1645,
    lng: 73.8440,
    speed: "0 km/h",
    lastUpdated: "Fetching...",
    tripStatus: "NOT_STARTED"
  });

  const isFollowingVanRef = useRef(true);
  const [isFollowingVan, setIsFollowingVan] = useState(true);
  
  const mapRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Schools data
  const schools = [
    { name: "Raja RaghunathRao Vidhalaya", lat: 18.1633, lng: 73.8433 },
    { name: "Jijamata English Medium School", lat: 18.1666, lng: 73.8500 },
    { name: "Vidhyapratishthan English Medium School", lat: 18.1700, lng: 73.8550 },
  ];

  const fetchCurrentLocation = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/tracking/current`);
      const data = await res.json();
      if (data.success && data.tracking) {
        setVanLocation({
          lat: data.tracking.latitude,
          lng: data.tracking.longitude,
          speed: data.tracking.speed ? `${data.tracking.speed} km/h` : "0 km/h",
          lastUpdated: new Date(data.tracking.lastUpdated).toLocaleTimeString(),
          tripStatus: data.tracking.tripStatus === "ACTIVE" ? "Trip Active" : (data.tracking.tripStatus === "STOPPED" ? "Trip Completed" : "Not Started")
        });
      }
    } catch (err) {
      console.error("Error fetching initial location:", err);
    }
  };

  useEffect(() => {
    // 1. Fetch initial location
    fetchCurrentLocation();

    // 2. Setup Socket.IO
    const socket = io(backendUrl, {
      withCredentials: true
    });

    socket.on("connect", () => {
      setConnectionStatus("Live Connected");
      fetchCurrentLocation();
    });

    socket.on("disconnect", () => {
      setConnectionStatus("Disconnected");
    });

    socket.on("connect_error", () => {
      setConnectionStatus("Reconnecting...");
    });

    // Handle incoming location updates
    socket.on("van:location:update", (trackingData) => {
      const newLat = trackingData.latitude;
      const newLng = trackingData.longitude;
      
      setVanLocation({
        lat: newLat,
        lng: newLng,
        speed: trackingData.speed ? `${trackingData.speed} km/h` : "0 km/h",
        lastUpdated: new Date(trackingData.lastUpdated).toLocaleTimeString(),
        tripStatus: trackingData.tripStatus === "ACTIVE" ? "Trip Active" : (trackingData.tripStatus === "STOPPED" ? "Trip Completed" : "Not Started")
      });

      // Pan to new location ONLY if following van
      if (isFollowingVanRef.current && mapRef.current) {
        mapRef.current.panTo({ lat: newLat, lng: newLng });
      }
    });

    socket.on("trip:started", (trackingData) => {
      setVanLocation(prev => ({
        ...prev,
        tripStatus: "Trip Active",
        lastUpdated: new Date(trackingData.lastUpdated).toLocaleTimeString()
      }));
    });

    socket.on("trip:stopped", (trackingData) => {
      setVanLocation(prev => ({
        ...prev,
        tripStatus: "Trip Completed",
        lastUpdated: new Date(trackingData.lastUpdated).toLocaleTimeString()
      }));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("van:location:update");
      socket.off("trip:started");
      socket.off("trip:stopped");
      socket.disconnect();
    };
  }, [backendUrl]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    // Set initial center explicitly
    map.setCenter({ lat: vanLocation.lat, lng: vanLocation.lng });
  }, [vanLocation.lat, vanLocation.lng]);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleLocateVan = () => {
    setIsFollowingVan(true);
    isFollowingVanRef.current = true;
    if (mapRef.current) {
      mapRef.current.panTo({ lat: vanLocation.lat, lng: vanLocation.lng });
      mapRef.current.setZoom(16);
    }
  };

  const handleViewFullRoute = () => {
    setIsFollowingVan(false);
    isFollowingVanRef.current = false;
    if (mapRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: vanLocation.lat, lng: vanLocation.lng });
      schools.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));
      mapRef.current.fitBounds(bounds);
    }
  };

  const handleDragStart = () => {
    setIsFollowingVan(false);
    isFollowingVanRef.current = false;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen relative font-sans">
      <Helmet>
        <title>Track Van | SchoolVan</title>
        <meta name="description" content="Track the real-time location of your school van." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Track Your <span className="text-[#F4B400]">School Van</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">See the current location of your school van in real-time.</p>
            </div>
            
            <div className="flex flex-col gap-2 md:items-end">
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-gray-200 shadow-sm ${vanLocation.tripStatus === 'Trip Active' ? 'text-green-600' : 'text-gray-600'}`}>
                {vanLocation.tripStatus === 'Trip Active' && (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
                <span className="font-bold uppercase tracking-wider text-sm">{vanLocation.tripStatus}</span>
              </div>
              
              {/* Connection Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-xs font-semibold self-end md:self-auto">
                {connectionStatus === 'Live Connected' ? <Wifi size={14} className="text-blue-500" /> :
                 connectionStatus === 'Reconnecting...' ? <RefreshCcw size={14} className="text-yellow-500 animate-spin" /> :
                 <WifiOff size={14} className="text-red-500" />}
                <span className={connectionStatus === 'Live Connected' ? 'text-blue-600' : connectionStatus === 'Reconnecting...' ? 'text-yellow-600' : 'text-red-600'}>
                  {connectionStatus}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white p-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative"
          >
            {/* Custom Map Overlay Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <button 
                onClick={handleLocateVan}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold shadow-md transition-all ${isFollowingVan ? 'bg-[#F4B400] text-black ring-2 ring-[#F4B400] ring-offset-2' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <LocateFixed size={18} />
                {isFollowingVan ? "Following Van" : "Locate Van"}
              </button>
              
              <button 
                onClick={handleViewFullRoute}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-white text-gray-700 shadow-md hover:bg-gray-50 transition-all"
              >
                <Expand size={18} />
                View Full Route
              </button>
            </div>

            <div className="h-[55vh] md:h-[65vh] lg:h-[700px] w-full rounded-2xl overflow-hidden relative z-0">
              {!isLoaded ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-500">
                  <RefreshCcw size={32} className="animate-spin mb-4 text-[#F4B400]" />
                  <p className="font-semibold">Loading map...</p>
                </div>
              ) : loadError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-red-500 font-semibold">
                  Unable to load Google Maps. Please try again.
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{ lat: vanLocation.lat, lng: vanLocation.lng }}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onDragStart={handleDragStart}
                  options={{
                    mapTypeId: "roadmap",
                    gestureHandling: "greedy",
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                    zoomControl: true,
                  }}
                >
                  {/* Van Marker */}
                  <Marker
                    position={{ lat: vanLocation.lat, lng: vanLocation.lng }}
                    icon={{
                      url: vanIconSvg,
                      scaledSize: new window.google.maps.Size(40, 40),
                      anchor: new window.google.maps.Point(20, 20),
                    }}
                    onClick={() => setActiveMarker("van")}
                  />

                  {/* School Markers */}
                  {schools.map((school, idx) => (
                    <Marker
                      key={idx}
                      position={{ lat: school.lat, lng: school.lng }}
                      icon={{
                        url: schoolIconSvg,
                        scaledSize: new window.google.maps.Size(32, 32),
                        anchor: new window.google.maps.Point(16, 16),
                      }}
                      onClick={() => setActiveMarker(`school-${idx}`)}
                    />
                  ))}

                  {/* Van InfoWindow */}
                  {activeMarker === "van" && (
                    <InfoWindow
                      position={{ lat: vanLocation.lat, lng: vanLocation.lng }}
                      onCloseClick={() => setActiveMarker(null)}
                      options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
                    >
                      <div className="p-1 min-w-[200px]">
                        <h3 className="font-bold text-gray-900 text-lg border-b pb-2 mb-2">School Van</h3>
                        <div className="space-y-1.5 text-sm">
                          <p className="flex items-center gap-2"><User size={14} className="text-gray-500"/> <span className="font-semibold text-gray-800">Eknath Roman</span></p>
                          <p className="flex items-center gap-2"><Bus size={14} className="text-gray-500"/> <span className="font-semibold text-gray-800">MH-12-NX-8984</span></p>
                          <p className="flex items-center gap-2"><Navigation size={14} className="text-gray-500"/> <span className="text-gray-700">{vanLocation.speed}</span></p>
                          <p className="flex items-center gap-2 text-xs text-gray-400 mt-2"><Clock size={12}/> Updated {vanLocation.lastUpdated}</p>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                  
                  {/* Schools InfoWindow */}
                  {schools.map((school, idx) => (
                    activeMarker === `school-${idx}` && (
                      <InfoWindow
                        key={`info-${idx}`}
                        position={{ lat: school.lat, lng: school.lng }}
                        onCloseClick={() => setActiveMarker(null)}
                        options={{ pixelOffset: new window.google.maps.Size(0, -16) }}
                      >
                        <div className="font-bold text-gray-800 p-1">{school.name}</div>
                      </InfoWindow>
                    )
                  ))}
                </GoogleMap>
              )}
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="space-y-6">
            
            {/* Van Information Card */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bus className="text-[#F4B400]" size={24} /> Van Information
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-600"><Bus size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vehicle Number</p>
                    <p className="text-lg font-bold text-gray-900">MH-12-NX-8984</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-600"><User size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Driver Name</p>
                    <p className="text-lg font-bold text-gray-900">Eknath Roman</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${vanLocation.tripStatus === 'Trip Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trip Status</p>
                    <p className={`text-lg font-bold ${vanLocation.tripStatus === 'Trip Active' ? 'text-green-600' : 'text-gray-900'}`}>{vanLocation.tripStatus}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gray-50 rounded-xl text-gray-600"><Clock size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Updated</p>
                    <p className="text-base font-semibold text-gray-700">{vanLocation.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service Information Card */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F4B400]/20 rounded-full blur-2xl z-0" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#F4B400]">
                  <MapPin size={24} /> Service Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-gray-400 font-medium">Partner Schools</span>
                    <span className="font-bold text-lg">3 Schools</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-gray-400 font-medium">Morning Pickup</span>
                    <span className="font-bold">7:00 AM - 8:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-gray-400 font-medium">School Drop</span>
                    <span className="font-bold">8:00 AM - 8:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-gray-400 font-medium">Afternoon Pickup</span>
                    <span className="font-bold">1:00 PM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Home Drop</span>
                    <span className="font-bold">2:00 PM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackVan;
