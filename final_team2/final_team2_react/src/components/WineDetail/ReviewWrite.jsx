import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ReviewWrite.css";
import Header from "../../layout/Header";

function ReviewWrite({ id, onReviewSubmit, fetchReviews, closeModal }) {
    const userData = JSON.parse(sessionStorage.getItem("loginInfo"))
    const userIdx = userData.userIdx;
    const [revTitle, setRevTitle] = useState('');
    const [revContent, setRevContent] = useState('');
    const [files, setFiles] = useState([]);
    const [rating, setRating] = useState(0);






    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append(`userIdx`,userIdx);
        formData.append('revTitle', revTitle);
        formData.append('revContent', revContent);
        formData.append('revRating', rating);

        console.log(rating)
        // 파일이 선택되었을 때만 FormData에 추가
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const res = await axios.post('http://localhost:8080/reviews/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            onReviewSubmit(); // 부모 컴포넌트에게 리뷰가 제출되었음을 알리
            closeModal(); // 모달 닫기
            fetchReviews();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="container">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2 className="my-4">리뷰 작성</h2>
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="revTitle" className="form-label">제목</label>
                            <input type="text" className="form-control" id="revTitle" value={revTitle}
                                   onChange={(e) => setRevTitle(e.target.value)}/>
                        </div>
                        <div className="rating">
                            <span className="rating__result">{rating}/5</span>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <i key={num}
                                   className={`rating__star ${num <= rating ? 'fas fa-star' : 'far fa-star'}`}
                                   onClick={() => setRating(num)}
                                ></i>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="revContent" className="form-label">내용</label>
                            <textarea className="form-control" id="revContent" rows="5" value={revContent}
                                      onChange={(e) => setRevContent(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="files" className="form-label">파일 업로드</label>
                            <input type="file" multiple className="form-control" id="files"
                                   onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}/>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-dark mr-2">작성</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewWrite;
