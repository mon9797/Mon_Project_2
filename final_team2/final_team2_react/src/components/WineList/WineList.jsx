import React from "react";
import WineLists from "./WineLists";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Footer from "../../layout/Footer";

function WineList(props) {
    return (
        <div style={{height: '1780px'}}>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{margin: '0 400px', position: 'sticky', top: '-1px', zIndex: '1', backgroundColor: 'white', borderBottom: '1px solid'}}>
                <Category/>
            </div>
            <div>
                <WineLists/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default WineList;