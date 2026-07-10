import { useEffect, useState } from "react";
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
  Map
} from "lucide-react";

import Hero3D from "./components/Hero3D";
import Chatbot from "./components/Chatbot";
import About3D from "./components/About3D";
import LofiPlayer from "./components/LofiPlayer";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen text-white font-sans selection:bg-primary/30 relative">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="flex gap-1 text-primary">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Welcome to <br className="md:hidden" />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Hotel Prayagraj</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/80 font-light mb-12 tracking-wide"
          >
            Where Hospitality Meets Traditional Rajasthani Warmth
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#contact"
              className="px-10 py-4 bg-primary text-black rounded-full font-medium tracking-[0.2em] uppercase hover:bg-primary-light hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all w-full sm:w-auto text-sm"
            >
              Book Your Stay
            </a>
            <a
              href="tel:+917597117839"
              className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center gap-3 text-sm"
            >
              <Phone className="w-4 h-4 text-primary" />
              Call Now
            </a>
          </motion.div>
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
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              About Us
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
              Experience Comfortable Stay with Traditional Hospitality
            </h3>
            <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
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
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Accommodations
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Our Elegant Rooms
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Deluxe Room */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                  alt="Deluxe Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif font-bold text-white mb-3">Deluxe Room</h4>
                <p className="text-white/70 mb-6 font-light">
                  A beautifully appointed room offering premium bedding, elegant decor, and all modern 
                  conveniences for a relaxing retreat.
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <BedDouble className="w-4 h-4 text-primary" /> King Bed
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Wind className="w-4 h-4 text-primary" /> Air Conditioned
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Coffee className="w-4 h-4 text-primary" /> Room Service
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Sparkles className="w-4 h-4 text-primary" /> Housekeeping
                  </li>
                </ul>
                <a
                  href="#contact"
                  className="inline-block w-full text-center py-4 border border-primary/50 text-primary rounded-full hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all uppercase tracking-[0.2em] text-xs font-medium"
                >
                  Reserve Now
                </a>
              </div>
            </motion.div>

            {/* Family Room */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                  alt="Family Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif font-bold text-white mb-3">Family Room</h4>
                <p className="text-white/70 mb-6 font-light">
                  Spacious accommodations designed for families and groups, providing extra space 
                  and comfort without compromising on luxury.
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Users className="w-4 h-4 text-primary" /> Family Stay
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Wind className="w-4 h-4 text-primary" /> Air Conditioned
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Utensils className="w-4 h-4 text-primary" /> In-house Dining
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <Car className="w-4 h-4 text-primary" /> Free Parking
                  </li>
                </ul>
                <a
                  href="#contact"
                  className="inline-block w-full text-center py-4 border border-primary/50 text-primary rounded-full hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all uppercase tracking-[0.2em] text-xs font-medium"
                >
                  Reserve Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Premium Features
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Hotel Amenities
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
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
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md hover:shadow-xl hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {amenity.icon}
                </div>
                <h4 className="font-medium text-white/90">{amenity.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Attraction */}
      <section id="attractions" className="py-24 px-6 relative z-10 bg-black/50 backdrop-blur-lg overflow-hidden border-y border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop"
              alt="Khatu Shyam Ji Temple area"
              className="rounded-2xl shadow-2xl h-[400px] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Nearby Attraction
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Khatu Shyam Ji Temple
            </h3>
            <p className="text-white/80 leading-relaxed font-light mb-8 text-lg">
              Hotel Prayagraj is strategically and conveniently located for pilgrims and travelers 
              visiting the holy Khatu Shyam Ji Temple. Experience spiritual tranquility just a 
              short journey from your comfortable room. Our dedicated staff can assist you with 
              travel arrangements and local guidance to ensure a peaceful pilgrimage.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full font-medium hover:bg-primary-light transition-all uppercase tracking-[0.2em] text-xs shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              Plan Your Visit <Map className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Get in Touch
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Contact & Bookings
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 flex flex-col gap-8"
            >
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
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-8 bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
            >
              <h4 className="font-serif font-bold text-2xl mb-6 text-white">Send us a message</h4>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/30" placeholder="Enter your email address" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Message / Booking Details</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/30" placeholder="I would like to book a Deluxe Room for..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-4 bg-primary text-black rounded-lg font-medium tracking-[0.2em] uppercase hover:bg-primary-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    Send Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 h-96 rounded-2xl overflow-hidden shadow-lg border border-white/10 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
          >
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
          </motion.div>
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
