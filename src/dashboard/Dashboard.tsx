import { motion } from 'motion/react';
import { Users, CalendarDays, TrendingUp, BedDouble, ArrowUpRight, Image as ImageIcon, MessageSquareText } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Bookings', value: '1,248', trend: '+12.5%', icon: CalendarDays },
    { name: 'Active Guests', value: '42', trend: '+5.2%', icon: Users },
    { name: 'Available Rooms', value: '18', trend: '-2.1%', icon: BedDouble },
    { name: 'Revenue (MTD)', value: '₹4.2L', trend: '+18.4%', icon: TrendingUp },
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
        <p className="text-white/50 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
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
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white/60 text-sm tracking-wide mb-1">{stat.name}</h3>
              <p className="text-3xl font-serif">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 bg-[#0E0E10] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif tracking-wide">Recent Requests</h2>
            <button className="text-[#D4AF37] text-sm hover:text-[#E8C76A] flex items-center gap-1 transition-colors">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#b8932c] flex items-center justify-center text-black font-serif font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Guest Name {i+1}</h4>
                    <p className="text-white/50 text-xs">Deluxe Room • 3 Nights</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                    Pending
                  </span>
                  <p className="text-white/40 text-[10px] mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#0E0E10] border border-white/5 rounded-2xl p-6"
        >
          <h2 className="text-xl font-serif tracking-wide mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { name: 'Update Pricing', icon: TrendingUp },
              { name: 'Block Room', icon: BedDouble },
              { name: 'Edit Hero Image', icon: ImageIcon },
              { name: 'Bot Settings', icon: MessageSquareText },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all border border-transparent hover:border-[#D4AF37]/30 text-sm text-left group">
                <action.icon className="w-5 h-5 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                <span>{action.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
