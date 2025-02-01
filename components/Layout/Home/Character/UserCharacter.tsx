import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Model = ({
  characterKey,
  isOpen,
}: {
  characterKey: string;
  isOpen: boolean;
}) => {
  const gltf = useLoader(GLTFLoader, `/Character/${characterKey}.glb`);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const isRotatingRef = useRef(true);
  const rotationSpeed = useRef(0.2);
  const totalRotation = useRef(0);
  const lerpFactor = useRef(0.1); // 보간 계수

  // isOpen 값이 바뀔 때 scale 값 업데이트
  const scale = useMemo(
    () => (isOpen ? [1.5, 1.5, 1.5] : [2.5, 2.5, 2.5]),
    [isOpen]
  );

  // scale 변경 시 즉시 반영
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(scale[0], scale[1], scale[2]);
    }
  }, [scale]);

  useFrame(() => {
    if (!modelRef.current || !isRotatingRef.current) return;

    rotationSpeed.current *= 0.99; // 감속률 조정
    const rotation = rotationSpeed.current;
    totalRotation.current += rotation;

    // 3바퀴 회전 후 자연스럽게 정면으로
    if (totalRotation.current >= Math.PI * 6) {
      const currentRotation = modelRef.current.rotation.y;
      const targetAngle = Math.PI * 6;
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRotation,
        targetAngle,
        lerpFactor.current
      );

      // 거의 정면에 도달했을 때 회전 정지
      if (Math.abs(modelRef.current.rotation.y - targetAngle) < 0.01) {
        isRotatingRef.current = false;
        modelRef.current.rotation.y = 0;
      }
    } else {
      modelRef.current.rotation.y += rotation;
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} />;
};

/* ambientLight: 장면 전체에 균일한 조명을 제공 */
/* directionalLight: 특정 방향에서 강한 빛을 비추며 그림자를 생성 */
/* OrbitControls: 사용자가 마우스를 사용하여 3D 모델을 회전 */
const UserCharacter = ({
  selectedCharacter,
  isOpen,
}: {
  selectedCharacter: string | null;
  isOpen: boolean;
}) => {
  return (
    <Canvas key={`${selectedCharacter}-${isOpen}`}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        {selectedCharacter && (
          <Model
            key={selectedCharacter}
            characterKey={selectedCharacter}
            isOpen={isOpen}
          />
        )}
        <OrbitControls enableZoom={false} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default UserCharacter;
