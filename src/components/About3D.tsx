import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Dynamic segments based on device type to drastically reduce polygon count on mobile
  const segments = useMemo(() => {
    if (typeof window === 'undefined') return 128;
    if (window.innerWidth < 768) return 48; // Mobile: 48x48 is fast and smooth
    if (window.innerWidth < 1024) return 64; // Tablet
    return 128; // Desktop
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, segments, segments]} scale={1.8}>
          <MeshDistortMaterial
            color="#D4AF37"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={1}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>
      <Sparkles count={50} scale={5} size={2} speed={0.2} opacity={0.5} color="#E8C76A" />
    </group>
  );
}

export default function About3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Viewport visibility checker - pauses execution loop entirely when not on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 } // Render only when at least 5% is visible
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-80 md:h-[500px] relative pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={isInView ? "always" : "never"}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, -10, -5]} intensity={2} color="#D4AF37" />
        <Environment preset="studio" />
        <DistortedSphere />
      </Canvas>
    </div>
  );
}
