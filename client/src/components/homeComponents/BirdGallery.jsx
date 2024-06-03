import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import BirdImage from '../../assets/birdGallery.png';
import BirdImage2 from '../../assets/birdGallery.png';
import BirdImage3 from '../../assets/birdGallery.png';
import ContinueShopping from '../shared/ContinueShopping'

function BirdGallery() {
  const swiperRef = useRef(null);

  return (
    <div className="home-right-container">
      <ContinueShopping/>
      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <SwiperSlide>
            <img src={BirdImage} alt="Bird 1" className="bird-gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={BirdImage2} alt="Bird 2" className="bird-gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={BirdImage3} alt="Bird 3" className="bird-gallery-image" />
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-prev" onClick={() => swiperRef.current.swipePrev()}>←</div>
        <div className="swiper-button-next" onClick={() => swiperRef.current.swipeNext()}>→</div>
      </div>
    </div>
  );
}

export default BirdGallery;
