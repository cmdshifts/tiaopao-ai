"use client"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export const Backpack = () => {
  const { scene } = useGLTF("/models/backpack/scene.gltf")
  const modelRef = useRef<any>(null)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useFrame(() => {
    const rotationFactor = Math.PI / 9
    if (modelRef.current) {
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        mousePosition.x * rotationFactor,
        0.1
      )
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        -mousePosition.y * rotationFactor,
        0.1
      )
    }
  })

  return (
    <>
      <Suspense fallback={null}>
        <directionalLight
          color="yellow"
          intensity={2}
          position={[-5, 10, 5]}
        />
        <directionalLight
          color="blue"
          intensity={3}
          position={[2, 5, 10]}
        />
        <ambientLight
          color="#ffffff"
          intensity={3}
        />
        <pointLight
          color="#ffffff"
          intensity={3}
          position={[0, 20, 0]}
        />
        <directionalLight intensity={2} />

        <group ref={modelRef}>
          <primitive
            object={scene}
            scale={0.05}
            position={[0, -1, 0]}
            rotation={[Math.PI / 15, Math.PI / 1, 0]}
          />
        </group>
      </Suspense>
    </>
  )
}
