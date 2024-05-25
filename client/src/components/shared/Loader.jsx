import React, { useEffect, useRef, useContext } from 'react';
import BirdTest from '../../assets/birdtest.png';
import { gsap } from 'gsap';
import GlobalContext from "../../context/GlobalContext";

function Loader({onAnimationComplete}) {
  const { dispatch } = useContext(GlobalContext);
  const planeRef = useRef(null);
  const planeRef2 = useRef(null);

 useEffect(() => {
    const tl = gsap.timeline();

    tl.to(planeRef.current, {
      duration: 3,
      x: '130vw',
      y: '75vh',
      rotate: 10,
      ease: 'power1.inOut',
      onComplete: onAnimationComplete
    })

    return () => {
      tl.kill();
    };
  }, [onAnimationComplete]);
  

 useEffect(() => {
    const tl = gsap.timeline();

    tl.to(planeRef2.current, {
        delay: .5,
        duration: 3.2,
        x: '-130vw',
        y: '55vh',
        rotate: 205,
        ease: 'power1.inOut'
    })

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="loader-container">
      <img
        src={BirdTest}
        alt="paper plane loader"
        className="loader-image"
        ref={planeRef}
      />
      <img
        src={BirdTest}
        alt="paper plane loader"
        className="loader-image2"
        ref={planeRef2}
      />
    </div>
  );
}

export default Loader;
