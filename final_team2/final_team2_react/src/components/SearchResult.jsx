import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Header from "../layout/Header";
import Category from "../layout/Category";
import Banner from "./Home/Banner";
import ItemList from "./Home/ItemList";
import Banner2 from "./Home/Banner2";
import Footer from "../layout/Footer";
import {Col} from "react-bootstrap";

function SearchResult() {
    const { searchStr } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem('loginInfo'));
    const userLevel = userData?.userLevel;

    useEffect(() => {
        // 여기서 검색 결과를 가져오는 로직을 추가합니다.
        if (searchStr) {
            axios.get(`http://localhost:8080/search/${searchStr}`)
                .then(res => {
                    const dataList = res.data.data;
                    console.log(dataList);

                    // 검색 결과를 상태에 업데이트합니다.
                    setSearchResults(dataList);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [searchStr]);


    const underlineStyle = {
        borderBottom: '1px solid', // 원하는 굵기로 설정할 수 있습니다.
        lineHeight: '2.5', // 원하는 길이로 설정할 수 있습니다.
    };

    // 할인가, 할인율
    const calculateDiscountedPrice = (price, userLevel) => {
        let discountRate = 0;
        let discountMessage = "";

        if (!["Bronze", "Silver", "Gold", "VIP"].includes(userLevel)) {
            return { discountedPrice: price, discountMessage };
        } else {
            if (userLevel === "VIP") {
                discountRate = 0.1;
            } else if (userLevel === "Gold") {
                discountRate = 0.07;
            } else if (userLevel === "Silver") {
                discountRate = 0.05;
            } else if (userLevel === "Bronze") {
                discountRate = 0.03;
            }

            const discountedPrice = price * (1 - discountRate);
            discountMessage = `${(discountRate * 100).toFixed(0)}%`;

            return { discountedPrice, discountMessage };
        }
    };

    return (
        <div style={{height: '100px'}}>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{margin: '0 400px', position: 'sticky', top: '0px', zIndex: '1'}}>
                <Category/>
            </div>
            <div className={'container my-4 p-3'}>
                <h2 className="text-center mb-5" style={underlineStyle}>"{searchStr}" 에 대한 검색결과</h2>
                <p>총 {searchResults.length}개</p>
                <div className="row">
                    {searchResults.map(item => (
                        <Col key={item.id} md={3} sm={6} className="text-center" style={{marginBottom: '100px'}}>
                            <Link to={`/wine/${item.id}`}><img src={item.img} alt={item.name}
                                                               style={{width: '200px', height: '200px', marginBottom: '20px'}}/></Link>
                            <p>{item.name}</p>
                            <p className={`${["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) ? 'discounted-price1' : 'price'}`}>
                                <strong>{item.price.toLocaleString()}</strong>원
                            </p>
                            {["Bronze", "Silver", "Gold", "VIP"].includes(userLevel) && (
                                <p>
                                    <strong style={{color: 'green', fontSize: '20px'}}>{calculateDiscountedPrice(item.price, userLevel).discountMessage} </strong>
                                    <strong style={{fontSize: '20px'}}>{calculateDiscountedPrice(item.price, userLevel).discountedPrice.toLocaleString()}</strong>원
                                </p>
                            )}
                        </Col>
                    ))}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
        ;
}

export default SearchResult;
