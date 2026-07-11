import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicWebsite from './PublicWebsite';
import DashboardLayout from './dashboard/DashboardLayout';
import Login from './dashboard/Login';
import Dashboard from './dashboard/Dashboard';
import RoomsManagement from './dashboard/RoomsManagement';
import BookingsManagement from "./dashboard/BookingsManagement";
import ContentManagement from "./dashboard/ContentManagement";
import Settings from "./dashboard/Settings";
import GalleryManagement from "./dashboard/GalleryManagement";
import AttractionsManagement from "./dashboard/AttractionsManagement";
import ChatbotManagement from "./dashboard/ChatbotManagement";
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
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="amenities" element={<Placeholder title="Amenities" />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="attractions" element={<AttractionsManagement />} />
            <Route path="chatbot" element={<ChatbotManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
