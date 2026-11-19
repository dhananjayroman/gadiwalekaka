import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/pages/common/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CarOwnerProtectedRoute from "./components/CarOwnerProtectedRoute";
import { LoadingSpinner } from "./components/UI/LoadingSpinner";

// Lazy Loaded Components (Organized by Feature Domain)
const Login = lazy(() => import("./components/pages/auth/Login"));
const Registration = lazy(() => import("./components/pages/auth/Registration"));
const CarOwnerLogin = lazy(() => import("./components/pages/auth/CarOwnerLogin"));
const Home = lazy(() => import("./components/pages/general/Home"));
const About = lazy(() => import("./components/pages/general/About"));
const School = lazy(() => import("./components/pages/general/School"));
const Vehicle = lazy(() => import("./components/pages/general/Vehicle"));
const Contact = lazy(() => import("./components/pages/general/Contact"));
const ViewAdmission = lazy(() => import("./components/pages/admissions/ViewAdmissions"));
const Rules = lazy(() => import("./components/pages/general/Rules"));
const StudentProfile = lazy(() => import("./components/pages/student/StudentProfile"));
const TrackVan = lazy(() => import("./components/pages/tracking/TrackVan"));
const DriverTracking = lazy(() => import("./components/pages/tracking/DriverTracking"));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner size={60} /></div>}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // Public Routes
      { path: "login", element: <SuspenseWrapper><Login /></SuspenseWrapper> },
      { path: "register", element: <SuspenseWrapper><Registration /></SuspenseWrapper> },
      { path: "carowner-login", element: <SuspenseWrapper><CarOwnerLogin /></SuspenseWrapper> },

      // Protected Routes (Students)
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><StudentProfile /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "track-van",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><TrackVan /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><Home /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><About /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "school",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><School /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "vehicle",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><Vehicle /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><Contact /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: "rules",
        element: (
          <ProtectedRoute>
            <SuspenseWrapper><Rules /></SuspenseWrapper>
          </ProtectedRoute>
        ),
      },

      // Protected Routes (Car Owners)
      {
        path: "admissions",
        element: (
          <CarOwnerProtectedRoute>
            <SuspenseWrapper><ViewAdmission /></SuspenseWrapper>
          </CarOwnerProtectedRoute>
        ),
      },
      {
        path: "driver-tracking",
        element: (
          <CarOwnerProtectedRoute>
            <SuspenseWrapper><DriverTracking /></SuspenseWrapper>
          </CarOwnerProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;







