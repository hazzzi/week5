import { CameraControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { emojiRenders } from '../util/emoji';
import Emoji from './Emoji';

const Group = () => {
  const groupRef = useRef(null);
  const cameraRef = useRef<CameraControls>(null);

  const [disableAutoRotate, setDisableAutoRotate] = useState(false);

  useEffect(() => {
    cameraRef.current?.setTarget(0, 0, 0, true);
  });

  useFrame((_, delta) => {
    if (cameraRef.current && !disableAutoRotate) {
      cameraRef.current.azimuthAngle += MathUtils.degToRad(10 * delta);
    }
  });

  return (
    <group ref={groupRef}>
      <CameraControls
        ref={cameraRef}
        enabled
        maxDistance={20}
        onStart={() => setDisableAutoRotate(true)}
        onEnd={() => setDisableAutoRotate(false)}
      />
      {emojiRenders.map(({ id, emoji, position, scale, animationType, color }) => (
        <Emoji
          key={id}
          position={position}
          src={emoji}
          scale={scale}
          animationType={animationType}
          color={color}
        />
      ))}
    </group>
  );
};

export default Group;
