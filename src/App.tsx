import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PublicWebsite from './PublicWebsite';
import { AuthProvider, useAuth } from './dashboard/AuthContext';

const DashboardLayout = lazy(() => import('./dashboard/DashboardLayout'));
const Login = lazy(() => import('./dashboard/Login'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const RoomsManagement = lazy(() => import('./dashboard/RoomsManagement'));
const BookingsManagement = lazy(() => import('./dashboard/BookingsManagement'));
const ContentManagement = lazy(() => import('./dashboard/ContentManagement'));
const Settings = lazy(() => import('./dashboard/Settings'));
const GalleryManagement = lazy(() => import('./dashboard/GalleryManagement'));
const AttractionsManagement = lazy(() => import('./dashboard/AttractionsManagement'));
const ChatbotManagement = lazy(() => import('./dashboard/ChatbotManagement'));
const Placeholder = lazy(() => import('./dashboard/Placeholder'));

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
        <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center text-[#D4AF37] font-serif tracking-widest text-sm">LOADING SECURE ENVIRONMENT...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
