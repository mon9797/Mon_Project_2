import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

function WineLists(props) {
    const { wineType } = useParams();
    const [wineLists, setWineLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState(null); // 정렬 기준
    const userData = JSON.parse(sessionStorage.getItem('loginInfo'));
    const userLevel = userData?.userLevel;
    const itemsPerPage = 16; // 한 페이지당 보여질 아이템 개수
    const pagesToShow = 5; // 페이지 수가 5개씩 나오도록

    useEffect(() => {
        axios
            .get(`http://localhost:8080/${wineType}`)
            .then((res) => {
                const dataList = res.data.data;
                let sortedList = [...dataList];

                // sortBy에 따라 정렬
                if (sortBy === 'popular') {
                    sortedList.sort((a, b) => b.salesRate - a.salesRate); // sales_rate를 기준으로 정렬
                } else if (sortBy === 'desc') {
                    sortedList.sort((a, b) => b.price - a.price); // 높은 가격순 정렬
                } else if (sortBy === 'asc') {
                    sortedList.sort((a, b) => a.price - b.price); // 낮은 가격순 정렬
                }

                const totalItems = sortedList.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));

                // 페이징 처리하여 현재 페이지에 해당하는 아이템만 선택
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentItems = sortedList.slice(startIndex, endIndex);

                setWineLists(currentItems);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [wineType, sortBy, currentPage]);

    const handleSortBy = (sortByValue) => {
        setSortBy(sortByValue);
        setCurrentPage(1); // 정렬 기준 변경 시 현재 페이지를 1페이지로 초기화
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 페이지 수가 5개씩 나오도록 계산
    const calculatePageNumbers = () => {
        const halfPagesToShow = Math.floor(pagesToShow / 2);
        let startPage = Math.max(1, currentPage - halfPagesToShow);
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        if (totalPages <= pagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= halfPagesToShow) {
            startPage = 1;
            endPage = pagesToShow;
        } else if (currentPage + halfPagesToShow >= totalPages) {
            startPage = totalPages - pagesToShow + 1;
            endPage = totalPages;
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
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
        <div className={'container my-4 p-3'}>
            <div className={'text-end mb-5'}>
                <span className={`me-2 ${sortBy === 'popular' ? 'text-danger' : ''}`} onClick={() => handleSortBy('popular')}>인기순</span>
                <span className={`me-2 ${sortBy === 'desc' ? 'text-danger' : ''}`} onClick={() => handleSortBy('desc')}>높은가격순</span>
                <span className={`${sortBy === 'asc' ? 'text-danger' : ''}`} onClick={() => handleSortBy('asc')}>낮은가격순</span>
            </div>
            <div className="row">
                {wineLists.map(item => (
                    <Col key={item.id} md={3} sm={6} className="text-center" style={{marginBottom: '100px'}}>
                        <Link to={`/wine/${item.id}`}><img src={item.img} alt={item.name} style={{width: '200px', height: '200px', marginBottom: '20px'}} /></Link>
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

            <div className="text-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-secondary me-2"
                >
                    이전
                </button>

                {calculatePageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`btn ${currentPage === page ? 'btn-danger' : 'btn-outline-secondary'} me-2`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-secondary ms-2"
                >
                    다음
                </button>
            </div>

        </div>
    );

}

export default WineLists;