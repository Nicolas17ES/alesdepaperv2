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
    console.log('x:', x, ' && ', 'y: ', y)

    // Calculate the difference between the current position and the top-left corner of the screen
    const deltaX = -x; // Move left
    const deltaY = -y; // Move up

    console.log('delatX:', deltaX, ' && ', 'delatY: ', deltaY)

    // Animate the bird to the top-left corner of the screen
    gsap.to(birdRef.current, {
      x: deltaX + 150,
      y: deltaY + 50,
      duration: 1.5,
      delay: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        const { x: xFinal, y: yFinal } = birdRef.current.getBoundingClientRect();
        const deltaX = xFinal + x - 150 ; // Move left
        const deltaY = y; // Move up

        birdRef.current.style.position = 'fixed';
        birdRef.current.style.left = `${deltaX}px`;
        birdRef.current.style.top = `${deltaY}px`;
      }
      
    });

    // Animate all other birds to move in a random unique direction
    const otherBirds = document.querySelectorAll(`.single-bird-container:not(#bird-${bird.id})`);
    const usedDirections = new Set();

    otherBirds.forEach((otherBird) => {
      let direction;
      do {
        direction = getRandomDirection();
      } while (usedDirections.has(`${direction.x},${direction.y}`));
      usedDirections.add(`${direction.x},${direction.y}`);

      gsap.to(otherBird, {
        x: `+=${direction.x}`,
        y: `+=${direction.y}`,
        duration: 4,
        ease: 'power1.inOut',
        onComplete: () => {
          otherBird.style.display = 'none';
          onDisplayBirdsData(); // Call the function after hiding the bird
        }
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
