import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.8}>
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
  return (
    <div className="w-full h-80 md:h-[500px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, -10, -5]} intensity={2} color="#D4AF37" />
        <Environment preset="studio" />
        <DistortedSphere />
      </Canvas>
    </div>
  );
}
