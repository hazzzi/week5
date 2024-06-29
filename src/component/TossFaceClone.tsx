import { Canvas } from "@react-three/fiber";
import Group from "./Group";

const TossFaceClone = () => {
  return (
    <Canvas>
      <color attach="background" args={['#111']} />
      <directionalLight position={[4, 3, 5]} intensity={10} />
      <Group />
    </Canvas>
  );
};

export default TossFaceClone;
