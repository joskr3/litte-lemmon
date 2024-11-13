/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '../../Context/UserContexto'

// Lazy load components for better performance
const Home = React.lazy(() => import('../Home'))
const Login = React.lazy(() => import('../Login'))
const Register = React.lazy(() => import('../Register'))
const Reservation = React.lazy(() => import('../Reservation'))
const Resume = React.lazy(() => import('../Resume')) // Import Resume
const Payment = React.lazy(() => import('../Payment')) // Import Payment
const MisPedidos = React.lazy( () => import( '../MisPedidos' ) ) // Import MisPedidos
const Error = React.lazy(() => import('../../Components/ErrorBoundary')) // Import MisPedidos

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
        <Route path="/" element={<Home />} errorElement={<Error />} />
        <Route path="/login" element={<Login />} errorElement={<Error />} />
        <Route
          path="/register"
          element={<Register />}
          errorElement={<Error />}
        />

        {/* Protected routes */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
          errorElement={<Error />}
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
          errorElement={<Error />}
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
          errorElement={<Error />}
        />
        <Route
          path="/mis-pedidos"
          element={
            <ProtectedRoute>
              <MisPedidos />
            </ProtectedRoute>
          }
          errorElement={<Error />}
        />
        {/* Catch all route - redirect to error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
