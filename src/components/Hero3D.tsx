import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingInvoice: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#3B82F6"
          transparent
          opacity={0.8}
          emissive="#1E3A8A"
          emissiveIntensity={0.2}
        />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        >
          INVOICE
        </Text>
      </mesh>
    </Float>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <FloatingInvoice position={[-3, 2, -2]} />
        <FloatingInvoice position={[3, -1, -1]} />
        <FloatingInvoice position={[0, 1, -3]} />
        <FloatingInvoice position={[-2, -2, 1]} />
        <FloatingInvoice position={[2, 3, 0]} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400 bg-clip-text text-transparent"
          >
            InvoSync
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            AI-Powered Invoice & Receipt Mapper for
            <br />
            <span className="text-blue-400 font-semibold">Automated Bookkeeping</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
          >
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm rounded-lg text-lg font-semibold border border-gray-600 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;