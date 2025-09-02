import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light from the opposite side */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.4}
        color="#4080ff"
      />
      
      {/* Rim light for dramatic effect */}
      <pointLight
        position={[0, 8, -8]}
        intensity={0.5}
        color="#ff6080"
        distance={20}
      />
      
      {/* Soft accent lights */}
      <pointLight
        position={[-8, 2, 4]}
        intensity={0.3}
        color="#80ff80"
        distance={15}
      />
      
      <pointLight
        position={[8, 2, 4]}
        intensity={0.3}
        color="#ff8080"
        distance={15}
      />
    </>
  );
};

export default Lighting;
