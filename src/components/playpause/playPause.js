import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./playPause.css";

const PlayPause = (props) => {
  const { sound } = props;

  const path =
    "M 0 100.024 C 0 54.7229 48.2795 25.762 88.2463 47.0884 L 244 130.199 C 325.3333 173.5983 406.6667 216.9977 488 260.397 L 488 854.995 C 406.6667 898.1627 325.3333 941.3303 244 984.498 L 88.1286 1067.23 C 48.1663 1088.44 0 1059.47 0 1014.23 L 0 100.024 Z M 488 260.4 C 582.5 309.8673 677 359.3347 771.5 408.802 L 953.688 504.17 C 996.54 526.602 996.599 587.917 953.79 610.431 L 771.5 706.302 C 677 756.0013 582.5 805.7007 488 855.4 L 488 706.302 C 488 607.1353 488 507.9687 488 408.802 L 488 260.4 Z";

  const [toggle, setToggle] = useState(false);

  const style = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: toggle ? 0 : 1,
    },
    config: { duration: 200 },
  });

  useEffect(() => {
    if (toggle) sound.play();
    else sound.pause();
  }, [toggle]);

  return (
    <animated.div className="play-pause" style={style}>
      <svg
        width="83"
        height="87"
        viewBox="0 0 1000 1250"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <path d={path} fill="black" />
      </svg>
    </animated.div>
  );
};

export default PlayPause;
