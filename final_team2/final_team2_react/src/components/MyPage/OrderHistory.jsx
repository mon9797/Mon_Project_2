import React, {useEffect, useState} from "react";
import axios from "axios";

const underlineStyle = {
    borderBottom: '1px solid', // 원하는 굵기로 설정할 수 있습니다.
    lineHeight: '2.5', // 원하는 길이로 설정할 수 있습니다.
    marginBottom: '30px',
    marginTop: '70px'
};

function OrderHistory(props) {
    const session = JSON.parse(sessionStorage.getItem(`loginInfo`))
    const userIdx = session && session.userIdx;
    const userLevel = session && session.userLevel;

    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/orderHistory/${userIdx}`)
            .then(res => {
                const dataList = res.data;
                console.log(dataList);

                setHistoryList(dataList);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
        <div>
            <h3 style={underlineStyle}>최근주문내역</h3>
            {historyList.map((item) => (
                <div key={item.hisIdx} style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px'
                }}>
                    <div style={{display: 'flex', alignItems: 'center', margin: '10px'}}>
                        <img src={item.wineInfo.img} alt="Attached File"
                             style={{height: '120px', width: '120px', marginRight: '20px'}}/>
                        <div>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '5px'
                            }}>{item.wineInfo.name}</p>
                            <p style={{
                                fontSize: '16px',
                                marginRight: '10px'
                            }}>{item.wineInfo.price.toLocaleString()}원</p>
                            <p style={{fontSize: '16px'}}>{item.hisQuantity}개</p>
                        </div>
                    </div>
                    {/*<p style={{fontSize: '18px', fontWeight: 'bold', marginLeft: 'auto'}}>합계*/}
                    {/*    : {(item.wineInfo.price * item.hisQuantity).toLocaleString()}원</p>*/}

                    <p style={{fontSize: '18px', fontWeight: 'bold', marginLeft: 'auto'}}>합계
                        : {(calculateDiscountedPrice(item.wineInfo.price, userLevel).discountedPrice * item.hisQuantity).toLocaleString()}원</p>
                </div>
            ))}
        </div>

    );
}

export default OrderHistory;