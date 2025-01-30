import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// selectedCharacter를 prop으로 받아서 모델을 로드하는 방식으로 변경
const Model = ({ characterKey }: { characterKey: string }) => {
  const gltf = useLoader(GLTFLoader, `/Character/${characterKey}.glb`);
  const modelRef = useRef<THREE.Object3D>();
  const [isRotating, setIsRotating] = useState(true);
  const rotationSpeed = useRef(0.2);
  const totalRotation = useRef(0);
  const lerpFactor = useRef(0.1); // 보간 계수

  useFrame(() => {
    if (modelRef.current && isRotating) {
      rotationSpeed.current *= 0.99; // 감속률 조정
      const rotation = rotationSpeed.current;
      totalRotation.current += rotation;

      // 3바퀴 회전 후 자연스럽게 정면으로
      if (totalRotation.current >= Math.PI * 6) {
        // 현재 회전 각도에서 정면으로 움직임 (lerp)
        const currentRotation = modelRef.current.rotation.y;
        const targetAngle = Math.PI * 6;
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          currentRotation,
          targetAngle,
          lerpFactor.current
        );

        // 거의 정면에 도달했을 때 회전 정지
        if (Math.abs(modelRef.current.rotation.y - targetAngle) < 0.01) {
          setIsRotating(false);
          modelRef.current.rotation.y = 0;
        }
      } else {
        modelRef.current.rotation.y += rotation;
      }
    }
  });

  return (
    <primitive ref={modelRef} object={gltf.scene} scale={[2.5, 2.5, 2.5]} />
  );
};

/* ambientLight: 장면 전체에 균일한 조명을 제공 */
/* directionalLight: 특정 방향에서 강한 빛을 비추며 그림자를 생성 */
/* OrbitControls: 사용자가 마우스를 사용하여 3D 모델을 회전 */
const UserCharacter = ({
  selectedCharacter,
}: {
  selectedCharacter: string | null;
}) => {
  return (
    <Canvas key={selectedCharacter || 'default'}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        {selectedCharacter && (
          <Model key={selectedCharacter} characterKey={selectedCharacter} />
        )}
        <OrbitControls enableZoom={false} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default UserCharacter;
