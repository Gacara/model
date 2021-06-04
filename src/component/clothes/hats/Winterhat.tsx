/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: alissvetlana (https://sketchfab.com/alissvetlana)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/a7f54e87bea94730b4a1827ec1f770df
title: hat
*/


import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    GeoSphere001__zaaadefault_0: THREE.Mesh
  }
  materials: {
    zaaadefault: THREE.MeshStandardMaterial
  }
}

export default function Winterhat(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const gltf = useLoader(GLTFLoader, "/hats/winterhat.glb");
  const { nodes, materials } = gltf as GLTFResult
  return (
    <group ref={group} scale={[0.10,0.10,0.10]} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.08, 0.08, 0.08]}>
            <group>
              <mesh material={materials.zaaadefault} geometry={nodes.GeoSphere001__zaaadefault_0.geometry} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
