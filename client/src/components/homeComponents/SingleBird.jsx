import BirdTest from '../../assets/birdtest.png';
import { useContext, useRef } from "react";
import GlobalContext from "../../context/GlobalContext";
import { fetchSingleBird } from '../../context/GlobalAction';
import { gsap } from 'gsap';

function SingleBird({ bird, onDisplayBirdsData }) {
  const { dispatch } = useContext(GlobalContext);
  const birdRef = useRef(null);

  function getRandomSymbol() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function getRandomDirection() {
    const randomSymbolX = getRandomSymbol();
    const randomSymbolY = getRandomSymbol();
    return {
      x: randomSymbolX * (Math.random() * 1500 + 500), // Random distance between 500 and 1500
      y: randomSymbolY * (Math.random() * 1500 + 500)  // Random distance between 500 and 1500
    };
  }

  const openBirdData = () => {
    // Fetch bird data if needed
    fetchSingleBird(dispatch, bird.id);

    // Get the current position of the bird
    const { x, y } = birdRef.current.getBoundingClientRect();

    // Calculate the difference between the current position and the top-left corner of the screen
    const deltaX = -x; // Move left
    const deltaY = -y; // Move up

    // Animate the bird to the top-left corner of the screen
    gsap.to(birdRef.current, {
      x: deltaX + 150,
      y: deltaY + 50,
      duration: 1.5,
      scale: 1.2,
      delay: 1,
      ease: 'power1.inOut',
    });

    // Animate all other birds to move in a random unique direction
    const otherBirds = document.querySelectorAll(`.single-bird-container:not(#bird-${bird.id})`);
    otherBirds.forEach((otherBird) => {
      const { x, y } = getRandomDirection();

      gsap.to(otherBird, {
        x: `+=${x}`,
        y: `+=${y}`,
        duration: 4,
        ease: 'power1.inOut',
        onComplete: onDisplayBirdsData,
      });
    });
  };

  return (
    <div id={`bird-${bird.id}`} onClick={openBirdData} className="single-bird-container">
      <img src={BirdTest} alt="paper plane" className="bird-image" ref={birdRef} />
    </div>
  );
}

export default SingleBird;
