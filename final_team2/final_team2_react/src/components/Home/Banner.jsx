import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import d from '../../img/구독.png'
import s from '../../img/배송.png'
import f from '../../img/화이트와인.png'
import {Link} from "react-router-dom";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 자동 슬라이드 간격(ms)
    };

    return (
        <Slider {...settings}>
            <div>
                <Link to={'/membership'}><img src={d} style={{width: '100%', height: "400px"}}></img></Link>
            </div>
            <div>
                <Link to={'/mypage'}><img src={s} style={{width: '100%', height: "400px"}}></img></Link>
            </div>
            <div>
                <Link to={'/white'}><img src={f} style={{width: '100%', height: "400px"}}></img></Link>
            </div>
        </Slider>
    );
};

export default Banner;
