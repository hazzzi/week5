import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function App() {
  const { scene } = useGLTF(`/donut.gltf`);

  return (
    <main>
      <Canvas>
        <directionalLight position={[4, 3, 5]} intensity={10} />
        <group>
          <primitive object={scene}/>
        </group>
      </Canvas>
    </main>
  );
}

export default App;
