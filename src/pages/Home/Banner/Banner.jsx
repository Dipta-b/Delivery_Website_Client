import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImgOne from "../../../assets/banner/banner1.png";
import bannerImgTwo from "../../../assets/banner/banner2.png";
import bannerImgThree from "../../../assets/banner/banner3.png";
const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} interval={3000}>
            <div>
                <img src={bannerImgOne} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={bannerImgTwo} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={bannerImgThree} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    )
}

export default Banner