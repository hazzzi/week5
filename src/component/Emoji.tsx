import { useGLTF } from '@react-three/drei';
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useEffect, useMemo, useRef } from 'react';
import { Color, MeshStandardMaterial } from 'three';

type Props = {
  position: readonly [number, number, number];
  src: string;
  scale: number;
  color: Color;
  animationType: 'scale' | 'rotateX' | 'rotateY';
};

const getAnimation = {
  scale: (defaultScale: number) => ({ scale: defaultScale * 1.5 }),
  rotateX: () => ({ rotateX: Math.PI / 3 }),
  rotateY: () => ({ rotateY: Math.PI / 3 }),
};

const Emoji = ({ position, scale, src, animationType, color }: Props) => {
  const groupRef = useRef(null);
  const { scene } = useGLTF(`/${src}.gltf`);
  const copyScene = useMemo(() => scene.clone(), [scene]);

  const controls = useAnimation();

  const handlePointerOver = () => {
    controls.start({
      ...getAnimation[animationType](scale),
      transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' },
    });
  };

  const handlePointerOut = () => {
    controls.start({
      scale,
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.8 },
    });
  };

  useEffect(() => {
    if (groupRef.current) {
      const [x, y, z] = position;
      // eslint-disable-next-line
      // @ts-ignore
      groupRef.current.lookAt(x * 2, y * 2, z * 2);
    }
  }, [position]);

  useEffect(() => {
    copyScene.traverse((child) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (child.isMesh) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        child.material = new MeshStandardMaterial({ color });
      }
    });
  }, [color, copyScene]);

  return (
    <motion.group
      ref={groupRef}
      position={position}
      scale={scale}
      animate={controls}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={copyScene} />
    </motion.group>
  );
};

export default Emoji;
