'use client';

import { cn } from '@/lib/utils';
import { Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Low-poly artistic coffee bean
function LowPolyCoffeeBean({ isMobile = false }: { isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const geometry = useMemo(() => {
    // Start with a low-res sphere (Icosahedron is great for low poly look)
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    // Deform vertices essentially randomizing slightly for "hand-crafted" look
    // while maintaining general bean shape
    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        
        const x = vertex.x;
        const y = vertex.y;
        const z = vertex.z;
        
        // 1. Elongate vertically
        let newY = y * 1.6;
        
        // 2. Flatten depth
        let newZ = z * 0.6;
        
        // 3. Create crease
        const creaseWidth = 0.5;
        const creaseDepth = 0.6;
        
        if (z > 0) {
            const distFromCenter = Math.abs(x);
            // Sharp linear indent for low-poly look
            if (distFromCenter < creaseWidth) {
                const indent = (1 - distFromCenter / creaseWidth) * creaseDepth;
                newZ -= indent;
            }
        }
        
        // Flatten back
        if (z < 0) newZ *= 0.7;

        positionAttribute.setXYZ(i, x, newY, newZ);
    }
    
    // CRITICAL: Compute flat normals for the faceted low-poly look
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Adaptive positioning based on viewport width
  // Phones (< 5 units): Top-right corner
  // Tablets/Desktop (>= 5 units): Vertically centered on right
  const isSmallScreen = viewport.width < 5;
  
  const scale = isSmallScreen ? 0.45 : 0.9;
  
  const positionX = isSmallScreen ? viewport.width / 2.5 : viewport.width / 3.5;
  const positionY = isSmallScreen ? viewport.height / 2.6 : 0; // Only move up on actual small screens
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={1.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh 
        ref={meshRef} 
        geometry={geometry} 
        scale={scale}
        position={[positionX, positionY, 0]}
      >
        {/* Flat shading is key for low-poly style */}
        <meshStandardMaterial
          color="#6F4E37" // Coffee brown
          flatShading={true} // ENABLES THE LOW POLY LOOK
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

interface Flying3DCoffeeCupProps {
  className?: string;
}

export function Flying3DCoffeeCup({ className }: Flying3DCoffeeCupProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!isClient) return null;
  
  return (
    <div 
      className={cn('absolute inset-0 pointer-events-none z-[5]', className)}
      style={{ 
        // Use full viewport overlays to avoid clipping
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        {/* Strong directional lights to highlight the facets */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffd89b" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#ff9000" />
        
        <Suspense fallback={null}>
          <LowPolyCoffeeBean isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { Flying3DCoffeeCup as Flying3DCoffeeBean };
