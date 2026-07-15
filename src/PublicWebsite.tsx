import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Car,
  Wind,
  BedDouble,
  Utensils,
  Coffee,
  Users,
  TreePine,
  Star,
  Menu,
  X,
  Sparkles,
  Map,
  MessageSquare,
  ArrowLeft,
  CreditCard,
  Check,
  AlertCircle
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Hero3D from "./components/Hero3D";
import Chatbot from "./components/Chatbot";
import About3D from "./components/About3D";
import LofiPlayer from "./components/LofiPlayer";
import { usePublicData } from "./PublicWebsiteData";

// --- PREMIUM SCROLL & INTERACTIVE ANIMATION COMPONENTS ---

function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 30;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none bg-primary/20";
      
      const size = Math.random() * 3 + 1.5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.35 + 0.1}`;
      
      container.appendChild(particle);
      particles.push(particle);

      // Float animation
      gsap.to(particle, {
        x: () => (Math.random() - 0.5) * 150,
        y: () => (Math.random() - 0.5) * 150,
        opacity: () => Math.random() * 0.4 + 0.05,
        duration: Math.random() * 12 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50" />;
}

function CinematicHeading({ children, className = "", id = "" }: { children: string, className?: string, id?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(chars, 
      { opacity: 0, y: 35, filter: "blur(10px)" },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 1.2, 
        stagger: 0.02, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  }, [children]);

  // Split string into words, then split words into characters
  const words = children.split(' ');
  
  return (
    <h3 ref={containerRef} className={className} id={id}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span key={cIdx} className="char inline-block origin-bottom">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h3>
  );
}

function TiltImage({ src, alt, className = "", children }: { src: string, alt: string, className?: string, children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const img = imgRef.current;
    const reflection = reflectionRef.current;
    if (!el || !img) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateY = ((x - xc) / xc) * 8;
    const rotateX = -((y - yc) / yc) * 8;
    
    gsap.to(img, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.06,
      duration: 0.5,
      ease: "power2.out",
    });

    if (reflection) {
      const rx = (x / rect.width) * 100;
      const ry = (y / rect.height) * 100;
      gsap.to(reflection, {
        background: `radial-gradient(circle at ${rx}% ${ry}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    const img = imgRef.current;
    const reflection = reflectionRef.current;
    if (!el || !img) return;

    gsap.to(img, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    if (reflection) {
      gsap.to(reflection, {
        background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        duration: 0.5,
      });
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(el,
      { opacity: 0, scale: 0.92, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        }
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-pointer select-none border border-white/10 ${className}`}
      style={{ perspective: "1000px" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none origin-center"
      />
      {/* Premium Glass reflection overlay */}
      <div
        ref={reflectionRef}
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-60"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />
      {children}
    </div>
  );
}

function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    gsap.to(el.querySelector(".magnetic-child"), {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    gsap.to(el.querySelector(".magnetic-child"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <div className="magnetic-child w-full h-full">
        {children}
      </div>
    </div>
  );
}


function BookingForm({ rooms, whatsappNumber }: { rooms: any[], whatsappNumber?: string }) {
  const [formData, setFormData] = useState({ guestName: '', guestPhone: '', guestEmail: '', roomId: '', checkIn: '', checkOut: '', guests: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const calculateTotals = () => {
    const room = rooms?.find(r => r.id === formData.roomId);
    if (!room) return { subtotal: 0, taxes: 0, total: 0, days: 0 };
    
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    let days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    if (isNaN(days) || days <= 0) days = 1;
    
    const subtotal = room.price * days;
    const taxes = subtotal * 0.18; // 18% GST
    return { subtotal, taxes, total: subtotal + taxes, days, room };
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomId || !formData.checkIn || !formData.checkOut || !formData.guestName || !formData.guestPhone) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    setErrorMsg('');
    setCheckoutData(calculateTotals());
  };

  const handlePayAtHotel = async () => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingDetails: formData, paymentMethod: 'pay_at_hotel' })
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to create booking");
      }

      setPaymentSuccess(data.booking);
    } catch(err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during booking.");
    }
    setSubmitting(false);
  };

  const handlePayment = async () => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingDetails: formData })
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      if (data.isMock) {
        // Mock payment flow
        const verifyRes = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            razorpay_order_id: data.orderId,
            razorpay_payment_id: "mock_payment_" + Date.now(),
            razorpay_signature: "mock_sig",
            bookingId: data.bookingId,
            isMock: true
          })
        });
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setPaymentSuccess(verifyData.booking);
        } else {
          throw new Error("Payment verification failed");
        }
      } else {
        // Real Razorpay integration
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: "Hotel Prayagraj",
          description: "Room Booking Payment",
          order_id: data.orderId,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...response,
                  bookingId: data.bookingId,
                  isMock: false
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setPaymentSuccess(verifyData.booking);
              } else {
                setErrorMsg("Payment verification failed. If money was deducted, please contact support.");
              }
            } catch (err) {
              setErrorMsg("Error verifying payment.");
            }
          },
          prefill: {
            name: formData.guestName,
            email: formData.guestEmail,
            contact: formData.guestPhone,
          },
          theme: {
            color: "#D4AF37",
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          setErrorMsg(response.error.description || "Payment failed");
        });
        rzp.open();
      }
    } catch(err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during payment.");
    }
    setSubmitting(false);
  };

  const getWhatsAppLink = () => {
    const room = rooms?.find(r => r.id === formData.roomId);
    const roomName = room ? room.name : '';
    let text = `Hello Hotel Prayagraj! I would like to make a booking inquiry.`;
    if (formData.guestName) text += `\nName: ${formData.guestName}`;
    if (formData.guestPhone) text += `\nPhone: ${formData.guestPhone}`;
    if (formData.guestEmail) text += `\nEmail: ${formData.guestEmail}`;
    if (roomName) text += `\nRoom Type: ${roomName}`;
    if (formData.guests) text += `\nGuests: ${formData.guests}`;
    if (formData.checkIn) text += `\nCheck-In: ${formData.checkIn}`;
    if (formData.checkOut) text += `\nCheck-Out: ${formData.checkOut}`;
    
    const cleanPhone = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, "") : "917597117839";
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  if (paymentSuccess) {
    return (
      <div className="p-10 bg-black/60 border border-primary/30 rounded-2xl text-center backdrop-blur-md">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-light text-white mb-2">Booking Confirmed!</h3>
        <p className="text-white/60 mb-6">Your payment was successful and your room is reserved.</p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left mb-6 max-w-sm mx-auto">
          <p className="text-sm text-white/50 mb-1">Booking ID</p>
          <p className="font-mono text-primary mb-4">{paymentSuccess.id}</p>
          <p className="text-sm text-white/50 mb-1">Room</p>
          <p className="text-white mb-4">{paymentSuccess.roomName}</p>
          <p className="text-sm text-white/50 mb-1">Dates</p>
          <p className="text-white">{paymentSuccess.checkIn} to {paymentSuccess.checkOut}</p>
        </div>
        <p className="text-sm text-white/40">We've sent a confirmation to your email and WhatsApp.</p>
      </div>
    );
  }

  if (checkoutData) {
    return (
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <button onClick={() => setCheckoutData(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="text-2xl font-light text-white">Checkout</h3>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{errorMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-sm font-medium tracking-widest text-primary uppercase">Guest Details</h4>
            <div className="space-y-2 text-white/80">
              <p><span className="text-white/40 inline-block w-24">Name:</span> {formData.guestName}</p>
              <p><span className="text-white/40 inline-block w-24">Phone:</span> {formData.guestPhone}</p>
              <p><span className="text-white/40 inline-block w-24">Email:</span> {formData.guestEmail || 'N/A'}</p>
              <p><span className="text-white/40 inline-block w-24">Guests:</span> {formData.guests}</p>
            </div>
            
            <h4 className="text-sm font-medium tracking-widest text-primary uppercase pt-4 border-t border-white/5">Stay Details</h4>
            <div className="space-y-2 text-white/80">
              <p><span className="text-white/40 inline-block w-24">Room:</span> {checkoutData.room.name}</p>
              <p><span className="text-white/40 inline-block w-24">Check-in:</span> {formData.checkIn}</p>
              <p><span className="text-white/40 inline-block w-24">Check-out:</span> {formData.checkOut}</p>
              <p><span className="text-white/40 inline-block w-24">Duration:</span> {checkoutData.days} Night(s)</p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-fit">
            <h4 className="text-sm font-medium tracking-widest text-white uppercase mb-6">Payment Summary</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Room Charges ({checkoutData.days}x ₹{checkoutData.room.price})</span>
                <span>₹{checkoutData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/60 pb-4 border-b border-white/10">
                <span>Taxes (18% GST)</span>
                <span>₹{checkoutData.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white text-lg font-medium pt-2">
                <span>Grand Total</span>
                <span className="text-primary">₹{checkoutData.total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handlePayAtHotel} 
              disabled={submitting} 
              className="w-full mt-8 py-4 bg-primary text-black rounded-lg font-medium tracking-[0.1em] hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              {submitting ? 'Processing...' : 'Pay at Hotel'}
            </button>
            <p className="text-xs text-white/30 text-center mt-4 text-yellow-500/80">Online payment will be enabled soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCheckout}>
      {errorMsg && (
        <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{errorMsg}</p>
        </div>
      )}
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
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <button type="submit" disabled={submitting} className="w-full py-4 bg-primary text-black rounded-lg font-medium tracking-[0.2em] uppercase hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50">
          Proceed to Checkout
        </button>
        <a 
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-emerald-600 text-white rounded-lg font-medium tracking-[0.15em] uppercase hover:bg-emerald-500 transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
        >
          <MessageSquare className="w-5 h-5" />
          Book via WhatsApp
        </a>
      </div>
    </form>
  );
}

export default function PublicWebsite() {
  const publicData = usePublicData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      setIsScrolled(e.scroll > 50);
    });

    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Custom luxury cursor using high-performance GSAP quickTo tracking
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    const glow = document.querySelector(".custom-cursor-glow") as HTMLElement;

    let onMouseMove = (e: MouseEvent) => {};

    if (cursor && glow) {
      const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power2.out" });
      const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power2.out" });
      const xToGlow = gsap.quickTo(glow, "x", { duration: 0.25, ease: "power2.out" });
      const yToGlow = gsap.quickTo(glow, "y", { duration: 0.25, ease: "power2.out" });

      onMouseMove = (e: MouseEvent) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToGlow(e.clientX);
        yToGlow(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);
    }

    const handleMouseEnter = () => {
      if (glow) {
        gsap.to(glow, { 
          scale: 1.6, 
          backgroundColor: "rgba(212,175,55,0.15)", 
          borderColor: "rgba(212,175,55,0.8)", 
          duration: 0.3 
        });
      }
    };
    const handleMouseLeave = () => {
      if (glow) {
        gsap.to(glow, { 
          scale: 1.0, 
          backgroundColor: "transparent", 
          borderColor: "rgba(212,175,55,0.4)", 
          duration: 0.3 
        });
      }
    };

    const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .tilt-container');
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Hero intro animations with GSAP
    const heroStars = document.querySelector(".hero-stars");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroButtons = document.querySelectorAll(".hero-btn");

    const tl = gsap.timeline();
    if (heroStars) {
      tl.fromTo(heroStars, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
    }
    if (heroTitle) {
      tl.fromTo(heroTitle, 
        { opacity: 0, y: 40, filter: "blur(10px)" }, 
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }, 
        "-=0.5"
      );
    }
    if (heroSubtitle) {
      tl.fromTo(heroSubtitle, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 
        "-=0.8"
      );
    }
    if (heroButtons.length > 0) {
      tl.fromTo(heroButtons, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
        "-=0.6"
      );
    }

    // Paragraph smooth stagger
    const paragraphs = document.querySelectorAll(".paragraph-animate");
    paragraphs.forEach(p => {
      gsap.fromTo(p,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            once: true,
          }
        }
      );
    });

    // Staggered fade, scale, and rotate for room cards
    const roomCards = document.querySelectorAll(".room-card");
    if (roomCards.length > 0) {
      gsap.fromTo(roomCards,
        { opacity: 0, y: 60, rotation: 2, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#rooms",
            start: "top 75%",
            once: true,
          }
        }
      );
    }

    // Staggered fade upward and slight rotation for amenities cards
    const amenityCards = document.querySelectorAll(".amenity-card");
    if (amenityCards.length > 0) {
      gsap.fromTo(amenityCards,
        { opacity: 0, y: 60, rotation: 2, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#amenities",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // Staggered fade upward for contact details and cards
    const contactCards = document.querySelectorAll(".contact-card");
    if (contactCards.length > 0) {
      gsap.fromTo(contactCards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 85%",
            once: true,
          }
        }
      );
    }

    return () => {
      gsap.ticker.remove(updatePhysics);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [publicData]);

  if (!publicData) return <div className="h-screen bg-black flex items-center justify-center text-[#D4AF37]">Loading...</div>;

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Rooms", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Contact", href: "#contact" },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-primary/30 relative overflow-x-hidden">
      <FloatingParticles />
      {/* Custom luxury cursor */}
      <div className="custom-cursor pointer-events-none" />
      <div className="custom-cursor-glow pointer-events-none" />
      <Hero3D />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2">
            <h1 className={`font-serif text-2xl font-bold tracking-widest uppercase text-white drop-shadow-md`}>
              Hotel Prayagraj
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm tracking-[0.2em] uppercase transition-colors text-white/70 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`px-8 py-3 border border-primary/50 rounded-full text-xs font-medium tracking-[0.2em] uppercase transition-all bg-primary/10 text-primary hover:bg-primary hover:text-black backdrop-blur-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden border-b border-white/10"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif text-white/90 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-8">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block w-full py-4 border border-primary text-primary hover:bg-primary hover:text-black transition-colors rounded-full text-sm font-medium uppercase tracking-widest"
                >
                  Book Your Stay
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <div className="hero-stars flex justify-center mb-6 opacity-0">
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>
          
          <h1 className="hero-title text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl opacity-0">
            Welcome to <br className="md:hidden" />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Hotel Prayagraj</span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-2xl text-white/80 font-light mb-12 tracking-wide opacity-0">
            Where Hospitality Meets Traditional Rajasthani Warmth
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto">
            <MagneticButton className="w-full sm:flex-1">
              <a
                href="#contact"
                className="hero-btn block px-8 py-4 bg-primary text-black rounded-full font-medium tracking-[0.15em] uppercase hover:bg-primary-light hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all text-center text-xs opacity-0"
              >
                Book Your Stay
              </a>
            </MagneticButton>
            <MagneticButton className="w-full sm:flex-1">
              <a
                href={`https://wa.me/${(publicData?.settings?.whatsapp || "917597117839").replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Hotel Prayagraj! I would like to inquire about booking a room stay.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn block px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium tracking-[0.15em] uppercase hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 text-xs opacity-0"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Book
              </a>
            </MagneticButton>
            <MagneticButton className="w-full sm:flex-1">
              <a
                href={`tel:${publicData?.settings?.phone || "+917597117839"}`}
                className="hero-btn block px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-medium tracking-[0.15em] uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs opacity-0"
              >
                <Phone className="w-4 h-4 text-primary" />
                Call Now
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4 hero-animate">
              About Us
            </h2>
            <CinematicHeading className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
              Experience Comfortable Stay with Traditional Hospitality
            </CinematicHeading>
            <p className="text-lg text-white/80 leading-relaxed font-light mb-8 paragraph-animate">
              Welcome to Hotel Prayagraj, a premium sanctuary located in the heart of Reengus, Rajasthan. 
              We blend modern comfort, impeccable cleanliness, and the renowned warmth of traditional Rajasthani 
              hospitality to create unforgettable experiences for our guests. Situated conveniently near the 
              revered Khatu Shyam Ji Temple, we provide the perfect resting place for pilgrims and travelers alike.
            </p>
            <div className="w-24 h-1 bg-primary opacity-80" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <About3D />
          </motion.div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4 hero-animate">
              Accommodations
            </h2>
            <CinematicHeading className="text-3xl md:text-5xl font-serif font-bold text-white">
              Our Elegant Rooms
            </CinematicHeading>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">

          {publicData?.rooms?.map((room: any, idx: number) => (
            <div
              key={room.id}
              className="room-card bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors backdrop-blur-sm shadow-xl opacity-0"
            >
              <div className="relative h-[250px] overflow-hidden bg-white/5">
                {room.images && room.images.length > 0 ? (
                  <TiltImage src={room.images[0]} alt={room.name} className="w-full h-full">
                    {room.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-black px-4 py-1 text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 text-xs font-bold tracking-widest uppercase rounded border border-white/10">
                      ₹{room.price} / Night
                    </div>
                  </TiltImage>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20"><span className="font-serif">No Image</span></div>
                )}
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif font-bold text-white mb-3">{room.name}</h4>
                <p className="text-white/70 mb-6 font-light">
                  {room.type} • Capacity: {room.capacity}
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {room.amenities?.map((am: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {am}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MagneticButton>
                    <a href="#contact" className="block w-full py-3 border border-primary text-primary text-center rounded hover:bg-primary hover:text-black transition-all text-sm tracking-[0.1em] uppercase">
                      Inquire
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href={`https://wa.me/${(publicData?.settings?.whatsapp || "917597117839").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello Hotel Prayagraj! I am interested in booking the ${room.name} (price: ₹${room.price}/night). Please let me know the availability.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-emerald-600 text-white text-center rounded hover:bg-emerald-500 transition-all text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
</div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4 hero-animate">
              Premium Features
            </h2>
            <CinematicHeading className="text-3xl md:text-5xl font-serif font-bold text-white">
              Hotel Amenities
            </CinematicHeading>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Car />, title: "Free Parking" },
              { icon: <Wind />, title: "Air Conditioned" },
              { icon: <Sparkles />, title: "Daily Housekeeping" },
              { icon: <Coffee />, title: "Room Service" },
              { icon: <TreePine />, title: "Garden Area" },
              { icon: <Users />, title: "Family Stay" },
              { icon: <Utensils />, title: "In-house Dining" },
              { icon: <MapPin />, title: "Prime Location" },
            ].map((amenity, idx) => (
              <div
                key={idx}
                className="amenity-card flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md hover:shadow-xl hover:border-primary/50 transition-all group opacity-0"
              >
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {amenity.icon}
                </div>
                <h4 className="font-medium text-white/90">{amenity.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attraction */}
      <section id="attractions" className="py-24 px-6 relative z-10 bg-black/50 backdrop-blur-lg overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] w-full">
            <TiltImage
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop"
              alt="Khatu Shyam Ji Temple area"
              className="rounded-2xl shadow-2xl h-[400px] w-full"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4 hero-animate">
              Nearby Attraction
            </h2>
            <CinematicHeading className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
              Khatu Shyam Ji Temple
            </CinematicHeading>
            <p className="text-white/80 leading-relaxed font-light mb-8 text-lg paragraph-animate">
              Hotel Prayagraj is strategically and conveniently located for pilgrims and travelers 
              visiting the holy Khatu Shyam Ji Temple. Experience spiritual tranquility just a 
              short journey from your comfortable room. Our dedicated staff can assist you with 
              travel arrangements and local guidance to ensure a peaceful pilgrimage.
            </p>
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full font-medium hover:bg-primary-light transition-all uppercase tracking-[0.2em] text-xs shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                Plan Your Visit <Map className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4 hero-animate">
              Get in Touch
            </h2>
            <CinematicHeading className="text-3xl md:text-5xl font-serif font-bold text-white">
              Contact & Bookings
            </CinematicHeading>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="contact-card md:col-span-4 flex flex-col gap-8 opacity-0">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl mb-2 text-white">Location</h4>
                  <p className="text-white/70 font-light">
                    2–3 Shree Shyam Vihar Colony,<br />
                    Khatu Shyamji Road, Near Shiva Temple,<br />
                    Reengus, Rajasthan 332404
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl mb-2 text-white">Phone</h4>
                  <p className="text-white/70 font-light flex flex-col gap-1">
                    <a href="tel:+917597117839" className="hover:text-primary transition-colors">+91 75971 17839</a>
                    <a href="tel:+919694056634" className="hover:text-primary transition-colors">+91 96940 56634</a>
                    <a href="tel:+919921936383" className="hover:text-primary transition-colors">+91 99219 36383</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-primary shrink-0 border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl mb-2 text-white">Email</h4>
                  <a href="mailto:info@prayagrajhotel.com" className="text-white/70 font-light hover:text-primary transition-colors">
                    info@prayagrajhotel.com
                  </a>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="contact-card md:col-span-8 bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl opacity-0">
              <h4 className="font-serif font-bold text-2xl mb-6 text-white">Send us a message</h4>
              
              <BookingForm rooms={publicData?.rooms} whatsappNumber={publicData?.settings?.whatsapp} />

            </div>
          </div>

          {/* Map */}
          <div className="contact-card mt-12 h-96 rounded-2xl overflow-hidden shadow-lg border border-white/10 opacity-0 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500">
            <iframe 
              src="https://maps.google.com/maps?q=Hotel%20Prayagraj,%20shree%20Shyam%20Vihar%20Colony,%202-3,%20Khatushyamji%20Road,%20near%20Shiva%20Temple,%20Reengus,%20Rajasthan%20332404&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Prayagraj Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-md text-white pt-16 pb-8 px-6 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
          <div className="md:col-span-1">
            <h4 className="font-serif text-2xl font-bold mb-6 text-white">HOTEL PRAYAGRAJ</h4>
            <p className="text-white/70 font-light mb-6">
              Where Hospitality Meets Traditional Rajasthani Warmth.
            </p>
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm mt-2 text-white/50">5.0 Rating on Google</p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-white/70 font-light">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#rooms" className="hover:text-primary transition-colors">Rooms</a></li>
              <li><a href="#amenities" className="hover:text-primary transition-colors">Amenities</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-serif text-xl mb-6 text-white">Contact Information</h4>
            <ul className="flex flex-col gap-4 text-white/70 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>2–3 Shree Shyam Vihar Colony, Khatu Shyamji Road, Near Shiva Temple, Reengus, Rajasthan 332404</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 75971 17839 / +91 96940 56634 / +91 99219 36383</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@prayagrajhotel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 font-light">
          <p>&copy; {new Date().getFullYear()} Hotel Prayagraj. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms and conditions</a>
          </div>
        </div>
      </footer>
      
      {/* 3D Chatbot & Audio Player */}
      <div className="flex flex-col gap-4">
        <LofiPlayer />
        <Chatbot />
      </div>
    </div>
  );
}
