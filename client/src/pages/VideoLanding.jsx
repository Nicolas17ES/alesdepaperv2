import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function VideoLanding() {

  const navigate = useNavigate();
  
  useEffect(() => {
    // This useEffect ensures that the body has no overflow to disable scrolling
    document.body.style.overflow = 'hidden';

    // Clean up to revert the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Function to toggle video play and pause on click
  const handleVideoClick = () => {
    navigate('/home')
  };

  return (
    <div className="video-landing-container">
      <video
        className="video-landing"
        src="https://storage.googleapis.com/audio_porftolio/BlackFriday.mov"
        onClick={handleVideoClick}
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
}

export default VideoLanding;
