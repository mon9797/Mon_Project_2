import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm2.css";
import Footer from "../../layout/Footer"; // CSS 파일 임포트

const LoginForm2 = () => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/login",
                { userId, userPassword }
            );

            const sessionData = response.data;
            sessionStorage.setItem(`loginInfo`, JSON.stringify(sessionData));

            const storedSession = sessionStorage.getItem(`loginInfo`);
            if (storedSession){
                const session = JSON.parse(storedSession);
                const userId = session.userId;
                alert(`${userId} 님 반갑습니다.`)
            }

            console.log(response.data);
            navigate("/");
        } catch (error) {
            console.error("Error logging in:", error);
            // 로그인 실패 처리
        }
    };

    return (
        <div style={{position: "relative"}}>
            <div className="d-flex justify-content-center align-items-center"
                 style={{minHeight: "calc(100vh - 150px)"}}>
                <div className="login-form-container">
                    <h2 className="login-form-title">로그인</h2>
                    <input
                        className="login-form-input"
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input
                        className="login-form-input"
                        type="password"
                        placeholder="비밀번호"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <button className="login-form-button" type="button" onClick={handleLogin} style={{marginBottom: '10px'}}>로그인</button>
                    <button className="login-form-button" type="button" onClick={handleLogin}>회원가입</button>
                        {/*<a href="/signUp" className="btn btn-primary btn-lg"><span>회원가입</span></a>*/}
                </div>
            </div>

            <Footer/>
        </div>


    );
};

export default LoginForm2;
