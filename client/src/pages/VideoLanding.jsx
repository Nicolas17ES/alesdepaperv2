import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/shared/Loader';
import { gsap } from 'gsap';

function VideoLanding() {
  
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  useEffect(() => {
    // This useEffect ensures that the body has no overflow to disable scrolling
    document.body.style.overflow = 'hidden';

    // Clean up to revert the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Function to handle video click
  const handleVideoClick = () => {

    navigate('/home');

  };

  // Function to handle video loaded data
  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  // If video is loaded, animate video element

  useEffect(() => {
    if(isVideoLoaded){
      gsap.from(videoRef.current, 
        { y: '-100vh', duration: 1.3, ease: 'power1.out', delay: 2.4, onComplete: () => {
          if (videoRef.current.paused) {
            videoRef.current.play();
          }
        }}, 
      );
    }
  }, [isVideoLoaded])

  // Callback function to handle animation complete
  const handleAnimationComplete = () => {

    setIsAnimationComplete(true);

  };

  return (
    <div className="video-landing-container">
      {(!isVideoLoaded || !isAnimationComplete) && <Loader onAnimationComplete={handleAnimationComplete} />}
      <video
        className="video-landing"
        src="https://storage.googleapis.com/audio_porftolio/BlackFriday.mov"
        onClick={handleVideoClick}
        onLoadedData={handleVideoLoadedData}
        ref={videoRef}
        loop
        muted
      ></video>
    </div>
  );
}

export default VideoLanding;

