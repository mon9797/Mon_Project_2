import React, { useEffect, useState } from 'react';
import axios from "axios";

function UserList(props) {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/user')
            .then(res => {
                const dataList = res.data.data;
                setUserList(dataList);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleClick = (userIdx) => {
        // 확인 창 표시
        const confirmMessage = "정말로 회원을 탈퇴하시겠습니까?";
        if (window.confirm(confirmMessage)) {
            // '예'를 선택한 경우에만 회원 탈퇴 요청 보내기
            axios.put(`http://localhost:8080/user/${userIdx}/delete`)
                .then(res => {
                    // 회원 탈퇴 성공 시 메시지 표시 등의 작업 수행
                    alert("회원이 탈퇴되었습니다.");
                    console.log("회원 탈퇴가 성공적으로 처리되었습니다.");
                    // 사용자 목록 다시 불러오기
                    axios.get('http://localhost:8080/user')
                        .then(res => {
                            const dataList = res.data.data;
                            setUserList(dataList);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    // 회원 탈퇴 실패 시 에러 처리
                    console.error("회원 탈퇴에 실패했습니다:", err);
                });
        }
    };

    const handleClickLevel = (userId, newUserLevel) => {
        // 확인 창 표시
        const confirmMessage = `사용자의 등급을 ${newUserLevel}로 변경하시겠습니까?`;
        if (window.confirm(confirmMessage)) {
            // '예'를 선택한 경우에만 서버에 등급 변경 요청 보내기
            axios.put(`http://localhost:8080/user/${userId}/update-level`, { userLevel: newUserLevel })
                .then(res => {
                    alert('사용자 등급이 업데이트되었습니다.');
                    // 사용자 목록 다시 불러오기
                    axios.get('http://localhost:8080/user')
                        .then(res => {
                            const dataList = res.data.data;
                            setUserList(dataList);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.error("사용자 등급 업데이트 실패:", err);
                });
        }
    };

    return (
        <div className={'container my-4 p-1'}>
            <div className="user-list-container">
                <table className={'table table-hover'}>
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '15%' }} />
                    </colgroup>
                    <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th>번호</th>
                        <th>ID</th>
                        <th>이름</th>
                        <th>등급</th>
                        <th>주소</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                    {userList.map(item => {
                        return (
                            <tr key={item.userIdx}>
                                <td style={{paddingTop: '17px'}}>{item.userIdx}</td>
                                <td style={{paddingTop: '17px'}}>{item.userId}</td>
                                <td style={{paddingTop: '17px'}}>{item.userName}</td>
                                <td>
                                    <select
                                        value={item.userLevel}
                                        onChange={(e) => handleClickLevel(item.userId, e.target.value)}
                                        disabled={item.userLevel === 'Admin'}
                                    >
                                        <option value="Regular">Regular</option>
                                        <option value="Bronze">Bronze</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td style={{paddingTop: '17px'}}>{item.userAddress}</td>
                                <td style={{color: 'red'}}>
                                    {item.userLevel === 'Admin' ? (
                                        <button className="btn btn-link"
                                                style={{textDecoration: 'none', color: 'red'}}>관리자</button>
                                    ) : (
                                        <button onClick={() => handleClick(item.userIdx)} className="btn btn-link"
                                                style={{textDecoration: 'none', color: 'red'}}>
                                            탈퇴
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
