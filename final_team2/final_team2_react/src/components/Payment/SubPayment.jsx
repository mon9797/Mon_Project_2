import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

const SubPayment = ({ level, amount }) => {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        iamport.onload = () => setLoading(false);

        const storedSession = sessionStorage.getItem("loginInfo");
        if (storedSession) {
            const session = JSON.parse(storedSession);
            setUserId(session.userId);
        }

        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const requestSubscription = () => {
        if (!userId) {
            console.error("사용자 정보를 가져올 수 없습니다.");
            alert("로그인이 필요합니다.");
            // 현재 페이지 URL을 세션 스토리지에 저장합니다.
            sessionStorage.setItem("redirectUrl", "/");
            // 로그인 정보가 없으면 로그인 화면으로 이동합니다.
            navigate(`/login`);
            return;
        }

        if (loading) {
            console.error("IMP 객체가 아직 초기화되지 않았습니다.");
            return;
        }

        const { IMP } = window;
        IMP.init('imp32702525');

        IMP.request_pay({
            pg: 'kakaopay.TCSUBSCRIP',
            pay_method: 'card',
            merchant_uid: new Date().getTime(),
            name: '테스트 상품 정기결제',
            amount: amount, // 전달받은 amount 값을 사용
            customer_uid: userId,
            buyer_email: 'test@naver.com',
            buyer_name: '코드쿡',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시',
            buyer_postcode: '123-456',
            level: level // Membership 컴포넌트로부터 받은 레벨 정보 사용
        }, async (rsp) => {
            try {
                const { data } = await axios.post(`http://localhost:8080/verifySubIamport/${rsp.imp_uid}/${userId}/${level}`); // level 정보도 함께 전달
                navigate("/");
            } catch (error) {
                console.error('결제 검증 중 오류 발생:', error);
            }
        });
    };

    return (
        <div>
            <Button
                variant="contained"
                sx={{backgroundColor: '#FF6001',
                    color: 'white',
                    fontSize:'18px',
                    '&:hover': {
                        backgroundColor: '#FF6001',
                    },
                    paddingTop:'12px',
                    borderRadius: '20px',
                    width: '220px',
                    height: '50px'
                }}
                onClick={requestSubscription}
            >
                정기결제 신청하기
            </Button>
        </div>
    );
};

export default SubPayment;