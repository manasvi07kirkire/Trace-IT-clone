"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Only check authentication if we're not on the login page
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          
          // Skip authentication check for login page
          if (currentPath === '/admin/login' || currentPath.startsWith('/admin/login')) {
            setIsLoading(false);
            return;
          }
          
          const adminAuth = localStorage.getItem("traceit_admin_auth");
          
          if (!adminAuth || adminAuth !== "true") {
            console.log('Authentication failed, redirecting to login');
            // Use window.location for immediate redirect
            window.location.href = "/admin/login";
            return;
          }
          
          console.log('Authentication successful');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        // Redirect to login on any error
        if (typeof window !== 'undefined') {
          window.location.href = "/admin/login";
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Check authentication immediately
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
