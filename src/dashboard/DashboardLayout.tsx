import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarDays, 
  Image as ImageIcon, 
  Coffee, 
  MapPin, 
  MessageSquareText, 
  Settings, 
  LogOut,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/control-room/login');
  };

  const navItems = [
    { name: 'Overview', path: '/control-room', icon: LayoutDashboard, exact: true },
    { name: 'Rooms', path: '/control-room/rooms', icon: BedDouble },
    { name: 'Bookings', path: '/control-room/bookings', icon: CalendarDays },
    { name: 'Gallery', path: '/control-room/gallery', icon: ImageIcon },
    { name: 'Amenities', path: '/control-room/amenities', icon: Coffee },
    { name: 'Content', path: '/control-room/content', icon: Globe },
    { name: 'Attractions', path: '/control-room/attractions', icon: MapPin },
    { name: 'AI Chatbot', path: '/control-room/chatbot', icon: MessageSquareText },
    { name: 'Settings', path: '/control-room/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-72 bg-[#0E0E10] border-r border-white/5 flex flex-col z-20 relative"
      >
        <div className="p-8 border-b border-white/5">
          <h2 className="font-serif text-xl tracking-widest uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Control Room</h2>
          <p className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mt-2 opacity-80">Hotel Jaipur Rajwada</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'text-black font-medium shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#b8932c]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-black' : 'group-hover:text-[#D4AF37]'}`} />
                  <span className="relative z-10 text-sm tracking-wide">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all text-sm tracking-wide"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="p-10 relative z-10 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
