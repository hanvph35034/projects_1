import React from 'react';
import { Carousel, Image } from 'antd';
import bannerImage from '../assets/images/banner/banner-01.jpg';
import bannerImage2 from '../assets/images/banner/banner-02.jpg';
import bannerImage3 from '../assets/images/banner/banner-03.jpg';
import bannerImage4 from '../assets/images/banner/banner-04.jpg';
import bannerImage5 from '../assets/images/banner/banner-05.png';

const Banner = () => {
  return (
    <>
    <br />
   <Carousel autoplay>
      <div>
        <img src={bannerImage} alt="Banner 1" className="carousel-image" />
      </div>
      <div>
        <img src={bannerImage2} alt="Banner 2" className="carousel-image" />
      </div>
      <div>
        <img src={bannerImage3} alt="Banner 3" className="carousel-image" />
      </div>
      <div>
        <img src={bannerImage4} alt="Banner 4" className="carousel-image" />
      </div>
      <div>
        <img src={bannerImage5} alt="Banner 5" className="carousel-image" />
      </div>
    </Carousel>
    <br />
  </>
  )
}

export default Banner