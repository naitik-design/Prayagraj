import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MessageSquare, X, Send } from 'lucide-react';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GoldenRobot() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
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
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} emissive="#D4AF37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

function formatMessageText(text: string): React.ReactNode {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        let trimmed = line.trim();
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
        if (isBullet) {
          trimmed = trimmed.substring(2);
        }

        // Parse bold markers **
        const parts = [];
        let currentText = trimmed;
        let boldIndex = currentText.indexOf('**');
        
        while (boldIndex !== -1) {
          if (boldIndex > 0) {
            parts.push(currentText.substring(0, boldIndex));
          }
          const endBoldIndex = currentText.indexOf('**', boldIndex + 2);
          if (endBoldIndex !== -1) {
            parts.push(
              <strong key={boldIndex} className="font-semibold text-gray-950">
                {currentText.substring(boldIndex + 2, endBoldIndex)}
              </strong>
            );
            currentText = currentText.substring(endBoldIndex + 2);
          } else {
            parts.push(currentText.substring(boldIndex));
            currentText = '';
          }
          boldIndex = currentText.indexOf('**');
        }
        if (currentText) {
          parts.push(currentText);
        }

        if (isBullet) {
          return (
            <div key={i} className="flex items-start gap-1.5 ml-1">
              <span className="text-[#D4AF37] select-none mt-1.5 shrink-0 text-[8px]">●</span>
              <span className="flex-1">{parts}</span>
            </div>
          );
        }

        return <p key={i} className="min-h-[1rem]">{parts}</p>;
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Namaste! Welcome to Hotel Prayagraj. How can I assist you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    const userMessage: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please call us at +91 75971 17839 for assistance.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 3D Robot always floating above the button or beside the chat window */}
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
              <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#D4AF37" />
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
            className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mb-4 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-[#050505] border-b border-white/20 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[2, 2, 2]} intensity={1} />
                      <GoldenRobot />
                    </Canvas>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Prayagraj Concierge</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#D4AF37] text-black rounded-tr-none' 
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-4 text-sm shadow-sm bg-white/5 border border-white/10 text-white/90 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0E0E10] border-t border-white/10">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-full text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] placeholder:text-white/40"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 rounded-full bg-[#D4AF37] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E8C76A] transition-colors shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#050505] border border-white/20 text-[#D4AF37] rounded-full shadow-lg flex items-center justify-center hover:bg-[#0E0E10] hover:border-[#D4AF37] transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
}
