import { useState } from 'react';
import { motion } from 'motion/react';
import { useApi } from './useApi';
import { Check, X, Search, Printer, Trash2 } from 'lucide-react';

export default function BookingsManagement() {
  const { data: bookings, loading, mutate } = useApi('bookings', []);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleUpdateStatus = async (id: string, status: string) => {
    await mutate('PUT', { status }, `/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this booking?')) {
      await mutate('DELETE', null, `/${id}`);
    }
  };

  if (loading && !bookings) return <div className="text-white/50 h-[50vh] flex items-center justify-center">Loading bookings...</div>;

  const filtered = bookings.filter((b: any) => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search && !b.guestName?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif tracking-wide">Bookings</h1>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search guests..." 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-[#D4AF37] focus:outline-none text-sm"
          />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-[#D4AF37] focus:outline-none appearance-none">
          <option value="all">All Status</option>
          <option value="pending_payment">Pending Payment</option>
          <option value="completed">Paid / Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-[#0E0E10] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">Guest</th>
              <th className="px-6 py-4 font-medium">Room</th>
              <th className="px-6 py-4 font-medium">Dates</th>
              <th className="px-6 py-4 font-medium">Payment Info</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((b: any) => (
              <tr key={b.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-sm">{b.guestName}</div>
                  <div className="text-xs text-white/50">{b.guestPhone}</div>
                </td>
                <td className="px-6 py-4 text-sm">{b.roomName}</td>
                <td className="px-6 py-4 text-sm">
                  <div>{new Date(b.checkIn).toLocaleDateString()} - </div>
                  <div className="text-white/50">{new Date(b.checkOut).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 text-sm text-white/70">
                  {b.paymentId ? (
                    <>
                      <div className="font-mono text-xs">{b.paymentId}</div>
                      <div className="text-xs text-[#D4AF37]">{b.paymentMethod || 'Razorpay UPI'}</div>
                      <div className="text-xs font-medium">₹{(b.totalPrice || 0).toLocaleString()}</div>
                    </>
                  ) : (
                    <span className="text-white/30 text-xs">Unpaid</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider ${b.status === 'pending_payment' ? 'bg-yellow-500/10 text-yellow-500' : b.status === 'failed' ? 'bg-red-500/10 text-red-500' : b.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}`}>
                    {b.status === 'pending_payment' ? 'Pending' : b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  {b.status === 'pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(b.id, 'approved')} className="p-2 text-green-400 hover:bg-green-400/10 rounded"><Check className="w-4 h-4"/></button>
                      <button onClick={() => handleUpdateStatus(b.id, 'rejected')} className="p-2 text-red-400 hover:bg-red-400/10 rounded"><X className="w-4 h-4"/></button>
                    </>
                  )}
                  {b.status === 'approved' && (
                    <button onClick={() => handleUpdateStatus(b.id, 'completed')} className="text-xs text-[#D4AF37] hover:underline px-2">Check-Out</button>
                  )}
                  <button className="p-2 text-white/40 hover:text-white rounded" onClick={() => window.print()}><Printer className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(b.id)} className="p-2 text-white/40 hover:text-red-400 rounded"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
