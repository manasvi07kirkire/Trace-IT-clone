import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PricingManager from './pages/PricingManager';
import ContactManager from './pages/ContactManager';
import BlogManager from './pages/BlogManager';
import TestimonialsManager from './pages/TestimonialsManager';
import CommunityImpactManager from './pages/CommunityImpactManager';

const AdminApp = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route - No Layout Wrapper */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Routes - With Layout Wrapper */}
        <Route path="/admin" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        
        <Route path="/admin/pricing" element={
          <AdminLayout>
            <PricingManager />
          </AdminLayout>
        } />
        
        <Route path="/admin/contacts" element={
          <AdminLayout>
            <ContactManager />
          </AdminLayout>
        } />
        
        <Route path="/admin/blogs" element={
          <AdminLayout>
            <BlogManager />
          </AdminLayout>
        } />
        
        <Route path="/admin/testimonials" element={
          <AdminLayout>
            <TestimonialsManager />
          </AdminLayout>
        } />
        
        <Route path="/admin/community" element={
          <AdminLayout>
            <CommunityImpactManager />
          </AdminLayout>
        } />
        
        {/* Catch all other admin routes */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default AdminApp;
