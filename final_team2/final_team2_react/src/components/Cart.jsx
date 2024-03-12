import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Header from "../layout/Header";
import Category from "../layout/Category";
import Footer from "../layout/Footer";

const Cart = () => {
    const navigate = useNavigate();
    // const [userIdx, setUserIdx] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    // 로그인부분
    const { id } = useParams();
    const userData = JSON.parse(sessionStorage.getItem("loginInfo"));
    const userIdx = userData?.userIdx;
    const userLevel = userData?.userLevel;
    const [selectAll, setSelectAll] = useState(false);
    const [prevSelectAll, setPrevSelectAll] = useState(false);

    useEffect(() => {
        viewCart();
        // const pollingInterval = setInterval(() => {
        //     viewCart();
        // }, 1000);

        // return () => clearInterval(pollingInterval);
    }, [userIdx]);

    // 장바구니 정보 가져오기
    const viewCart = () => {
        axios.get(`http://localhost:8080/cart/view?userIdx=${userIdx}`)
            .then(response => {
                setCartItems(prevCartItems => response.data.cartItems);
                calculateTotalPrice(response.data.cartItems);

                console.log(response.data);
            })
            .catch(error => {
                console.error('장바구니 정보를 가져오는 도중 오류 발생:', error);
            });
    };

    // 체크박스 토글
    const toggleCheckbox = (wineId) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map((item) => {
                if (item.wineInfo.id === wineId) {
                    return {
                        ...item,
                        isChecked: !item.isChecked,
                    };
                }
                return item;
            });
            calculateTotalPrice(updatedCartItems);
            return updatedCartItems;
        });
    };

    // 전체선택
    const toggleSelectAll = () => {
        setSelectAll((prevSelectAll) => {
            const newSelectAll = !prevSelectAll;
            setCartItems((prevCartItems) => {
                const updatedCartItems = prevCartItems.map((item) => ({
                    ...item,
                    isChecked: newSelectAll,
                }));
                calculateTotalPrice(updatedCartItems);
                return updatedCartItems;
            });
            return newSelectAll;
        });
    };

// 총 가격 계산을 체크된 상품만으로 변경
    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            // 체크된 상품만 계산에 포함
            if (item.isChecked) {
                const discountedPrice = calculateDiscountedPrice(item.wineInfo.price, userLevel);
                total += discountedPrice * item.cartQuantity;
            }
        });
        setTotalPrice(total);
    };
    // 할인율 적용 함수 (can be reused from WineInfo component)
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



    // 장바구니 수량 업데이트
    const updateCartItemQuantity = (wineId, newQuantity) => {
        const payload = {
            useeId: wineId,
            newrIdx: userIdx, // Make sure userIdx is correctly set here
            winQuantity: newQuantity,
        };

        console.log('Update Cart Item Payload:', payload);

        axios.put(`http://localhost:8080/cart/updateQuantity`, payload)
            .then(response => {
                console.log('수량 업데이트 성공:', response.data);
            })
            .catch(error => {
                console.error('수량 업데이트 중 오류 발생:', error);
                console.log('Full Error Object:', error);

                // Additional logging for response details
                if (error.response) {
                    console.log('Response Data:', error.response.data);
                    console.log('Response Status:', error.response.status);
                    console.log('Response Headers:', error.response.headers);
                }
            });
    };

    // 수량 증가
    const incrementQuantity = (wineId, index) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[index] = {
                ...updatedCartItems[index],
                cartQuantity: updatedCartItems[index].cartQuantity + 1,
            };
            calculateTotalPrice(updatedCartItems);
            updateCartItemQuantity(wineId, updatedCartItems[index].cartQuantity, userIdx); // Pass userIdx here
            return updatedCartItems;
        });
    };

    // 삭제
    const deleteItems = (wineId, selectedWineIds, deleteAll) => {
        axios.delete(`http://localhost:8080/cart/delete`, {
            params: { userIdx: userIdx, wineId: wineId, deleteAll: deleteAll },
            data: selectedWineIds
        })
            .then(response => {
                setCartItems(response.data.cartItems);
                calculateTotalPrice(response.data.cartItems.filter(item => item.isChecked));
            })
        // .catch(handleApiError);
    };

    const deleteCartItem = (wineId) => {
        deleteItems(wineId, null, false);
    };

    const deleteSelectedItems = () => {
        const selectedItems = cartItems.filter(item => item.isChecked);
        const selectedWineIds = selectedItems.map(item => item.wineInfo.id);
        deleteItems(null, selectedWineIds, false);
    };

    const deleteAllItems = () => {
        deleteItems(null, null, true);
    };

    // 수량 감소
    const decrementQuantity = (wineId, index) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[index] = {
                ...updatedCartItems[index],
                cartQuantity: Math.max(
                    updatedCartItems[index].cartQuantity - 1,
                    1
                )
            };
            calculateTotalPrice(updatedCartItems);
            updateCartItemQuantity(wineId, updatedCartItems[index].cartQuantity);
            return updatedCartItems;
        });
    };

    // 홈으로 이동
    const handleGoHome = () => {
        window.location.href = "/";
    };

