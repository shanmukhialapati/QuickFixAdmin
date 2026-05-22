// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceProviders from "./pages/ServiceProviders";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Categories from "./pages/Categories";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";

function App() {
  // 1. ఇక్కడ 'false' కి మార్చాను బ్రో. దీనివల్ల ఫస్ట్ రన్ అవ్వగానే లాగిన్ పేజీ మాత్రమే ఓపెన్ అవుతుంది.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AdminLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Default Route inside layout */}
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

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;