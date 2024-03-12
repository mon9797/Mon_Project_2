// Footer.js

import React from 'react';
import styled from 'styled-components';
import "./Footer.css";

// const FooterContainer = styled.footer`
//     background-color: #333;
//     color: white;
//     padding: 1rem;
//     text-align: center;
//     position: fixed;
//     bottom: 0;
//     width: 100%;
// `;

// {/*         <FooterContainer> */}
// {/*             <p>&copy; 2024 Your Company. All rights reserved.</p> */}
// {/*         </FooterContainer> */}

const Footer = () => {
    return (
        <div class="footer-info">
            <strong class="footer-logo"><span>그대와인</span></strong>
            <div class="colum-info">
                <h5 class="blind">회사 정보</h5>
                <ul class="footer-biz-info">
                    <li><span class="company-name">(주)fullstack501</span></li>
                    <li>대표 : 구소룡</li>
                    <li>주소 : 부산광역시 부산진구 중앙대로 708</li>
                    <li>개인정보보호책임자 : 곽석철</li>
                </ul>
                <p class="copyright">Copyright©그대와인 All rights reserved.</p>
            </div>
            <div class="colum-info">
                <ul class="customer-info">
                    <li class="cscenter">고객센터 <em class="footer-tel">051-753-5600</em></li>
                    <li>FAX. 051-753-5600</li>
                    <li>E-mail. fullstack501@gmail.com</li>
                </ul>


            </div>
        </div>
    );
};

export default Footer;