import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Footer from "../../layout/Footer";

const Payment = () => {
    const location = useLocation();

    // 이전 페이지에서 전달한 state 객체를 완전히 구조 분해
    const { userIdx, wineInfo, cartItems, totalPrice} = location.state || {};
    const [sidebarTop, setSidebarTop] = useState(460); // 초기 top 값

    // wineInfo가 있는지 여부에 따라 데이터를 가져오는 부분
    const itemsData = wineInfo ? [wineInfo] : cartItems || [];

    const wineIds = itemsData.map((item) => item.id);
    const quantities = itemsData.map((item) => item.quantity);

    const session = JSON.parse(sessionStorage.getItem(`loginInfo`))
    const userLevel = session && session.userLevel;

    const underlineStyle = {
        borderTop: '1px solid', // 원하는 굵기로 설정할 수 있습니다.
        lineHeight: '2.5', // 원하는 길이로 설정할 수 있습니다.
    };

    const navigate = useNavigate();

    const renderMembershipMessage = () => {
        if (userLevel === "Regular") {
            return <p><strong>멤버쉽</strong> 가입 시 추가 할인</p>;
        } else if (userLevel === "Bronze") {
            return <p><strong>Silver</strong> 등급 업그레이드 시 추가 할인</p>;
        } else if (userLevel === "Silver") {
            return <p><strong>Gold</strong> 등급 업그레이드 시 추가 할인</p>;
        } else if (userLevel === "Gold") {
            return <p><strong>Vip</strong> 등급 업그레이드 시 추가 할인</p>;
        } else {
            return <p><strong>최대 할인</strong> 적용 중</p>;
        }
    };

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    console.log("Wine IDs:", wineIds);
    console.log("Quantities:", quantities);
    console.log("wineInfo:", itemsData);
    console.log("userlevel", userLevel)

    const handleScroll = () => {
        // 스크롤 위치에 따라 top 값을 조절
        const currentScrollPos = window.pageYOffset;
        const offset = 460; // 상단으로부터의 간격
        setSidebarTop(offset - currentScrollPos);
    };

    // 페이지 컴포넌트가 처음 렌더링될 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const requestPay = () => {
        const { IMP } = window;
        IMP.init("imp32702525");

        // 주문 데이터 생성
        const orderData = {
            userIdx,
            cartItems: itemsData.map((item) => ({
                id: item.id,
                quantity: item.quantity,
            })),
            totalPrice,
        };

        console.log("Order data:", orderData);

        orderData.cartItems.forEach((item, index) => {
            const { id, quantity } = item;

            IMP.request_pay(
                {
                    pg: "kakaopay",
                    pay_method: "card",
                    merchant_uid: new Date().getTime() + index,
                    name: "그대와, 人",
                    amount: totalPrice,
                    buyer_email: "test@naver.com",
                    buyer_name: "코드쿡",
                    buyer_tel: "010-1234-5678",
                    buyer_addr: "서울특별시",
                    buyer_postcode: "123-456",
                },
                async (rsp) => {
                    try {
                        const requestData = {
                            cartItems: orderData.cartItems,
                            userIdx,
                            id,
                            hisQuantity: quantity,
                            totalPrice,
                        };

                        // 결제 검증 요청
                        const { data } = await axios.post(
                            `http://localhost:8080/verifyIamport/${rsp.imp_uid}`,
                            requestData
                        );

                        console.log("Server Response:", data); // 서버 응답 확인

                        if (rsp.paid_amount === data.response.amount) {
                            console.log(data);
                            alert("결제 성공");
                            navigate('/');
                        } else {
                            alert("결제 실패");
                        }
                    } catch (error) {
                        console.error("Error while verifying payment:", error);
                        alert("결제 실패");
                    }
                }
            );
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
            <div>
                <Sidebar
                    style={{
                        top: sidebarTop + 'px' // top 값을 상태에 따라 동적으로 변경
                    }}
                    requestPay={requestPay}
                    itemsData={itemsData}
                    totalPrice={totalPrice}
                    wineInfo={wineInfo}
                    userLevel={userLevel}
                />
                <div className="container"
                     style={{minHeight: 'calc(100vh - 180px)', marginLeft: '390px', overflow: 'auto'}}>
                    <div style={{width: '800px'}}>
                        <h4><strong style={{color: '#333333'}}>주문/결제</strong></h4>
                        <hr className="my-4"/>
                        <form style={{marginBottom: '40px'}}>
                            <div style={{border: '1px solid #cccccc'}}>
                                <div style={{background: '#6C1B2F', height: '50px', color: 'white'}}>
                                    <p style={{paddingTop: '13px', paddingLeft: '20px', color: 'white'}}><strong>바로
                                        픽업</strong></p>
                                </div>
                                <div style={{
                                    background: '#F5F5F5',
                                    marginTop: '15px',
                                    marginRight: '15px',
                                    marginLeft: '15px',
                                    height: '40px',
                                    borderRadius: '5px',
                                    marginBottom: '10px'
                                    , color: '#333333'
                                }}>
                                    <p style={{
                                        paddingTop: '10px',
                                        paddingLeft: '15px',
                                        fontSize: '13px',
                                        color: '#666666'
                                    }}>무료배송</p>
                                </div>
                                <div className="order-item-box">
                                    <ul className="list-group cart-list" data-dlv-cd="1600" data-delivery-state="normal"
                                        data-n-dlv-price="3000">
                                        {itemsData.map((item, index) => (
                                            <li className="list-group-item" style={{
                                                borderLeft: 'none',
                                                borderRight: 'none',
                                                borderTop: 'none',
                                                color: '#333333'
                                            }} key={index}>
                                                <div className="prd-info-area ">
                                                    <input type="hidden" className="vProductCd" value={item.id}/>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <img
                                                                src={item.img}
                                                                alt="상품이미지"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="card-title" style={{
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis',
                                                                fontSize: '18px'
                                                            }}>
                                                                {item.name}
                                                            </p>
                                                            <p className="card-text"
                                                               style={{color: '#6C1B2F'}}>{item.wineType}</p>
                                                            <ul className="list-inline price-item">
                                                                <li className="list-inline-item">
                                                                    <span className="num">{item.price.toLocaleString()}
                                                                        <span style={{fontSize: '12px'}}>원</span></span>
                                                                </li>
                                                                <li className="list-inline-item"
                                                                    style={{fontSize: '14px'}}>
                                                                    ·
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <span className="num">{item.quantity}<span
                                                                        style={{fontSize: '12px'}}>개</span></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="col-md-4 d-flex align-items-center justify-content-end">
                                                            <span className="num"><strong
                                                                style={{fontSize: '18px'}}>{(item.price * item.quantity).toLocaleString()}</strong><span
                                                                style={{fontSize: '14px'}}>원</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </form>

                        <hr className="my-4"/>

                        <div style={{background: '#444444', height: '50px', color: 'white', marginTop: '40px'}}>
                            <Link to="/membership" style={{textDecoration: 'none', color: 'white'}}>
                                <p style={{textAlign: 'center', paddingTop: '12px'}}>
                                    {renderMembershipMessage()}
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Payment;