  import BirdDescriptionImage from '../../assets/birdDescription.png'

function BirdDescription() {

    return (
        <section className="bird-description-container">
            <img src={BirdDescriptionImage} alt="" className="bird-description-image"/>
        </section>
    );
}

export default BirdDescription;