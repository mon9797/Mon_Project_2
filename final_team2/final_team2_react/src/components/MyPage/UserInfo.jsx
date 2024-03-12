import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 추가된 부분
import vip from "../../img/vip.png"
import gold from "../../img/gold.png"
import silver from "../../img/silver.png"
import bronze from "../../img/bronze.png"

const Container = styled.div`
    //background-color: #f8f9fa;
    padding: 20px;
    //border-radius: 10px;
    //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfoBox = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
 `;

const UserInfoItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* 가운데 정렬을 위해 추가 */
    padding: 30px 0; /* 내부 여백 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    background-color: #fff; /* 배경색을 흰색으로 설정합니다. */
    height: 150px; /* 고정된 높이 적용 */
`;

const UserName = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0;
    margin-left: 10px;
`;

const UserLevel = styled.p`
    font-size: 16px;
    color: #ffffff;
    margin: 0;
    font-weight: bold;
    display: flex; /* 추가된 부분 */
    align-items: center; /* 추가된 부분 */
    flex-direction: column; /* 추가된 부분 */
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000000;
    font-size: 16px;
    display: flex;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

function UserInfo(props) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    // const [reviewListCount, setReviewListCount] = useState(props.reviewsCount);
    // const [inquiriesCount, setInquiriesCount] = useState(props.inquiriesCount);

    // useEffect(() => {
    //     setReviewListCount(props.reviewsCount)
    //     setInquiriesCount(props.inquiriesCount)
    // })

    const handleNameClick = () => {
        props.setSelectedComponent("orderHistory");
    };

    const handleInquiriesClick = () => {
        // 문의내역을 클릭했을 때 MyPage 컴포넌트의 상태 변경
        props.setSelectedComponent("myInquiries");
    };

    const handleReviewsClick = () => {
        props.setSelectedComponent("myReviews");
    };

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem(`loginInfo`));
        if (!session) {
            alert("로그인이 필요합니다.");
            // 현재 페이지 URL을 세션 스토리지에 저장합니다.
            sessionStorage.setItem("redirectUrl", "/");
            // 로그인 정보가 없으면 로그인 화면으로 이동합니다.
            navigate(`/login`);
            return;
        } else {
            // 사용자 정보를 세션에서 가져와 상태에 설정합니다.
            setUserInfo(session);
        }
    }, [props.history]); // 한 번만 실행됩니다.

    if (!userInfo) {
        // 로그인 정보가 없을 때는 아무것도 렌더링하지 않습니다.
        return null;
    }

    // userLevel에 따른 이미지 경로 설정
    let levelImage;
    switch (userInfo.userLevel) {
        case "VIP":
            levelImage = vip;
            break;
        case "Gold":
            levelImage = gold;
            break;
        case "Silver":
            levelImage = silver;
            break;
        case "Bronze":
            levelImage = bronze;
            break;
        default:
            levelImage = null;
    }


    return (
        <Container className="row">
            {userInfo && (
                <UserInfoBox>
                    <UserInfoItem className="col-6 justify-content-start p-lg-4">
                        <StyledLink to={"/mypage"} style={{textDecoration: 'none', marginLeft: '30px'}}>
                            <AccountCircleIcon fontSize="large" />
                            <UserName onClick={handleNameClick} style={{paddingTop: '5px'}}>{userInfo.userName}님 반갑습니다</UserName>
                        </StyledLink>
                        {/*<UserName style={{background: "#6C1B2F", color: 'white'}}>정보수정</UserName>*/}
                    </UserInfoItem>
                    <UserInfoItem className="col-2" style={{backgroundColor: '#6C1B2F'}}>
                        {/*<img src={levelImage} style={{width: '100px', height: '100px'}}></img>*/}
                        <UserLevel>
                            <FavoriteIcon style={{color: 'white', fontSize: '50px', marginBottom: '10px'}} />
                            {userInfo.userLevel}
                        </UserLevel>
                    </UserInfoItem>
                    <UserInfoItem className="col-2">
                        <p onClick={handleInquiriesClick}>문의내역</p>
                    </UserInfoItem>
                    <UserInfoItem className="col-2">
                        <p onClick={handleReviewsClick}>리뷰</p>
                    </UserInfoItem>
                </UserInfoBox>
            )}
        </Container>
    );
}

export default UserInfo;