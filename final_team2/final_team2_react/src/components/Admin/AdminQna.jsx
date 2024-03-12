import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminComment from "./AdminComment";


function AdminQna(props) {
    const [qnaList, setQnaList] = useState([]);
    const [expandedIdx, setExpandedIdx] = useState(null); // 확장된 아이템의 인덱스를 저장하는 상태
    const [showModal, setShowModal] = useState(false); // 모달의 표시 여부를 관리하는 상태

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/qnaList')
            .then(res => {
                const dataList = res.data.data;
                setQnaList(dataList.map(item => ({ ...item, showComments: false })));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleTitleClick = (index) => {
        // 제목을 클릭하여 내용을 펼치거나 접는 함수
        setExpandedIdx(index);
        setQnaList(prevList => prevList.map((item, idx) => ({
            ...item,
            showComments: idx === index ? !item.showComments : false
        })));
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={'container my-4 p-3'}>
            <table className={'table table-hover'}>
                <colgroup>
                    <col style={{width: '10%'}}/>
                    {/* 번호 */}
                    <col style={{width: '35%'}}/>
                    {/* 제목 */}
                    <col style={{width: '20%'}}/>
                    {/* 작성자 */}
                    <col style={{width: '15%'}}/>
                    {/* 등록일자 */}
                    <col style={{width: '20%'}}/>
                    {/* 답변여부 */}
                </colgroup>
                <thead>
                <tr style={{textAlign: 'center'}}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>등록일자</th>
                    <th>답변여부</th>
                </tr>
                </thead>
                <tbody>
                {qnaList.map((item, index) => (
                    <React.Fragment key={item.inqIdx}>
                        <tr style={{textAlign: 'center'}}>
                            <td style={{paddingTop:'17px'}}>{item.inqIdx}</td>
                            <td style={{paddingTop:'17px'}}>{item.inqTitle}</td>
                            <td style={{paddingTop:'17px'}}>{item.userId}</td>
                            <td style={{paddingTop:'17px'}}>{item.inqCreateDate}</td>
                            {/* 이전에는 <td>에 직접 이벤트를 부여했지만, 이를 버튼으로 변경하여 클릭 이벤트를 부여합니다 */}
                            <td style={{ color: "red" }}>
                                <strong>
                                    <button className={'btn btn-link'} onClick={() => handleTitleClick(index)} style={{textDecoration: 'none', color:'red'}}>
                                        {item.inqComments ? '완료' : '미완료'}
                                    </button>
                                </strong>
                            </td>
                        </tr>
                        {/* 클릭한 경우에만 <QnaComment> 컴포넌트를 렌더링합니다 */}
                        {item.showComments && (
                            <AdminComment
                                inqIdx={item.inqIdx} // inqIdx 값을 전달합니다
                                inqContent={item.inqContent}
                                inqComments={item.inqComments}
                                sfile={item.sfile}
                            />
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminQna;