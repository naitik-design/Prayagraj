import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MessageSquare, X, Send, Trash2, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { searchFAQ, FALLBACK_ANSWER } from "../utils/faqEngine";

function GoldenRobot() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#0E0E10" roughness={0.1} metalness={0.4} />
      </mesh>

      {/* Face Plate */}
      <mesh position={[0, 1.2, 0.38]} rotation={[-0.1, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.25, 0.44]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[0.15, 1.25, 0.44]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.2, 0.8, 32]} />
        <meshStandardMaterial color="#0E0E10" roughness={0.1} metalness={0.4} />
      </mesh>

      {/* Golden Accents */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.02, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} />
      </mesh>

      {/* Floating Rings */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={1}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={1}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  category?: string;
}

function formatMessageText(text: string): React.ReactNode {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        let trimmed = line.trim();
        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ");
        if (isBullet) {
          trimmed = trimmed.substring(2);
        }

        // Parse bold markers **
        const parts = [];
        let currentText = trimmed;
        let boldIndex = currentText.indexOf("**");

        while (boldIndex !== -1) {
          if (boldIndex > 0) {
            parts.push(currentText.substring(0, boldIndex));
          }
          const endBoldIndex = currentText.indexOf("**", boldIndex + 2);
          if (endBoldIndex !== -1) {
            parts.push(
              <strong key={boldIndex} className="font-semibold text-[#D4AF37]">
                {currentText.substring(boldIndex + 2, endBoldIndex)}
              </strong>,
            );
            currentText = currentText.substring(endBoldIndex + 2);
          } else {
            parts.push(currentText.substring(boldIndex));
            currentText = "";
          }
          boldIndex = currentText.indexOf("**");
        }
        if (currentText) {
          parts.push(currentText);
        }

        if (isBullet) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-1">
              <span className="text-[#D4AF37] select-none mt-1 shrink-0 text-[10px]">
                ✦
              </span>
              <span className="flex-1">{parts}</span>
            </div>
          );
        }

        return (
          <p key={i} className="min-h-[1rem]">
            {parts}
          </p>
        );
      })}
    </div>
  );
}

const DEFAULT_WELCOME_MESSAGE: Message = {
  id: "welcome-1",
  text: "Namaste! Welcome to Hotel Jaipur Rajwada. I am your 24/7 Concierge AI. How may I assist you with your stay, pricing, rooms, or location today?",
  sender: "bot",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickFaqs = [
    "How much does a room cost?",
    "Where is the hotel located?",
    "Are unmarried couples allowed?",
    "Do you have free parking?",
    "Is breakfast included?",
    "Room kitne ka hai?",
    "Location bhejo",
    "Wedding & Banquet booking"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendQuery = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Completely offline local AI search computation with realistic micro-typing indicator
    setTimeout(() => {
      const result = searchFAQ(trimmed);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: result.answer,
        sender: "bot",
        category: result.faq?.category
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 350);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputValue);
  };

  const clearHistory = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* 3D Floating Robot when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-32 h-32 pointer-events-none mb-2"
          >
            <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
              <spotLight
                position={[-5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#D4AF37"
              />
              <Environment preset="city" />
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <GoldenRobot />
              </Float>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#050505] w-80 sm:w-96 rounded-2xl shadow-2xl border border-white/15 overflow-hidden mb-4 flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="bg-[#0E0E10] border-b border-white/10 p-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center relative overflow-hidden shrink-0 border border-[#D4AF37]/30">
                  <div className="absolute inset-0">
                    <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[2, 2, 2]} intensity={1} />
                      <GoldenRobot />
                    </Canvas>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-xs text-white tracking-wide">Rajwada AI Concierge</h3>
                    <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30 font-mono">OFFLINE</span>
                  </div>
                  <p className="text-[10px] text-white/60 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Instant Search Engine
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={clearHistory}
                    title="Clear Chat History"
                    className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#050505] scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#D4AF37] text-black font-medium rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                    }`}
                  >
                    {msg.sender === "bot" && msg.category && (
                      <span className="inline-block text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono mb-1 bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/20">
                        {msg.category}
                      </span>
                    )}
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Quick FAQ Suggestion Chips */}
              {messages.length <= 3 && !isLoading && (
                <div className="pt-2 pb-1">
                  <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#D4AF37] mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Frequently Asked Questions:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickFaqs.map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendQuery(faq)}
                        className="text-[11px] bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg transition-all text-left"
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 text-white/90 rounded-tl-none flex items-center gap-1.5">
                    <span className="text-[#D4AF37] text-[10px] tracking-wider uppercase font-mono">Searching</span>
                    <span
                      className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Bar */}
            <div className="px-3 py-1.5 bg-[#08080A] border-t border-white/5 flex items-center justify-between text-[11px] gap-1.5">
              <a 
                href="https://wa.me/917877958308?text=Hello%20Hotel%20Jaipur%20Rajwada!%20I%20would%20like%20to%20inquire%20about%20booking." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded transition-colors text-center flex-1 border border-emerald-500/30 flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <a 
                href="tel:+917877958308" 
                className="px-2 py-1 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded transition-colors text-center flex-1 border border-white/10 flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#0E0E10] border-t border-white/10">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything (e.g. Price, Location, Couple allowed)..."
                  className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 text-white rounded-full text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8C76A] transition-colors shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#050505] border border-[#D4AF37]/40 text-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center hover:bg-[#0E0E10] hover:border-[#D4AF37] transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
