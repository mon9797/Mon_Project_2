import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from "./SearchBar";
import "./Header.css";
import {GoPerson} from "react-icons/go";
import {IoCartOutline} from "react-icons/io5";
import logo from "../img/logo.png"
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import Divider from "@mui/material/Divider";
// import DirectionsIcon from "@mui/icons-material/Directions";
// import Paper from "@mui/material/Paper";

const HeaderContainer = styled.header`
    color: darkcyan;
    background-color: transparent;
`;

const Header_line1 = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    color: #676767;
    margin-top: 10px;
    font-size: 13px;
`;

const Header_line2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: transparent;
    margin-top: 20px;
    margin-bottom: 50px;

    /* 각 요소의 스타일 조정 예시 */

    & .item1 {
        margin-right: 10px; /* 로고 오른쪽 여백 추가 */
    }

    & .item2 {
        flex: 1; /* SearchBar가 남은 공간을 모두 차지하도록 설정 */
        margin: 0 10px; /* 좌우 여백 추가 */
    }

    & .me-2 {
        margin-right: 20px; /* 마이페이지 링크 오른쪽 여백 추가 */
    }
`;

const Logo = styled(Link)`
    color: #282c34;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
`;

const Header = () => {
    const session = JSON.parse(sessionStorage.getItem(`loginInfo`))
    const userId = session && session.userId;
    const userIdx = session && session.userIdx;
    const userName = session && session.userName;
    const userLevel = session && session.userLevel;
    const navigate = useNavigate();
    let dynamicClass;

    switch (userLevel) {
        case 'VIP':
            dynamicClass = 'VIP';
            break;
        case 'Gold':
            dynamicClass = 'Gold';
            break;
        case 'Silver':
            dynamicClass = 'Silver';
            break;
        case 'Bronze':
            dynamicClass = 'Bronze';
            break;
        case 'Regular':
            dynamicClass = 'Regular';
            break;
        default:
            dynamicClass = 'Admin'; // 기본 클래스
            break;
    }


    const handleLogout = () => {
        const storedLoginInfo = sessionStorage.getItem('loginInfo');
        // 여기서 서버에 로그아웃 요청을 보낼 수도 있음
        if (storedLoginInfo) {
            // 사용자 정보가 있는 경우에만 삭제
            sessionStorage.removeItem('loginInfo');
        }
        // 예: axios.post('/user/logout');
        window.location.reload(); // 페이지 새로고침
        navigate("/")

    };

    const renderHeaderLine1 = () => {
        if (userIdx === 1) {
            return (
                <>
                    <p className={`me-2 ${dynamicClass}`} style={{paddingTop: '1px'}}>{userLevel}</p>
                    <p className={`me-2`} style={{paddingTop: '1px'}}><strong>{userName}</strong>님 반갑습니다</p>
                    <span style={{marginRight: '8px', color: '#676767'}}>|</span>
                    <Link onClick={handleLogout} className={'me-2 no-underline'} style={{paddingTop: '1px'}}>로그아웃</Link>
                    <span style={{marginRight: '8px'}}>|</span>
                    <Link to={"/admin"} className={'no-underline'} style={{paddingTop: '1px'}}>관리자페이지</Link>
                </>
            );
        } else if (userId) {
            return (
                <>
                    <p className={`me-2 ${dynamicClass}`} style={{paddingTop: '1px'}}>{userLevel}</p>
                    <p className={`me-2`} style={{paddingTop: '1px'}}><strong>{userName}</strong>님 반갑습니다</p>
                    <span style={{marginRight: '8px', color: '#676767'}}>|</span>
                    <Link onClick={handleLogout} className={'me-2 no-underline'} style={{paddingTop: '1px'}}>로그아웃</Link>
                    <span style={{marginRight: '8px'}}>|</span>
                    <Link to={"/qna"} className={'no-underline'} style={{paddingTop: '1px'}}>문의사항</Link>
                </>
            );
        } else {
            return (
                <>
                    <Link to={"/login"} className={'me-2 no-underline'} style={{paddingTop: '1px'}}>로그인</Link>
                    <span style={{marginRight: '8px'}}>|</span>
                    <Link to={"/signUp"} className={'me-2 no-underline'} style={{paddingTop: '1px'}}>회원가입</Link>
                    <span style={{marginRight: '8px'}}>|</span>
                    <Link to={"/qna"} className={'no-underline'} style={{paddingTop: '1px'}}>문의사항</Link>
                </>
            );
        }
    };

    return (
        <HeaderContainer>
            <Header_line1>
                {renderHeaderLine1()}
            </Header_line1>
            <Header_line2>
                <Link to={"/"} className={'item1'}><img src={logo}
                                                        style={{width: '250px', height: "180px"}}></img></Link>
                <SearchBar className={'item2'}/>
                <p style={{display: 'flex', justifyContent: 'flex-end', width: '200px'}}>
                    <Link to="/mypage" className={'me-2'}
                          style={{fontSize: '35px', color: '#131313'}}><GoPerson/></Link>
                    <Link to="/cart" style={{fontSize: '35px', color: '#131313'}}><IoCartOutline/></Link>
                </p>
            </Header_line2>

            {/*<Paper*/}
            {/*    component="form"*/}
            {/*    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}*/}
            {/*>*/}
            {/*    <IconButton sx={{ p: '10px' }} aria-label="menu">*/}
            {/*        <MenuIcon />*/}
            {/*    </IconButton>*/}
            {/*    <InputBase*/}
            {/*        sx={{ ml: 1, flex: 1 }}*/}
            {/*        placeholder="Search Google Maps"*/}
            {/*        inputProps={{ 'aria-label': 'search google maps' }}*/}
            {/*    />*/}
            {/*    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">*/}
            {/*        <SearchIcon />*/}
            {/*    </IconButton>*/}
            {/*    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />*/}
            {/*    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">*/}
            {/*        <DirectionsIcon />*/}
            {/*    </IconButton>*/}
            {/*</Paper>*/}
        </HeaderContainer>
    );
};

export default Header;