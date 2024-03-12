import React, {useState} from "react";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Banner from "../Home/Banner";
import ItemList from "../Home/ItemList";
import Banner2 from "../Home/Banner2";
import Footer from "../../layout/Footer";
import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";
import Favorites from "./Favorites";
import MyInquiries from "./MyInquiries";
import MyReviews from "./MyReviews";

function MyPage(props) {
    const [selectedComponent, setSelectedComponent] = useState("orderHistory");

    return (
        <div style={{height: '1900px'}}>
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
            <div style={{margin: '100px 400px'}}>
                <UserInfo setSelectedComponent={setSelectedComponent}/>
            </div>
            {selectedComponent === "orderHistory" &&
                <div style={{margin: '100px 400px'}}>
                    <Favorites/>
                    <OrderHistory/>
                </div>
            }
            {selectedComponent === "myInquiries" &&
                <div style={{margin: '100px 400px'}}>
                    <MyInquiries/>
                </div>
            }
            {selectedComponent === "myReviews" &&
                <div style={{margin: '100px 400px'}}>
                    <MyReviews/>
                </div>
            }
            <div>
                <Footer/>
            </div>
        </div>

    );
}

export default MyPage;