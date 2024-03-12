import React, {useState, useEffect} from "react";
import axios from "axios";
import ReviewWrite from "./ReviewWrite";
import "./Review.css";
import {useNavigate} from "react-router-dom";

function Review({id, onReviewStatsChange}) {
    const [reviews, setReviews] = useState([]);
    const [showReviewWrite, setShowReviewWrite] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부 상태
    const [userLevel, setUserLevel] = useState();
    const navigate = useNavigate();
    const pageSize = 5;


    useEffect(() => {
        fetchReviews();
    }, [id, page]);

    const getUserLevel = () => {
        const session = JSON.parse(sessionStorage.getItem('loginInfo'));
        return session && session.userLevel;
    }
    useEffect(() => {
        setUserLevel(getUserLevel);
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reviews/wine/${id}?page=${page}&pageSize=${pageSize}`);
            setReviews(response.data.reviews);
            setTotalPages(response.data.totalPages);
            calculateReviewStats(response.data.reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const calculateReviewStats = (reviews) => {
        let totalRating = 0;
        let reviewCount = reviews.length;

        for (let review of reviews) {
            totalRating += review.revRating;
        }
        const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(2) : reviewCount;
        // 와인 디테일 컴포넌트로 리뷰의 별점 총합과 리뷰 개수 전달
        onReviewStatsChange({totalRating, reviewCount, averageRating});
    };


    // 리뷰삭제
    const handleDeleteReview = async (revIdx) => {
        try {
            await axios.delete(`http://localhost:8080/reviews/delete/${revIdx}`);
            // 삭제가 성공하면 모달을 닫기
            handleCloseModal();
            console.log("리뷰 삭제")
            // 리뷰 목록을 다시 불러와 화면 갱신
            fetchReviews();

        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };


    const handleReviewSubmit = () => {
        fetchReviews();
        setShowReviewWrite(false);
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleReviewClick = async (review) => {
        console.log("리뷰 클릭")
        setSelectedReview(review);
        setShowModal(true); // 모달 창 열기
        try {
            await axios.put(`http://localhost:8080/reviews/reviewCnt/${review.revIdx}`, null, {
                params: {
                    revIdx: review.revIdx
                }
            });

            // 리뷰 조회수 증가 요청 성공 시, 해당 리뷰의 조회수 갱신
            setReviews(prevReviews => prevReviews.map(prevReview => prevReview.revIdx === review.revIdx ? {
                ...prevReview,
                revCnt: prevReview.revCnt + 1
            } : prevReview));
        } catch (error) {
            console.error("Error increasing views:", error);
        }

    };
    const handleWriteReview = () => {
        const session = JSON.parse(sessionStorage.getItem('loginInfo'));
        if (session && session.userLevel) {
            setShowReviewWrite(true);
        } else {
            alert("로그인 후 이용 바랍니다.");
            navigate("/login")

        }
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        setShowModal(false); // 모달 창 닫기
    };

    return (
        <div className="review-container">
            <hr/>
            {reviews.map((review, index) => (
                <div key={index} className="review-item container d-flex"
                     onClick={() => handleReviewClick(review)}> {/* 인덱스를 key로 사용 */}
                    <div className={`container d`}>
                        {/*별점*/}
                        <div className="review-rating">
                            <span className="review-rating__result"></span>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <i key={num}
                                   className={`review-rating__star ${num <= review.revRating ? 'fas fa-star' : 'far fa-star'}`}
                                ></i>
                            ))}
                        </div>
                        <p className={`review-user`}>
                            <strong>{review.userDto ? `${review.userDto.userId}` : "Unknown User"}</strong>
                            <span> {review.userDto.userLevel} </span></p>

                        <h2 className="review-title">{review.revTitle}</h2>

                        <p className="review-content">{review.revContent.length > 200 ? `${review.revContent.slice(0, 300)}...` : review.revContent}</p>

                        <p className="review-count"
                           style={{display: "flex", justifyContent: "end"}}>조회수: {review.revCnt}</p>
                    </div>

                    {/*이미지 미리보기*/}
                    <div className={`review-img`}><img
                        src={`http://localhost:8080/uploads/${review.sfile}`} style={{width: 100, height: 100}}
                        onError={(e) => e.target.style.display = "none"}
                    />
                    </div>
                    <div>
                        {userLevel == `Admin` && (
                            <button className={`btn-delete bi bi-trash3-fill`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteReview(review.revIdx)
                                    }}></button>)}</div>
                </div>
            ))}
            <div className="review-actions">
                <button className="review-Write-btn bi bi-pencil-square" type="button" onClick={handleWriteReview}>
                    리뷰 쓰기
                </button>
                {showReviewWrite && <ReviewWrite id={id} onReviewSubmit={handleReviewSubmit} fetchReviews={fetchReviews}
                                                 closeModal={() => setShowReviewWrite(false)}/>}

            </div>
            <div className="pagination">
                <button
                    className={`pagination-button ${page === 1 ? 'disabled' : ''}`}
                    onClick={goToPreviousPage}
                    disabled={page === 1}
                >
                    이전
                </button>
                <span className="pagination-page">페이지: {page}</span>
                <button
                    className={`pagination-button ${page === totalPages ? 'disabled' : ''}`}
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                >
                    다음
                </button>
            </div>

            {/*리뷰 상세 내용 모달창*/}
            {selectedReview && showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedReview.revTitle}</h2>
                        <p>작성자: {selectedReview.userDto ? selectedReview.userDto.userId : "Unknown User"}</p>
                        <div className="modal-rating">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <i key={num}
                                   className={`modal-rating__star ${num <= selectedReview.revRating ? 'fas fa-star' : 'far fa-star'}`}
                                ></i>
                            ))}
                            <span> {selectedReview.revRating} 점</span>
                        </div>

                        <p style={{textWrap: "wrap", padding: 20}}> {selectedReview.revContent}</p>

                        <img src={`http://localhost:8080/uploads/${selectedReview.sfile}`}
                             style={{maxWidth: 700, maxHeight: 700, padding: 20}}
                             onError={(e) => e.target.style.display = `none`} alt=""/>

                        {/*<p style={{display:"flex"}}>조회수: {selectedReview.revCnt}</p>*/}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Review;