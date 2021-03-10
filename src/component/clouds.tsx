import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
// import { OrbitControls, MeshDistortMaterial, shaderMaterial } from "drei";
import * as THREE from "three";
// import setInitialPositions from "./set-initial-positions";

interface positionInterface{
    height : number;
    position: number;
    isVisible: boolean;
    velocity: number;
}

interface cloudInterface{
    intensity: number;
    number: number;
    isVisible: boolean;
    velocity: number;
}

const Cloud = ({ height, position, isVisible, velocity}: positionInterface) => {
  const group: React.MutableRefObject<any> = useRef<THREE.Group>()
  const z = -10;

  useFrame(({ clock }) => {

    if (group.current.position.x >= 30) {group.current.position.x = positionRand(-20, -25)};
    group.current.position.x = (clock.getElapsedTime() * velocity) % 30;
  });

  return (
    <group ref={group} visible={isVisible}>
      <mesh castShadow receiveShadow position={[position, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[2, 2]} />
      </mesh>
      <mesh castShadow receiveShadow position={[position - 2, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
       </mesh>
      <mesh castShadow receiveShadow position={[position + 2, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
      </mesh>
    </group>
  );
};

const heightRand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const positionRand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

function cloudSpawn(number: number, isVisible: boolean, velocity: number){
    let cloudsDisplay = [];

    for(let i=0; i<number; i++){
    cloudsDisplay.push( <>
    <Cloud isVisible={isVisible} velocity={velocity} height={heightRand(3, 4)} position={positionRand(10, -25)} />
    <Cloud isVisible={isVisible} velocity={velocity} height={heightRand(4, 8)} position={positionRand(10, -25)} />
    </>);
    };
    return cloudsDisplay;
}

const Clouds = ({number, isVisible, velocity}: cloudInterface) => {
  return (
    <group>
    {cloudSpawn(number, isVisible, velocity)}
    </group>
  );
};


export default Clouds;
