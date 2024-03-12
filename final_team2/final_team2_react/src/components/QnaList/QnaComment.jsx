import {useState} from "react";

function QnaComment({ inqContent, inqComments, sfile }) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [clickedImageSrc, setClickedImageSrc] = useState('');

    const openImageModal = (src) => {
        setIsImageModalOpen(true);
        setClickedImageSrc(src);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setClickedImageSrc('');
    };
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
                        <tr style={{textAlign: 'center', height: '150px'}}>
                            <td><strong>문의</strong></td>
                            <td>
                                <strong>
                                    {sfile ? ( // 이미지 파일이 있는 경우
                                        <img
                                            src={`http://localhost:8080/uploads/${sfile}`}
                                            alt=""
                                            style={{maxWidth: '200px', maxHeight: '200px', cursor: 'pointer'}}
                                            onClick={() => openImageModal(`http://localhost:8080/uploads/${sfile}`)}
                                        />
                                    ) : ( // 이미지 파일이 없는 경우
                                        <span
                                            style={{paddingLeft: '20px', textAlign: 'left'}}><strong>-</strong></span>
                                    )}
                                </strong>
                            </td>
                            <td style={{textAlign: 'left', paddingRight:'50px'}}>{inqContent}</td>

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
                        <tr style={{textAlign: 'center', height: 'auto'}}>
                            <td style={{color: "red"}}><strong>답변</strong></td>
                            <td style={{textAlign: 'left'}}>{inqComments}</td>
                            <td><strong>관리자</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            {isImageModalOpen && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeImageModal}></button>
                            </div>
                            <div className="modal-body">
                                <img src={clickedImageSrc} alt="Attached File" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default QnaComment;