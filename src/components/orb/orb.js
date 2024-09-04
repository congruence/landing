import React, { useMemo, useEffect, useRef } from "react";
import { Float, PerspectiveCamera, Icosahedron } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import audioUrl from "../../assets/audio.mp3";
import vertexShader from "../../shaders/vertex";
import fragmentShader from "../../shaders/fragment";
import gsap from "gsap";

function Orb(props) {
  let { ocf } = props;
  const meshRef = useRef();
  const { camera } = useThree();

  const listener = useMemo(() => new THREE.AudioListener(), []);
  const sound = useMemo(() => new THREE.Audio(listener), [listener]);
  const analyser = useMemo(() => new THREE.AudioAnalyser(sound, 32), [sound]);
  const clock = useMemo(() => new THREE.Clock(), []);

  useEffect(() => {
    camera.add(listener);
  }, [camera, listener]);

  useEffect(() => {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(audioUrl, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
    });
    ocf(sound);
  }, [sound, ocf]);

  useFrame(() => {
    if (meshRef.current.material.userData.shader !== undefined) {
      gsap.to(meshRef.current.material.userData.shader.uniforms.audioData, {
        value: (analyser.getAverageFrequency() - 0) / (159.983 - 0),
        duration: 0.1,
        ease: "power4.inOut",
      });
      meshRef.current.material.userData.shader.uniforms.time.value =
        clock.getElapsedTime();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 2.7]} />
      <Float floatIntensity={0} rotationIntensity={2}>
        <mesh>
          <Icosahedron
            args={window.innerWidth < 500 ? [0.5, 4] : [0.7, 5]}
            ref={meshRef}
          >
            <meshBasicMaterial
              attach={"material"}
              onBeforeCompile={(shader) => {
                shader.vertexShader = vertexShader;
                shader.fragmentShader = fragmentShader;
                shader.uniforms = {
                  ...shader.uniforms,
                  time: { value: 0 },
                  audioData: { value: 0 },
                };
                meshRef.current.material.userData.shader = shader;
              }}
              wireframe
            />
          </Icosahedron>
        </mesh>
      </Float>
    </>
  );
}

export default Orb;
