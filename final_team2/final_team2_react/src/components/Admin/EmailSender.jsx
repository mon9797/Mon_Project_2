import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./EmailSender.css";
const EmailSender = () => {
    const [userList, setUserList] = useState([]);
    const [userLevel, setUserLevel] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        // 사용자 목록을 가져오는 요청
        axios.get('http://localhost:8080/user')
            .then(res => {
                const dataList = res.data.data;
                setUserList(dataList);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // 이메일 발송 요청을 처리하는 함수
    const handleSendEmail = () => {
        // 필수 입력 필드가 모두 입력되었는지 확인
        if (!userLevel || !subject || !body) {
            alert('모든 필드를 입력하세요.');
            return;
        }

        // 이메일 발송 요청 데이터
        const requestData = {
            userLevel: userLevel,
            subject: subject,
            body: body
        };

        // 이메일 발송 요청
        axios.post('http://localhost:8080/send', requestData)
            .then(() => {
                alert('이메일이 성공적으로 발송되었습니다.');
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert('이메일 발송 중 오류가 발생했습니다.');
            });
    };

    return (
        <div className={`emailContainer`}>
            <label>
                사용자 레벨 선택:
                <select onChange={(e) => setUserLevel(e.target.value)}>
                    <option value="">사용자 레벨을 선택하세요</option>
                    {/* 사용자 목록을 옵션으로 표시 */}
                    {userList.map(item => (
                        <option key={item.userIdx} value={item.userLevel}>{item.userLevel}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                제목:
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>
            <br />
            <label>
                내용:
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <br />
            {/* 이메일 발송 버튼 */}
            <button onClick={handleSendEmail}>발송</button>
        </div>
    );
};

export default EmailSender;