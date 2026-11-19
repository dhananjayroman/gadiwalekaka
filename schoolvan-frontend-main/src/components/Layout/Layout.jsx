// Layout.jsx
// src/components/Layout/Layout.js
import React from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import VideoBackground from "../pages/common/VideoBackground";
import PageTransition from "../UI/PageTransition";

const Layout = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const excludeRoutes = ["/driver-tracking", "/track-van", "/profile", "/login", "/register", "/carowner-login", "/home","/about","/school","/vehicle","/contact","/admissions","/rules"];
  const showVideo = !excludeRoutes.includes(pathname);

  return (
    <>
      <Navbar />

      {showVideo && <VideoBackground />}

      <main className={`pt-20 min-h-screen ${showVideo ? 'bg-transparent' : 'bg-gray-50'}`}>
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            {outlet}
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default Layout;

