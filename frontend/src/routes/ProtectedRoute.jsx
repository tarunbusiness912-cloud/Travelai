import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-sm font-bold text-slate-500">Checking credentials...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect non-logged users to register/login while saving current history pathway
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}