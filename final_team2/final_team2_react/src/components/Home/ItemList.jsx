import ItemListSlider from "./ItemListSlider";
import {useEffect, useState} from "react";
import axios from "axios";
import button from "bootstrap/js/src/button";

function ItemList (props) {

    const [showButtons, setShowButtons] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("칠레 Chile");
    const [clickedButton, setClickedButton] = useState(0);
    const userData = JSON.parse(sessionStorage.getItem("loginInfo"));
    const userLevel = userData?.userLevel;
    const preferredWine1 = userData?.preferredWine1;
    console.log(preferredWine1);

    useEffect(() => {
        axios.get('http://localhost:8080/board/')
            .then(res => {
                if (props.rnd === "ten"){
                    const sortedData = res.data.data.sort((a, b) => b.salesRate - a.salesRate);
                    const topTenItem = sortedData.slice(0, 10);
                    props.setItems(topTenItem);
                }

                // else if (props.rnd === "random") {
                //     // Fisher-Yates 알고리즘을 사용하여 데이터를 섞음
                //     const shuffled = res.data.data.sort(() => Math.random() - 0.5);
                //
                //     // 섞인 배열에서 상위 열 개의 항목 선택
                //     const randomItem = shuffled.slice(0, 10);
                //
                //     // 섞인 데이터로 상태 업데이트
                //     props.setItems(randomItem);
                // }


                else if (props.rnd === "random") {
                    if (preferredWine1) {
                        // 특별한 조건을 만족하는 경우의 로직 추가
                        // 예시: preferredWine1에 따라 필터링 또는 정렬을 수행하여 데이터를 가져옴
                        const filteredData = res.data.data.filter(item => item.wineType === preferredWine1);
                        const shuffledData = filteredData.sort(() => Math.random() - 0.5);
                        props.setItems(shuffledData.slice(0, 10));
                    } else {
                        // 일반적인 랜덤 데이터 가져오는 로직
                        const shuffled = res.data.data.sort(() => Math.random() - 0.5);
                        const randomItem = shuffled.slice(0, 10);
                        props.setItems(randomItem);
                    }
                }


                else {
                    // 국가별로 필터링하여 인기순 정렬
                    const countryData = res.data.data.filter(item => item.nation === selectedCountry);
                    const sortedByCountry = countryData.sort((a, b) => b.salesRate - a.salesRate);

                    // 상위 열 개의 항목 선택
                    const topTenByCountry = sortedByCountry.slice(0, 10);

                    // 필터링된 데이터로 상태 업데이트
                    props.setItems(topTenByCountry);

                    // 버튼을 활성화
                    setShowButtons(true);
                }

            })
            .catch(err => {
                console.log(err);
            })
    }, [props.rnd, selectedCountry]);

    const handleButtonClick = (country, index) => {
        setSelectedCountry(country);
        setClickedButton(index);
    };

    const countries = [
        { name: "칠레 Chile", color: "#ef4b4b" },
        { name: "프랑스 France", color: "#007acc" },
        { name: "이탈리아 Italy", color: "#3ab95d" },
        { name: "미국 U.S.A", color: "#ec0202" },
    ];

    return (
        <div>
            <p
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "bold",
                    paddingBottom: "20px",
                }}
            >
                {props.text}
            </p>
            {showButtons && (
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    {countries.map((country, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(country.name, index)}
                            style={{
                                padding: "10px",
                                border: "none",
                                borderRadius: "5px",
                                background:
                                    clickedButton === index ? country.color : (clickedButton === index ? country.color : "#d2d2d2"),
                                color: "white",
                                cursor: "pointer",
                                transition: "background 0.3s ease-in-out",
                                fontSize: "16px",
                            }}
                        >
                            {country.name}
                        </button>
                    ))}
                </div>
            )}
            <ItemListSlider items={props.items} userLevel={userLevel}/>
        </div>
    );
};

export default ItemList;
