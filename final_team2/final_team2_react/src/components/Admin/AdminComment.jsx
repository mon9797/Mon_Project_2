import { useState } from "react";
import axios from 'axios';

function AdminComment({ inqIdx, inqContent, inqComments, sfile }) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [clickedImageSrc, setClickedImageSrc] = useState('');
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [answerText, setAnswerText] = useState('');
    const [userList ,setUserList] = useState([]);

    const openImageModal = (src) => {
        setIsImageModalOpen(true);
        setClickedImageSrc(src);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setClickedImageSrc('');
    };

    const openAnswerModal = () => {
        setIsAnswerModalOpen(true);
    };

    const closeAnswerModal = () => {
        setIsAnswerModalOpen(false);
    };

    function InsertComment() {
        axios.post('http://localhost:8080/qnaComment', { inqIdx: inqIdx, inqComments: answerText })
            .then(res => {
                const dataList = res.data.data;
                setUserList(dataList);
                alert('등록되었습니다.')
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            {/* inqContent를 출력 */}
            <tr>
                <td colSpan="6" style={{backgroundColor: 'white'}}>
                    <table style={{width: '100%'}}>
                        <colgroup>
                            <col style={{width: '10%'}}/>
                            {/* 이미지 */}
                            <col style={{width: '50%'}}/>
                            {/* 내용 */}
                            <col style={{width: '40%'}}/>
                            {/* 작성자 */}
                        </colgroup>
                        <tbody>
                        <tr style={{textAlign: 'center', height: '200px'}}>
                            <td><strong>문의</strong></td>
                            <td>
                                {sfile ? ( // 이미지 파일이 있는 경우
                                    <img
                                        src={`http://localhost:8080/uploads/${sfile}`}
                                        alt=""
                                        style={{maxWidth: '200px', maxHeight: '200px', cursor: 'pointer'}}
                                        onClick={() => openImageModal(`http://localhost:8080/uploads/${sfile}`)}
                                    />
                                ) : ( // 이미지 파일이 없는 경우
                                    <span
                                        style={{paddingLeft: '20px', textAlign: 'left'}}>등록된 이미지 없음</span>
                                )}
                            </td>
                            <td style={{textAlign: 'left', paddingRight: '50px'}}>{inqContent}</td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colSpan="6" style={{backgroundColor: '#f2f2f2'}}>
                    <table style={{width: '100%'}}>
                        <colgroup>
                            <col style={{width: '10%'}}/>
                            {/* 작성자 */}
                            <col style={{width: '80%'}}/>
                            {/* 등록일자 */}
                            <col style={{width: '10%'}}/>
                            {/* 버튼 */}
                        </colgroup>
                        <tbody>
                        <tr style={{textAlign: 'center', height: '200px'}}>
                            <td style={{color: "red"}}><strong>답변</strong></td>
                            {inqComments ? (
                                <td style={{textAlign: 'left'}}>{inqComments}</td>
                            ) : (
                                <td style={{textAlign: 'center'}}>
                                    <button className="btn btn-dark btn-sm" onClick={openAnswerModal}>답변 등록</button>
                                </td>
                            )}
                            <td><strong>관리자</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            {isAnswerModalOpen && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><strong>답변 등록</strong></h5>
                                <button type="button" className="btn-close" aria-label="Close"
                                        onClick={closeAnswerModal}></button>
                            </div>
                            <div className="modal-body">
                                {/* 내용 입력 부분 */}
                                <textarea className="form-control" rows="5" placeholder="답변을 입력하세요..."
                                          value={answerText}
                                          onChange={(e) => setAnswerText(e.target.value)}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={closeAnswerModal}>닫기</button>
                                <button type="button" className="btn btn-dark" onClick={InsertComment}>등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isImageModalOpen && (
                <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" aria-label="Close"
                                        onClick={closeImageModal}></button>
                            </div>
                            <div className="modal-body">
                                <img src={clickedImageSrc} alt="Attached File"
                                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminComment;