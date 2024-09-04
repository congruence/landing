import React, { useState } from "react";
import { useEffect } from "react";
import "./home.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Orb from "../../components/orb/orb";
import PlayPause from "../../components/playpause/playPause";
import { Canvas } from "@react-three/fiber";

function Home() {
  gsap.registerPlugin(useGSAP);

  let [soundRef, setSoundRef] = useState(null);

  useEffect(() => {
    console.log(soundRef);
  }, [soundRef]);

  return (
    <div className="main-container">
      <div className="header">
        <div className="logo">
          <p>
            <lable style={{ color: "#000" }}>C</lable>ongruence
            <lable style={{ color: "#06D001" }}>L</lable>abs
          </p>
        </div>
      </div>
      <div className="hello">
        {soundRef === null ? <></> : <PlayPause sound={soundRef} />}
        <Canvas
          dpr={window.devicePixelRatio}
          gl={{ alpha: true }}
          style={{
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Orb
            ocf={(s) => {
              setSoundRef(s);
            }}
          ></Orb>
        </Canvas>
      </div>
    </div>
  );
}

export default Home;
