import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CardValidation from './pages/CardValidation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Appointments from './pages/Appointments';
import Finances from './pages/Finances';
import Plans from './pages/Plans';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import Team from './pages/Team';
import Terms from './pages/Terms';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/validate-card" element={
              <ProtectedRoute>
                <CardValidation />
              </ProtectedRoute>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="sales" element={<Sales />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="finances" element={<Finances />} />
              <Route path="plans" element={<Plans />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="settings" element={<Settings />} />
              <Route path="team" element={<Team />} />
            </Route>
          </Routes>
          <CookieConsent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
