'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/Character/basic.glb');
  return <primitive object={gltf.scene} />;
};

const UserCharacter = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model />
        <OrbitControls enableZoom={false} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default UserCharacter;
