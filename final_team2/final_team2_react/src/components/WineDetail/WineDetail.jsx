import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Review from "./Review";

import "./WineDetail.css";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import WineInfo from "./WineInfo";
import WineStyle from "./WineStyle";
import Footer from "../../layout/Footer";

function WineDetail() {

    const {id} = useParams();
    const [wineInfo, setWineInfo] = useState(null);
    const userData = JSON.parse(sessionStorage.getItem("loginInfo"));
    const userIdx = userData?.userIdx;
    const userLevel = userData?.userLevel;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [reviewStats, setReviewStats] = useState({totalRating: 0, reviewCount: 0, averageRating: 0});

    const handleReviewStatsChange = (stats) => {
        setReviewStats(stats);
    };


    useEffect(() => {
        const fetchWineDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/wine/${id}`);
                setWineInfo(response.data);
            } catch (error) {
                console.error("Error fetching wine detail:", error);
            }
        };

        fetchWineDetail();
    }, [id]);





    return (
        <div>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{
                margin: '0 400px',
                position: 'sticky',
                top: '-1px',
                zIndex: '1',
                backgroundColor: 'white',
                borderBottom: '1px solid'
            }}>
                <Category/>
            </div>
            <div className="container">
                {wineInfo ? (
                    <WineInfo wineInfo={wineInfo} quantity={quantity} userLevel={userLevel}
                              setQuantity={setQuantity} reviewStats={reviewStats}
                              id={id} userIdx={userIdx} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
                ) : (
                    <p>Loading...</p>
                )}


                <div>
                    <WineStyle wineInfo={wineInfo}/></div>

                <Review id={id} onReviewStatsChange={handleReviewStatsChange}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default WineDetail;
