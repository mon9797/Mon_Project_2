import React, {useEffect, useState} from "react";
import Banner from "./Banner";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import ItemList from "./ItemList";
import Banner2 from "./Banner2";
import Category from "../../layout/Category";

function Home(props) {

    const [topTenItems, setTopTenItems] = useState([]);
    const [randomItems, setRandomItems] = useState([]);
    const [nationTopTenItems, setNationTopTenItems] = useState([]);

    return (
        <div style={{height: '3500px'}}>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{padding: '0 400px', position: 'sticky', top: '-1px', zIndex: '1', backgroundColor: 'white'}}>
                <Category/>
            </div>
            <div className={'mt-4 mb-5'}>
                <Banner/>
            </div>
            <div style={{margin: '200px 400px'}}>
                <ItemList text={'검색 급상승! 랭킹 TOP 10'} items={topTenItems} setItems={setTopTenItems} rnd={'ten'}/>
            </div>
            <div style={{margin: '200px 400px'}}>
                <Banner2/>
            </div>
            <div style={{margin: '200px 400px'}}>
                <ItemList text={'이 상품 어때요?'} items={randomItems} setItems={setRandomItems} rnd={'random'}/>
            </div>
            <div style={{margin: '200px 400px'}}>
                <ItemList text={'국가별 인기 와인'} items={nationTopTenItems} setItems={setNationTopTenItems} rnd={'nation'}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default Home;
