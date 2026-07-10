import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicWebsite from './PublicWebsite';
import DashboardLayout from './dashboard/DashboardLayout';
import Login from './dashboard/Login';
import Dashboard from './dashboard/Dashboard';
import RoomsManagement from './dashboard/RoomsManagement';
import Placeholder from './dashboard/Placeholder';
import { AuthProvider, useAuth } from './dashboard/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/control-room/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<PublicWebsite />} />
          
          {/* Hidden Dashboard */}
          <Route path="/control-room/login" element={<Login />} />
          <Route 
            path="/control-room/*" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<RoomsManagement />} />
            <Route path="bookings" element={<Placeholder title="Bookings" />} />
            <Route path="gallery" element={<Placeholder title="Gallery" />} />
            <Route path="amenities" element={<Placeholder title="Amenities" />} />
            <Route path="content" element={<Placeholder title="Website Content" />} />
            <Route path="attractions" element={<Placeholder title="Attractions" />} />
            <Route path="chatbot" element={<Placeholder title="AI Chatbot" />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
          
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
