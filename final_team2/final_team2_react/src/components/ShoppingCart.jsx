// import React, { useState } from "react";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ShoppingCart() {
    // 수량 상태를 관리하는 useState 훅
    const [quantity, setQuantity] = useState(1);

    // 제품 데이터를 관리하는 useState 훅
    const [productData, setProductData] = useState(null);

    // 데이터 로딩 여부를 관리하는 useState 훅
    const [loading, setLoading] = useState(true);

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되는 비동기 데이터 로딩
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Axios를 사용하여 서버에서 제품 데이터를 가져오는 비동기 요청
                const response = await axios.get("http://localhost:8080/cart");
                // 가져온 데이터를 상태에 설정
                setProductData(response.data);
            } catch (error) {
                // 에러 발생 시 콘솔에 에러 메시지 출력
                console.error("Error fetching product data:", error);
            } finally {
                // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
                setLoading(false);
            }
        };

        // 컴포넌트가 마운트될 때 한 번만 실행되도록 useEffect 안에서 비동기 함수 호출
        fetchProductData();
    }, []);

    // 수량을 증가시키는 핸들러 함수
    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // 수량을 감소시키는 핸들러 함수
    const handleDecrease = () => {
        // 수량이 1보다 큰 경우에만 수량을 감소시킴
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    // 삭제 버튼을 처리하는 핸들러 함수
    const handleDelete = () => {
        // 여기에 삭제 로직을 추가하세요 (예: 서버로 삭제 요청 등)
        console.log("Delete button clicked");
    };

    // 수량에 따라 계산된 가격을 반환하는 함수
    const calculateTotalPrice = () => {
        return productData.price * quantity;
    };

    // 화면에 렌더링되는 부분
    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>

            {/* 상품 정보를 표시하는 부분 */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="product-details">
                    <img src={productData.img} alt={productData.name} />
                    <p>Price: ${productData.price}</p>
                    <div className="quantity-container">
                        <button onClick={handleDecrease} className="btn btn-secondary">
                            -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button onClick={handleIncrease} className="btn btn-secondary">
                            +
                        </button>
                    </div>
                    {/* 삭제 버튼 추가 */}
                    <button onClick={handleDelete} className="btn btn-danger">삭제</button>

                    {/* 수량에 따라 동적으로 변경되는 가격 표시 */}
                    <p>Total Price: ${calculateTotalPrice()}</p>
                </div>
            )}

            {/* 홈 화면으로 돌아가는 Link 추가 */}
            <Link to="/" className="btn btn-primary">홈 화면으로 돌아가기</Link>
            <Link to="/purchase" className="btn btn-info">주문하기</Link>
        </div>
    );
}

// 컴포넌트를 내보냄
export default ShoppingCart;
