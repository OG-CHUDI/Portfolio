import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function ParticleField({ count = 500, mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005,
        ],
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mouseX = mousePosition.current.x * 10;
    const mouseY = mousePosition.current.y * 10;
    
    particles.forEach((particle, i) => {
      const [x, y, z] = particle.position;
      const [vx, vy, vz] = particle.velocity;
      
      // Update position with noise
      particle.position[0] = x + vx + Math.sin(time * 0.5 + particle.phase) * 0.002;
      particle.position[1] = y + vy + Math.cos(time * 0.3 + particle.phase) * 0.002;
      particle.position[2] = z + vz;
      
      // Mouse repulsion
      const dx = particle.position[0] - mouseX;
      const dy = particle.position[1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        particle.position[0] += (dx / dist) * force;
        particle.position[1] += (dy / dist) * force;
      }
      
      // Boundary wrap
      if (particle.position[0] > 10) particle.position[0] = -10;
      if (particle.position[0] < -10) particle.position[0] = 10;
      if (particle.position[1] > 10) particle.position[1] = -10;
      if (particle.position[1] < -10) particle.position[1] = 10;
      
      dummy.position.set(
        particle.position[0],
        particle.position[1],
        particle.position[2]
      );
      
      // Scale based on depth
      const scale = 0.03 + (particle.position[2] + 5) * 0.005;
      dummy.scale.setScalar(Math.max(0.01, scale));
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        color="#F97316" 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

function ConnectionLines({ count = 50 }: { count?: number }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      );
      pos.push(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      );
    }
    return new Float32Array(pos);
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.z = time * 0.02;
    linesRef.current.rotation.y = time * 0.01;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#F97316" 
        transparent 
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, #0a0f1a 0%, #02040a 100%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={300} mousePosition={mousePosition} />
        <ConnectionLines count={30} />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02040a]/80 pointer-events-none" />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
