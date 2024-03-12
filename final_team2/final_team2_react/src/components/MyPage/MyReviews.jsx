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

const reviewContainerStyle = {
    marginTop: '20px',
};

const reviewItemStyle = {
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',  // 세로 방향으로 가운데 정렬
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const reviewImageStyle = {
    width: '100%',
    maxWidth: '400px',
    marginRight: '20px',  // 사진과 텍스트 사이 간격 조절
    borderRadius: '5px',
};

const revCntStyle = {
    marginLeft: 'auto',  // 왼쪽 여백을 최대화하여 오른쪽으로 이동
    marginTop: '10px',
    marginRight: '10px'
};

function MyReviews(props) {
    const session = JSON.parse(sessionStorage.getItem(`loginInfo`));
    const userIdx = session && session.userIdx;

    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/reviews/${userIdx}`)
            .then(res => {
                const dataList = res.data.data;
                console.log(dataList);
                setReviewList(dataList);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // 리뷰삭제
    const handleDeleteReview = async (revIdx) => {
        try {
            await axios.delete(`http://localhost:8080/reviews/delete/${revIdx}`);
            console.log("리뷰 삭제")
            window.location.reload();
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div>
            <div style={underlineStyle}>내가 쓴 리뷰</div>
            <div style={reviewContainerStyle}>
                {reviewList.map((review, index) => (
                    <div key={index} style={reviewItemStyle}>
                        {review.sfile && <img src={`http://localhost:8080/uploads/${review.sfile}`} alt=""
                                              style={reviewImageStyle}/>}
                        <div>
                            <p style={{
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                margin: '10px 0'
                            }}>제목: {review.revTitle}</p>
                            <p>내용: {review.revContent}</p>
                        </div>
                        <p style={revCntStyle}>조회수: {review.revCnt}</p>
                        <button className={`btn-delete bi bi-trash3-fill`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteReview(review.revIdx)
                                }}></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyReviews;
