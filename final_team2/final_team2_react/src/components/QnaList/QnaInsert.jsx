import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function QnaInsert(props) {
    const [inqTitle, setInqTitle] = useState('');
    const [inqContent, setInqContent] = useState('');
    const [files, setFiles] = useState([]); // 파일 상태 변경
    const userData = JSON.parse(sessionStorage.getItem("loginInfo"))
    const userId = userData.userId;
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('inqTitle', inqTitle);
        formData.append('inqContent', inqContent);

        // 파일이 선택되었을 때만 FormData에 추가
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const res = await axios.post('http://localhost:8080/qna/write', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
            alert("문의 사항이 등록되었습니다.");
            navigate('/qna');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Q&A 작성</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data"> {/* encType 속성 추가 */}
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">작성자</label>
                    <input type="text" className="form-control" id="userId" value={userId} readOnly/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inqTitle" className="form-label">제목</label>
                    <input type="text" className="form-control" id="inqTitle" value={inqTitle}
                           onChange={(e) => setInqTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inqContent" className="form-label">내용</label>
                    <textarea className="form-control" id="inqContent" rows="5" value={inqContent}
                              onChange={(e) => setInqContent(e.target.value)}></textarea>
                </div>
                {/* 파일 업로드 input */}
                <div className="mb-3">
                    <label htmlFor="files" className="form-label">파일 업로드</label>
                    <input type="file" multiple className="form-control" id="files"
                           onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}/> {/* multiple 파일 배열에 추가 */}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-dark mr-2">작성</button>
                </div>
            </form>
        </div>
    );
}

export default QnaInsert;
