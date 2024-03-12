import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";
import Favorites from "./Favorites";
import Footer from "../../layout/Footer";
import Pagination from "react-js-pagination";

const underlineStyle = {
    borderBottom: '1px solid', // 원하는 굵기로 설정할 수 있습니다.
    lineHeight: '2.5', // 원하는 길이로 설정할 수 있습니다.
};

function MyInquiries(props) {
    const session = JSON.parse(sessionStorage.getItem(`loginInfo`));
    const userId = session && session.userId;

    const [inquiriesList, setInquiriesList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/qna/${userId}`)
            .then(res => {
                const dataList = res.data.data;
                console.log(dataList);
                setInquiriesList(dataList);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div style={underlineStyle}>나의 문의 내역</div>
            <div style={{ marginTop: '20px' }}>
                {inquiriesList.map((inquiry, index) => (
                    <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        {inquiry.sfile && <img src={`http://localhost:8080/uploads/${inquiry.sfile}`} alt="" style={{ width: '100px', height: '100px', marginRight: '20px' }} />}
                        <div>
                            <p style={{ fontWeight: 'bold' }}>제목: {inquiry.inqTitle}</p>
                            <p>내용: {inquiry.inqContent}</p>
                            <p>날짜: {inquiry.inqCreateDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyInquiries;
