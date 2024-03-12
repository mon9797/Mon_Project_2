import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./ItemListSlider.css"

const ItemListSlider = ({ items, userLevel }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    // 할인가, 할인율
    const calculateDiscountedPrice = (price, userLevel) => {
        let discountRate = 0;
        let discountMessage = "";

        if (!["Bronze", "Silver", "Gold", "VIP"].includes(userLevel)) {
            return { discountedPrice: price, discountMessage };
        } else {
            if (userLevel === "VIP") {
                discountRate = 0.1;
            } else if (userLevel === "Gold") {
                discountRate = 0.07;
            } else if (userLevel === "Silver") {
                discountRate = 0.05;
            } else if (userLevel === "Bronze") {
                discountRate = 0.03;
            }

            const discountedPrice = price * (1 - discountRate);
            discountMessage = `${(discountRate * 100).toFixed(0)}%`;

            return { discountedPrice, discountMessage };
        }
    };

    return (
        <Slider {...settings}>
            {items.map(item => (
                <div key={item.id} style={{ margin: '0 10px', boxSizing: 'border-box' }}>
                    <div style={{ border: '1px solid #ccc', borderRadius: '10px 10px 0 0', padding: '20px', width: '270px' }}>
                        <Link to={`/wine/${item.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <img src={item.img} alt={item.name} style={{ width: '200px', height: '200px' }} />
                        </Link>
                        <div style={{borderTop: '1px solid #ccc'}}>
                            <p style={{
                                marginTop: '10px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{item.name}</p>
                            {/*<p><strong style={{fontSize: '20px'}}>{item.price}</strong>원</p>*/}
                            <p className={`${["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) ? 'discounted-price1' : 'price'}`}>
                                <strong>{item.price.toLocaleString()}</strong>원
                            </p>
                            {["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) && (
                                <p>
                                    <strong style={{color: 'green', fontSize: '20px'}}>{calculateDiscountedPrice(item.price, userLevel).discountMessage} </strong>
                                    <strong style={{fontSize: '20px'}}>{calculateDiscountedPrice(item.price, userLevel).discountedPrice.toLocaleString()}</strong>원
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>


    );
};

// 다음 화살표 컴포넌트
const SampleNextArrow = (props) => {
    const {onClick} = props;
    return <div onClick={onClick} style={{
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translate(100%, -50%)'
    }}>
        <ArrowForwardIosIcon/>
    </div>
};

// 이전 화살표 컴포넌트
const SamplePrevArrow = (props) => {
    const {onClick} = props;
    return <div onClick={onClick} style={{
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translate(-4610%, -50%)'
    }}>
        <ArrowBackIosNewIcon/>
    </div>
};

export default ItemListSlider;
