import React, {useState} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import WineList from "../components/WineList/WineList";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillRocket } from "react-icons/ai";

const HeaderContainer = styled.header`
    color: #131313;
    background-color: transparent;
`;

const Header_line3 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 20px 10px 10px;
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownContent = styled.div`
    //display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const DropdownItem = styled(Link)`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
        background-color: #cecece;
    }
`;

const Links = styled(Link)`
    text-decoration: none;
    color: #131313;
`;


function Category(props) {


    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);

    const handleCategoryHover = () => {
        setShowDropdown(!showDropdown);
    };

    const handleMenuLeave = () => {
        setShowDropdown(false);
    };

    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
        window.location.reload(); // 새로고침
    };

    return (
        <HeaderContainer>
            <Header_line3>
                <DropdownContainer onMouseLeave={handleMenuLeave}>
                    <p onMouseOver={handleCategoryHover}>
                        <MenuIcon style={{marginRight: '5px', paddingBottom: '5px'}}/>
                        국가별
                    </p>
                    {showDropdown && (
                        <DropdownContent>
                            <DropdownItem to="/Chile" onClick={() => handleCategoryClick('Chile')}>칠레</DropdownItem>
                            <DropdownItem to="/France" onClick={() => handleCategoryClick('France')}>프랑스</DropdownItem>
                            <DropdownItem to="/Italy" onClick={() => handleCategoryClick('Italy')}>이탈리아</DropdownItem>
                            <DropdownItem to="/U.S.A" onClick={() => handleCategoryClick('U.S.A')}>미국</DropdownItem>
                            <DropdownItem to="/Spain" onClick={() => handleCategoryClick('Spain')}>스페인</DropdownItem>
                            <DropdownItem to="/Australia" onClick={() => handleCategoryClick('Australia')}>호주</DropdownItem>
                        </DropdownContent>
                    )}
                </DropdownContainer>

                <p>
                    <Links to={"/Red"} onClick={() => handleCategoryClick('Red')}
                          style={{marginRight: '70px'}}>레드와인</Links>
                    <Links to={"/White"} onClick={() => handleCategoryClick('White')}
                          style={{marginRight: '70px'}}>화이트와인</Links>
                    <Links to={"/Sparkling"} onClick={() => handleCategoryClick('Sparkling')}
                          style={{marginRight: '70px'}}>스파클링와인</Links>
                    <Links to={"/Rose"} onClick={() => handleCategoryClick('Rose')}
                          style={{marginRight: '70px'}}>로즈와인</Links>
                    <Links to={"/Fortified"} onClick={() => handleCategoryClick('Fortified')}>포트와인</Links>
                </p>
                <p>
                    <AiFillRocket style={{marginRight: '5px', fontSize: '20px'}} />
                    <Links to={"/Membership"} onClick={() => handleCategoryClick('Membership')}>멤버쉽</Links>
                </p>
            </Header_line3>
        </HeaderContainer>
    );
}

export default Category;