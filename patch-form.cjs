const fs = require('fs');

let file = fs.readFileSync('src/PublicWebsite.tsx', 'utf8');

const dynamicForm = `
              <BookingForm rooms={publicData?.rooms} />
`;

const bookingFormComp = `
function BookingForm({ rooms }: { rooms: any[] }) {
  const [formData, setFormData] = useState({ guestName: '', guestPhone: '', guestEmail: '', roomId: '', checkIn: '', checkOut: '', guests: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const room = rooms?.find(r => r.id === formData.roomId);
      const booking = { ...formData, roomName: room ? room.name : 'Unknown Room', totalPrice: room ? room.price : 0, status: 'pending' };
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      setSuccess(true);
    } catch(err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (success) {
    return <div className="p-8 bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl text-center">Thank you! Your booking request has been received. We will contact you shortly.</div>;
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
        <input required value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} type="text" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="Enter your full name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
        <input required value={formData.guestPhone} onChange={e => setFormData({...formData, guestPhone: e.target.value})} type="tel" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="+91 XXXXX XXXXX" />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
        <input value={formData.guestEmail} onChange={e => setFormData({...formData, guestEmail: e.target.value})} type="email" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="Enter your email address" />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Room Type</label>
        <select required value={formData.roomId} onChange={e => setFormData({...formData, roomId: e.target.value})} className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all [&>option]:bg-[#0E0E10]">
          <option value="">Select a room...</option>
          {rooms?.map(r => (
            <option key={r.id} value={r.id}>{r.name} - ₹{r.price}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Guests</label>
        <input required value={formData.guests} onChange={e => setFormData({...formData, guests: Number(e.target.value)})} type="number" min="1" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Check In</label>
        <input required value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} type="date" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Check Out</label>
        <input required value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} type="date" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={submitting} className="w-full py-4 bg-primary text-black rounded-lg font-medium tracking-[0.2em] uppercase hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50">
          {submitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
}
`;

const regex = /<form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit=\{\(e\) => e.preventDefault\(\)\}>[\s\S]*?<\/form>/;

if (file.match(regex)) {
  file = file.replace(regex, dynamicForm);
  
  // Inject BookingForm component right before export default function PublicWebsite
  file = file.replace('export default function PublicWebsite', bookingFormComp + '\nexport default function PublicWebsite');
  
  // Need to ensure useState is imported if not already. It is usually.
  fs.writeFileSync('src/PublicWebsite.tsx', file);
  console.log('Patched form!');
} else {
  console.log('Could not find form');
}
