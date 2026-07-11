import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function CinematicDustParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const count = 1200; // Premium abundance of particles

  // Dynamic procedural gold bokeh glow texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.15, 'rgba(212, 175, 55, 0.95)'); // Luxury gold center core
      gradient.addColorStop(0.35, 'rgba(212, 175, 55, 0.4)');   // Soft gold glow
      gradient.addColorStop(0.65, 'rgba(212, 175, 55, 0.08)');  // Outer golden haze
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const [positions, phases, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // Z

      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.03 + Math.random() * 0.12;
    }
    return [pos, phase, speed];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geo = geomRef.current;
    if (!geo) return;

    const posArr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Slow elegant upward air drift
      posArr[idx + 1] += speeds[i] * 0.035;

      // Gentle swaying / thermal air currents
      const driftPhase = phases[i] + time * (speeds[i] * 0.3);
      posArr[idx] += Math.sin(driftPhase) * 0.007;
      posArr[idx + 2] += Math.cos(driftPhase) * 0.007;

      // Wrap around Y boundary smoothly when rising past top threshold
      if (posArr[idx + 1] > 20) {
        posArr[idx + 1] = -15;
        posArr[idx] = (Math.random() - 0.5) * 50;
        posArr[idx + 2] = (Math.random() - 0.5) * 40;
      }
    }

    geo.attributes.position.needsUpdate = true;
    
    // Smooth celestial rotation of the overall field
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.008;
      pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={particleTexture}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#F8F3D4" // Heavenly soft ivory-gold hue
      />
    </points>
  );
}

function HotelBuilding({ entranceProgress }: { entranceProgress: number }) {
  // Use entranceProgress to fade in emissive lights
  const windowOpacity = 0.3 + Math.random() * 0.5 * entranceProgress;
  
  return (
    <group position={[0, -1, 0]}>
      {/* Central Tower */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 8, 2.5]} />
        <meshStandardMaterial color="#0A0A0C" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Golden Crown */}
      <mesh position={[0, 7.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.5, 2.3]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={1} emissive="#4a3a00" emissiveIntensity={entranceProgress} />
      </mesh>

      {/* East Wing */}
      <mesh position={[2.5, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 2]} />
        <meshStandardMaterial color="#0A0A0C" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* West Wing */}
      <mesh position={[-2.5, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 2]} />
        <meshStandardMaterial color="#0A0A0C" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Windows glow (Front) */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`win-center-${i}`} position={[0, 0.5 + i * 0.9, 1.26]}>
          <planeGeometry args={[1.5, 0.4]} />
          <meshBasicMaterial color="#E8C76A" transparent opacity={(0.2 + Math.random() * 0.4) * entranceProgress} />
        </mesh>
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`win-east-${i}`} position={[2.5, 0.5 + i * 0.9, 1.01]}>
          <planeGeometry args={[2, 0.4]} />
          <meshBasicMaterial color="#E8C76A" transparent opacity={(0.1 + Math.random() * 0.3) * entranceProgress} />
        </mesh>
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`win-west-${i}`} position={[-2.5, 0.5 + i * 0.9, 1.01]}>
          <planeGeometry args={[2, 0.4]} />
          <meshBasicMaterial color="#E8C76A" transparent opacity={(0.1 + Math.random() * 0.3) * entranceProgress} />
        </mesh>
      ))}

      {/* Grand Entrance */}
      <mesh position={[0, -0.2, 1.4]} castShadow>
        <boxGeometry args={[4, 1.5, 1]} />
        <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* Entrance doors glowing */}
      <mesh position={[0, -0.4, 1.91]}>
        <planeGeometry args={[1.2, 1.0]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={entranceProgress} />
      </mesh>
      
      {/* Canopy pillars */}
      <mesh position={[-1.8, -0.2, 1.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} />
      </mesh>
      <mesh position={[1.8, -0.2, 1.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} />
      </mesh>
    </group>
  );
}

function SceneControls() {
  const { camera, scene } = useThree();
  const group = useRef<THREE.Group>(null);
  
  // Create a target vector to reuse
  const target = useRef(new THREE.Vector3(0, 2, 0));
  
  const [entranceProgress, setEntranceProgress] = useState(0);

  useFrame((state) => {
    const scrollY = window.scrollY;
    
    // Entrance animation
    if (state.clock.elapsedTime < 5) {
      setEntranceProgress(Math.min(1, state.clock.elapsedTime / 3));
    } else if (entranceProgress !== 1) {
      setEntranceProgress(1);
    }
    
    if (group.current) {
      // Gentle rotation over time
      group.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    
    // Parallax on scroll and mouse position
    const targetY = 2 + scrollY * 0.003;
    // Deepen Z based on scroll
    const targetZ = 14 - scrollY * 0.002;
    
    // Subtle mouse movement parallax
    const mouseX = (state.mouse.x * 2) || 0;
    const mouseY = (state.mouse.y * 2) || 0;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseY * 0.5, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
    
    // Adjust target based on scroll
    target.current.y = THREE.MathUtils.lerp(target.current.y, 2 + scrollY * 0.002, 0.05);
    camera.lookAt(target.current);
    
    // Fog clears up slightly as we enter
    if (scene.fog) {
      (scene.fog as THREE.Fog).near = THREE.MathUtils.lerp((scene.fog as THREE.Fog).near, 10 + entranceProgress * 5, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1} floatingRange={[-0.1, 0.1]}>
        <HotelBuilding entranceProgress={entranceProgress} />
      </Float>
      
      {/* Floating particles - Gold Dust & Cinematic Sanctuary floating dust */}
      <CinematicDustParticles />
      
      {/* Floor reflection shadow */}
      <ContactShadows position={[0, -1.1, 0]} opacity={0.9} scale={30} blur={3} far={5} color="#000000" />
      
      {/* Moving Clouds / Fog */}
      <group position={[0, -2, -10]}>
        <Cloud opacity={0.1} speed={0.2} color="#E8C76A" />
      </group>
      
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas 
        camera={{ position: [0, 2, 20], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Deep cinematic fog */}
        <fog attach="fog" args={['#050505', 5, 25]} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.1} />
        
        {/* Soft god ray / moonlight from top */}
        <directionalLight position={[0, 20, 0]} intensity={0.5} color="#FAFAFA" castShadow />
        
        {/* Golden rim light - Sunrise */}
        <spotLight position={[-15, 10, -10]} angle={0.4} penumbra={1} intensity={6} color="#D4AF37" castShadow />
        
        {/* Soft glow fill */}
        <spotLight position={[15, -5, 10]} angle={0.6} penumbra={1} intensity={2} color="#E8C76A" />
        
        <Environment preset="night" />
        
        <SceneControls />
      </Canvas>
      
      {/* Cinematic Blurry Overlay / Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_100%)] pointer-events-none opacity-80" />
      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/20 pointer-events-none" />
    </div>
  );
}
