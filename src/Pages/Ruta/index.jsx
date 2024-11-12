/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '../../Context/UserContexto'
import ErrorBoundary from '../../Components/ErrorBoundary'

// Lazy load components for better performance
const Home = React.lazy(() => import('../Home'))
const Login = React.lazy(() => import('../Login'))
const Register = React.lazy(() => import('../Register'))
const Reservation = React.lazy(() => import('../Reservation'))
const Resume = React.lazy(() => import('../Resume')) // Import Resume

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={<Home />}
          errorElement={<ErrorBoundary />}
        />
        <Route 
          path="/login" 
          element={<Login />}
          errorElement={<ErrorBoundary />}
        />
        <Route 
          path="/register" 
          element={<Register />}
          errorElement={<ErrorBoundary />}
        />

        {/* Protected routes */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
          errorElement={<ErrorBoundary />}
        />

        {/* Catch all route - redirect to error page */}
        <Route 
          path="*" 
          element={<ErrorBoundary />} 
        />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
