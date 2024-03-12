import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QnaComment from "./QnaComment";
import QnaInsert from "./QnaInsert";
import Header from "../../layout/Header";
import Category from "../../layout/Category"; // QnaInsert 컴포넌트를 import

function QnaList(props) {
    const [qnaList, setQnaList] = useState([]);
    const [expandedIdx, setExpandedIdx] = useState(null); // 확장된 아이템의 인덱스를 저장하는 상태
    const [showModal, setShowModal] = useState(false); // 모달의 표시 여부를 관리하는 상태

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/qna/')
            .then(res => {
                const dataList = res.data.data;
                setQnaList(dataList);
                console.log(dataList);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleTitleClick = (index) => {
        // 제목을 클릭하여 내용을 펼치거나 접는 함수
        if (index === expandedIdx) {
            setExpandedIdx(null); // 이미 확장된 상태면 닫기
        } else {
            setExpandedIdx(index); // 확장되지 않은 상태면 해당 아이템의 인덱스 저장
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
            <div className={'container my-4 p-3'}>
                <table className={'table table-hover'}>
                    <colgroup>
                        <col style={{width: '10%'}}/>
                        {/* 번호 */}
                        <col style={{width: '15%'}}/>
                        {/* 답변여부 */}
                        <col style={{width: '35%'}}/>
                        {/* 제목 */}
                        <col style={{width: '20%'}}/>
                        {/* 작성자 */}
                        <col style={{width: '15%'}}/>
                        {/* 등록일자 */}
                        <col style={{width: '5%'}}/>
                    </colgroup>
                    <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>번호</th>
                        <th>답변여부</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일자</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {qnaList.map((item, index) => (
                        <React.Fragment key={item.inqIdx}>
                            <tr style={{textAlign: 'center'}}>
                                <td>{item.inqIdx}</td>
                                <td style={{color: "red"}}><strong>{item.inqComments ? '완료' : '미완료'}</strong></td>
                                <td>{item.inqTitle}</td>
                                <td>{item.userId}</td>
                                <td>{item.inqCreateDate}</td>
                                {item.inqComments ? (
                                    <td onClick={() => handleTitleClick(index)}>
                                        {expandedIdx === index ? '▲' : '▼'}
                                    </td>
                                ) : (
                                    <td><strong>-</strong></td>
                                )}
                            </tr>
                            {expandedIdx === index &&
                                <QnaComment inqContent={item.inqContent} inqComments={item.inqComments}
                                            sfile={item.sfile}/>
                            }
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                <div className={'my-3 d-flex justify-content-end'}>
                    <p>타 쇼핑몰 언급, 거래 글, 분쟁 유발, 허위 사실 유포는 금지됩니다.</p>
                </div>
                <div className={'my-3 d-flex justify-content-end'}>
                    {/* 모달로 작성하기 버튼 구현 */}
                    <button onClick={openModal} className={'btn btn-dark'}>작성하기</button>
                </div>

                {/* 모달 */}
                {showModal &&
                    <div className="modal" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Q&A</h5>
                                    <button type="button" className="btn-close" aria-label="Close"
                                            onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    {/* QnaInsert 컴포넌트를 모달 내부에 렌더링 */}
                                    <QnaInsert/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}

export default QnaList;