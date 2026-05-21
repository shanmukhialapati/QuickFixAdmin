// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";


import Login from "./Pages/Login";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import ServiceProviders from "./pages/ServiceProviders";
import Customers from "./Pages/Customers";
import Bookings from "./Pages/Bookings";
import Categories from "./Pages/Categories";
import Payments from "./Pages/Payments";
import Reviews from "./Pages/Reviews";
import Settings from "./Pages/Settings";

function App() {
  // UI చెక్ చేసుకోవడానికి ప్రస్తుతానికి true లో ఉంచాను
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="service-providers" element={<ServiceProviders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="categories" element={<Categories />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;