// 주문 페이지로 이동
    const handleCheckout = () => {
        // 선택된 항목들만 가져오기
        const selectedItems = cartItems.filter((cartItem) => cartItem.isChecked);

        // 선택된 항목들에 대한 정보만 처리
        const processedItems = selectedItems.map((cartItem) => {
            const wineInfoWithQuantity = {
                ...cartItem.wineInfo,
                quantity: cartItem.cartQuantity,
            };

            console.log('Processing item:', wineInfoWithQuantity);

            return wineInfoWithQuantity;
        });

        const orderData = {
            userIdx,
            cartItems: processedItems,
            totalPrice,
            quantity: processedItems.map((item) => item.quantity),
        };

        console.log('Order data:', orderData);

        navigate('/payment', {
            state: orderData,
        });
    };

    return (
        <div>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{
                margin: '0 400px',
                position: 'sticky',
                top: '-1px',
                zIndex: '1',
                backgroundColor: 'white',
                borderBottom: '1px solid'
            }}>
                <Category/>
            </div>
            <div className="container mt-5" style={{minWidth: '940px', overflowX: 'auto'}}>
                <h3 className="mb-4">장바구니</h3>
                <hr/>
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center ms-2">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            style={{transform: 'scale(1.5)', marginRight: '5px', marginLeft: '3px'}}
                        />
                        <span style={{marginLeft: '5px'}}>전체선택</span>
                    </div>

                    <div className="d-flex">
                        <button
                            className="btn btn-danger me-2"
                            onClick={deleteAllItems}
                            style={{
                                backgroundColor: '#d9534f',
                                borderColor: '#d9534f',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '8px 16px',
                                fontSize: '16px',
                            }}
                        >
                            전체삭제
                        </button>
                        <button
                            className="btn btn-warning ml-2"
                            onClick={deleteSelectedItems}
                            style={{
                                backgroundColor: '#f0ad4e',
                                borderColor: '#f0ad4e',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '8px 16px',
                                fontSize: '16px',
                            }}
                        >
                            선택삭제
                        </button>
                    </div>
                </div>
                {cartItems.map((cartItem, index, array) => (
                    <div key={`${cartItem.id}-${index}`} className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-1 d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={cartItem.isChecked || false}
                                    onChange={() => toggleCheckbox(cartItem.wineInfo.id)}
                                    style={{marginLeft: '50px', transform: 'scale(1.5)'}}
                                />
                            </div>
                            <div className="col-md-3">
                                <img
                                    src={cartItem.wineInfo.img}
                                    className="card-img"
                                    alt={cartItem.wineInfo.name}
                                    style={{
                                        width: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'contain',
                                        marginLeft: '-20px'
                                    }}
                                />
                            </div>
                            <div className="col-md-9 " style={{marginTop: '60px', marginLeft: '-100px'}}>
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <div className="card-title-wrapper ms-3" style={{width: '200px'}}>
                                        <h5 className="card-title" title={cartItem.wineInfo.name}>
                                            {cartItem.wineInfo.name.length <= 17
                                                ? cartItem.wineInfo.name
                                                : `${cartItem.wineInfo.name.slice(0, 17)}${cartItem.wineInfo.name.length > 17 ? '' : '\n'}`
                                            }
                                        </h5>
                                        {cartItem.wineInfo.name.length > 17 &&
                                            <h5 className="card-title" title={cartItem.wineInfo.name}>
                                                {cartItem.wineInfo.name.length > 17 ? `${cartItem.wineInfo.name.slice(17, 31)}${cartItem.wineInfo.name.length > 31 ? '...' : ''}` : ''}
                                            </h5>
                                        }
                                    </div>
                                    <div className="mb-3" style={{marginLeft: '-20px'}}>
                                        <p className="card-text" style={{
                                            marginBottom: '0px',
                                            textDecoration: calculateDiscountedPrice(cartItem.wineInfo.price, userLevel) !== cartItem.wineInfo.price ? 'line-through' : 'none',
                                            color: calculateDiscountedPrice(cartItem.wineInfo.price, userLevel) !== cartItem.wineInfo.price ? 'red' : 'inherit'
                                        }}>
                                            {cartItem.wineInfo.price}원
                                        </p>
                                        {calculateDiscountedPrice(cartItem.wineInfo.price, userLevel) !== cartItem.wineInfo.price ? (
                                            <p className="card-text">할인적용가
                                                : {calculateDiscountedPrice(cartItem.wineInfo.price, userLevel)}원</p>
                                        ) : null}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-success-sm ml-1 mb-2"
                                                onClick={() => incrementQuantity(cartItem.wineInfo.id, index)}>+
                                        </button>
                                        <span className={'mb-2'}>{cartItem.cartQuantity}</span>
                                        <button className="btn btn-danger-sm ml-1 mb-2"
                                                onClick={() => decrementQuantity(cartItem.wineInfo.id, index)}>-
                                        </button>
                                    </div>
                                    <p className="card-text mt-2">합계: {calculateDiscountedPrice(cartItem.wineInfo.price, userLevel) * cartItem.cartQuantity}원</p>
                                    <button
                                        className="btn me-2 mb-2"
                                        style={{backgroundColor: '#f2f2f2', borderColor: '#f2f2f2', color: '#333'}}
                                        onClick={() => {
                                            deleteCartItem(cartItem.wineInfo.id);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-3 text-center">총 가격: {totalPrice}원</div>
                <div className="d-flex justify-content-sm-center m-4">
                    <button
                        className="btn me-3 flex-fill"
                        style={{backgroundColor: '#ffd700', borderColor: '#ffd700', color: 'white'}}
                        onClick={handleGoHome}
                    >
                        쇼핑 계속하기
                    </button>
                    <button
                        className="btn flex-fill"
                        style={{backgroundColor: '#922b22', borderColor: '#922b22', color: 'white'}}
                        onClick={handleCheckout}
                    >
                        주문하기
                    </button>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Cart;
