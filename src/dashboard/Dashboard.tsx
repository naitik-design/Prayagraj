import { motion } from 'motion/react';
import { Users, CalendarDays, TrendingUp, BedDouble, ArrowUpRight } from 'lucide-react';
import { useApi } from './useApi';

export default function Dashboard() {
  const { data, loading } = useApi('analytics');

  if (loading || !data) {
    return <div className="text-white/50 flex justify-center items-center h-[50vh]">Loading analytics...</div>;
  }

  const stats = [
    { name: 'Total Bookings', value: data.completedBookings + data.pendingBookings, icon: CalendarDays },
    { name: 'Available Rooms', value: data.availableRooms, icon: BedDouble },
    { name: 'Occupied Rooms', value: data.occupiedRooms, icon: Users },
    { name: 'Total Revenue', value: `₹${data.revenue.toLocaleString()}`, icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-serif tracking-wide">Overview</h1>
        <p className="text-white/50 text-sm mt-1">Live hotel metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="bg-[#0E0E10] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37]">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white/60 text-sm tracking-wide mb-1">{stat.name}</h3>
              <p className="text-3xl font-serif">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#0E0E10] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif tracking-wide">Recent Bookings</h2>
          </div>
          
          <div className="space-y-4">
            {data.recentGuests.length === 0 ? (
              <p className="text-white/40 text-sm">No recent bookings.</p>
            ) : data.recentGuests.map((booking: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold">
                    {booking.guestName?.[0] || 'G'}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{booking.guestName}</h4>
                    <p className="text-white/50 text-xs">{booking.roomName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase ${booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Chat */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#0E0E10] border border-white/5 rounded-2xl p-6"
        >
          <h2 className="text-xl font-serif tracking-wide mb-6">Recent AI Chats</h2>
          <div className="space-y-4">
            {data.recentConversations.length === 0 ? (
              <p className="text-white/40 text-sm">No recent conversations.</p>
            ) : data.recentConversations.map((conv: any, i: number) => {
               const lastMsg = conv.messages[conv.messages.length - 1];
               return (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-white/70 truncate">
                  <span className="text-[#D4AF37]">User:</span> {conv.messages.find((m:any) => m.sender === 'user')?.text || '...'} <br/>
                  <span className="text-white/40">Bot:</span> {lastMsg?.text}
                </div>
               );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
