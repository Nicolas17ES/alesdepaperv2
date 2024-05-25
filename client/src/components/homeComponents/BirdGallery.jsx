 import BirdImage from '../../assets/birdGallery.png'

function BirdGallery() {

    return (
        <div className="bird-gallery-container">
            <img src={BirdImage} alt="" className="bird-gallery-image"/>
        </div>
    );
}

export default BirdGallery;