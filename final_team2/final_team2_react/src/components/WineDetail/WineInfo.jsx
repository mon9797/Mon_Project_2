import React, { useEffect, useState } from "react";
import "./WineInfo.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // useNavigate import 추가

function WineInfo({ wineInfo, userLevel, quantity, setQuantity, id, userIdx, reviewStats, totalPrice, setTotalPrice }) {
    const [isFilled, setIsFilled] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용


    const calculateDiscountedPrice = (price, userLevel) => {
        let discountRate = 0;
        if (!["Bronze", "Silver", "Gold", "VIP"].includes(userLevel)) {
            return price;
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
            return price * (1 - discountRate);
        }
    };

    useEffect(() => {
        // 로컬 스토리지에서 해당 아이템의 존재 여부를 확인하고 상태 업데이트
        const isWishlistItem = localStorage.getItem(`wishlist_${userIdx}_${id}`);
        setIsFilled(!!isWishlistItem);
    }, [userIdx, id]);

    const handleAddToWishlist = async () => {
        if (!userIdx) {
            const confirmLogin =
                window.confirm(
                    "로그인 후 이용가능합니다.\n로그인 하시겠습니까?"
                );
            if (confirmLogin) {
                // 현재 페이지 URL을 세션 스토리지에 저장합니다.
                sessionStorage.setItem("redirectUrl", window.location.pathname);
                navigate("/login"); // 로그인 페이지로 이동
            }
            return;
        }

        try {
            const requestData = {userIdx: userIdx, wineId: id};
            if (!isFilled) {
                await axios.post("http://localhost:8080/wishlist/add", requestData);
                // 로컬 스토리지에 해당 아이템 추가
                localStorage.setItem(`wishlist_${userIdx}_${id}`, true);
                console.log("찜목록 추가");
            } else {
                await axios.delete("http://localhost:8080/wishlist/delete", {params: requestData});
                // 로컬 스토리지에서 해당 아이템 제거
                localStorage.removeItem(`wishlist_${userIdx}_${id}`);
            }
            setIsFilled(!isFilled); // 토글 상태 업데이트
        } catch (error) {
            console.error("Error making request to wishlist:", error);
        }
    };
    const handleConfirmation = async () => {
        const userData = JSON.parse(sessionStorage.getItem('loginInfo'));
        if (!userData) {
            alert("로그인이 필요합니다.");
            // 현재 페이지 URL을 세션 스토리지에 저장합니다.
            sessionStorage.setItem("redirectUrl", window.location.pathname);
            navigate(`/login`);
            return;
        }

        const isConfirmed = window.confirm("장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?");
        if (isConfirmed) {
            navigate(`/cart`, {state: {userData, quantity}})
        }

        try {
            const requestData = {userIdx: userIdx, wineId: id, quantity: quantity};
            const response = await axios.post("http://localhost:8080/cart/add", requestData);
            if (response.data.error) {
                console.error("Error adding item to wishlist:", response.data.error);
            } else {
                navigate("/cart");
            }
        } catch (error) {
            console.error("Error making request to add item to wishlist:", error);
        }
    };

    const handleCheckout = () => {
        const userData = JSON.parse(sessionStorage.getItem('loginInfo'));

        const wineInfoWithQuantity = { ...wineInfo, quantity };

        if (!userData) {
            alert("로그인이 필요합니다.");
            // 현재 페이지 URL을 세션 스토리지에 저장합니다.
            sessionStorage.setItem("redirectUrl", window.location.pathname);
            navigate(`/login`);
            return;
        }
        else {
            navigate("/payment", {
                state: { userIdx, cartItems: [{ ...wineInfoWithQuantity }], totalPrice }
            });
        }

    };

    const calculateTotalPrice = () => {
        const discountedPrice = calculateDiscountedPrice(wineInfo.price, userLevel);
        return discountedPrice * quantity;
    };

    useEffect(() => {
        const price = calculateTotalPrice();
        setTotalPrice(price);
    }, [quantity, wineInfo, userLevel, setTotalPrice]);

    return (
        <div className="wine-details">
            <div className="wine-image col-ml-4">
                <img src={wineInfo.img} alt="와인 이미지" />
            </div>
            <div className="wine-info col-ml-6">
                <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{wineInfo.name}</span>
                    <button onClick={handleAddToWishlist}
                            className={`bi ${isFilled ? 'bi-heart-fill' : 'bi-heart'}`}></button>
                </h1>

                <div className="review-rating">
                    <span className="review-rating__result"></span>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <i key={num}
                           className={`review-rating__star ${num <= reviewStats.averageRating ? 'fas fa-star' : 'far fa-star'}`}
                        ></i>
                    ))}
                    <span> {reviewStats.averageRating} 점</span>
                </div>
                <p className={`wine-price ${["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) ? 'discounted-price' : ''}`}>
                    <strong>가격:</strong> {parseInt(wineInfo.price).toLocaleString()} 원
                </p>
                {["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) && (
                    <p className="final-price">
                        <strong>할인적용가:</strong> {parseInt(calculateDiscountedPrice(wineInfo.price, userLevel)).toLocaleString()} 원
                    </p>
                )}
                <p className="producer"><strong>생산자:</strong> {wineInfo.producer}</p>
                <p className="year"><strong>생산년도:</strong> {wineInfo.year} 년</p>
                <p className="ml"><strong>용량:</strong> {wineInfo.ml} ml</p>
                <p className="nation"><strong>국가:</strong> {wineInfo.nation}</p>
                <p className="local1"><strong>지역:</strong> {wineInfo.local1}</p>
                <p className="varieties1"><strong>품종:</strong> {wineInfo.varieties1}</p>
                <p className="wineType"><strong>종류:</strong> {wineInfo.wineType}</p>
                <p className="abv"><strong>도수:</strong> {wineInfo.abv}</p>
                <div className="quantity-controls">
                    <button
                        className="quantity-button"
                        type="button"
                        disabled={quantity === 1}
                        onClick={() => setQuantity((prev) => prev - 1)}
                    >
                        -
                    </button>
                    <label className="quantity-label" htmlFor="quantity">{quantity}</label>
                    <button
                        className="quantity-button"
                        type="button"
                        disabled={quantity >= wineInfo.stock}
                        onClick={() => setQuantity((prev) => prev + 1)}
                    >
                        +
                    </button>
                    <div style={{width: "auto"}}>
                        <p className={`totalPrice`} id={`totalPrice`}><strong>{totalPrice.toLocaleString()} 원</strong>
                        </p>
                    </div>
                </div>

                <div className="buttons-container d-flex mt-3">
                    <button type={"button"} onClick={handleConfirmation}
                            className={`btn-cartAdd btn-default btnCartAdd"`}>
                        장바구니
                    </button>
                    <button onClick={handleCheckout} className={`btn-order me-2`}>
                        주문하기
                    </button>
                </div>
            </div>

        </div>
    );
}

export default WineInfo;
