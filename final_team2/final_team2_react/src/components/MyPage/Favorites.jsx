import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {IoCartOutline} from "react-icons/io5";
import {Col} from "react-bootstrap";

const underlineStyle = {
    borderBottom: '1px solid', // 원하는 굵기로 설정할 수 있습니다.
    lineHeight: '2.5', // 원하는 길이로 설정할 수 있습니다.
};

function Favorites(props) {
    // const [userIdx] = useState(6);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isFilled, setIsFilled] = useState(false);
    // 로그인부분
    const numberOfItems = wishlistItems.length;
    const {id} = useParams();
    const [toggleStates, setToggleStates] = useState(Array.from({length: numberOfItems}, () => false));

    const userData = JSON.parse(sessionStorage.getItem("loginInfo"));
    const userIdx = userData?.userIdx;

    const userLevel = userData?.userLevel;
    useEffect(() => {
        viewWishlist();
    }, []);

    const viewWishlist = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/wishlist/view?userIdx=${userIdx}`);
            setWishlistItems(response.data.wishlistItems);
            setToggleStates(response.data.wishlistItems.map(item => true));
            setError(null);

        } catch (error) {
            setError('Error fetching wishlist items. Please try again later.');
        }
    };


    //  삭제
    const deleteItems = async (wineId, selectedWineIds, deleteAll) => {
        try {
            const response = await axios.delete(`http://localhost:8080/wishlist/delete`, {
                params: {userIdx: userIdx, wineId: wineId, deleteAll: deleteAll},
                data: selectedWineIds
            });

            if (Array.isArray(response.data.wishlistItems)) {
                setWishlistItems(response.data.wishlistItems);
            } else {
                console.error('Invalid wishlist items received in the server response:', response.data.wishlistItems);
            }

            setError(null);
        } catch (error) {
            setError(`Error deleting wishlist items. ${error.message}`);
        }
    };

    const deleteWishlistItem = (wineId) => {
        deleteItems(wineId, null, false);
    };

    const deleteSelectedWishlistItems = () => {
        const selectedItemsToDelete = wishlistItems.filter(item => selectedItems[item.id]);
        const selectedWineIds = selectedItemsToDelete.map(item => item.wineInfo.id);
        deleteItems(null, selectedWineIds, false);
    };

    const deleteAllWishlistItems = () => {
        deleteItems(null, null, true);
    };

    // 체크박스
    const toggleCheckbox = (wineId) => {
        setSelectedItems((prevSelected) => ({
            ...prevSelected,
            [wineId]: !prevSelected[wineId],
        }));
    };

// 추가
    const addToCart = async (wineId) => {
        try {
            // 현재 장바구니 아이템을 가져옴
            const cartResponse = await axios.get(`http://localhost:8080/cart/view?userIdx=${userIdx}`);
            const cartItems = cartResponse.data.cartItems;

            // 아이템이 이미 장바구니에 있는지 확인
            const isItemInCart = cartItems.some(item => item.wineInfo.id === wineId);
            // viewWishlist();
            if (!isItemInCart) {
                // 장바구니에 없으면 추가
                await axios.post(`http://localhost:8080/cart/add`, {
                    userIdx: userIdx,
                    wineId: wineId,
                    quantity: 1,
                });

                // 장바구니에 추가한 후 카트 페이지로 이동
                navigate('/cart');
            } else {
                // 아이템이 이미 장바구니에 있는 경우, 이에 대한 처리를 수행할 수 있음 (예: 메시지 표시)
                alert("아이템이 이미 장바구니에 있습니다.")
            }
        } catch (error) {
            console.error('장바구니에 아이템 추가 중 오류 발생:', error);
            setError('장바구니에 아이템을 추가하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    // const addToCart = async (wineId) => {
    //     try {
    //         await axios.post(`http://localhost:8080/cart/add`, {
    //             userIdx: userIdx,
    //             wineId: wineId,
    //         });
    //         // Navigate to the cart page after adding to the cart
    //         navigate('/cart');
    //     } catch (error) {
    //         console.error('Error adding item to cart:', error);
    //         setError('Error adding item to cart. Please try again later.');
    //     }
    // };

    useEffect(() => {
        // 로컬 스토리지에서 해당 아이템의 존재 여부를 확인하고 상태 업데이트
        const isWishlistItem = localStorage.getItem(`wishlist_${userIdx}_${id}`);
        const index = wishlistItems.findIndex(item => item.id === id);
        setIsFilled(index !== -1 && toggleStates[index]); // 해당 아이템이 존재하고 토글 상태가 true인 경우에만 찜한 상태로 설정
    }, [userIdx, id, wishlistItems, toggleStates]);

    const handleAddToWishlist = async (wineId, index) => {
        console.log(wineId);

        if (!userIdx) {
            const confirmLogin = window.confirm("로그인 후 이용가능합니다.\n로그인 하시겠습니까?");
            if (confirmLogin) {
                // 현재 페이지 URL을 세션 스토리지에 저장합니다.
                sessionStorage.setItem("redirectUrl", window.location.pathname);
                navigate("/login"); // 로그인 페이지로 이동
            }
            return;
        }

        try {
            const requestData = { userIdx: userIdx, wineId: wineId };
            console.log(wineId);
            if (!toggleStates[index]) {
                await axios.post("http://localhost:8080/wishlist/add", requestData);
                // 로컬 스토리지에 해당 아이템 추가
                localStorage.setItem(`wishlist_${userIdx}_${wineId}`, true);
                console.log("찜목록 추가");
            } else {
                await axios.delete("http://localhost:8080/wishlist/delete", { params: requestData });
                // 로컬 스토리지에서 해당 아이템 제거
                localStorage.removeItem(`wishlist_${userIdx}_${wineId}`);
            }
            // 이 부분에서 toggleStates를 업데이트하는 대신 새로운 토글 상태 배열을 생성하고 해당 인덱스의 값을 업데이트합니다.
            const updatedToggleStates = [...toggleStates];
            updatedToggleStates[index] = !updatedToggleStates[index];
            setToggleStates(updatedToggleStates); // 토글 상태 업데이트
        } catch (error) {
            console.error("Error making request to wishlist:", error);
        }
    };


    const wineNameStyle = {
        whiteSpace: 'nowrap',  // 텍스트를 한 줄로 표시
        overflow: 'hidden',    // 넘치는 텍스트는 숨김
        textOverflow: 'ellipsis',  // 넘치는 텍스트는 ...으로 표시
    };

    return (
        <div>
            <h3 style={underlineStyle}>찜한상품</h3>
            <div className="container mt-5">
                {/*<h3 className="mb-4">찜목록</h3>*/}
                {/*<hr/>*/}
                <div className="mb-4 d-flex justify-content-end align-items-center">
                    <div className="d-flex">
                        <button
                            className="btn btn-danger me-2"
                            onClick={deleteAllWishlistItems}
                            style={{
                                backgroundColor: '#d9534f',
                                borderColor: '#d9534f',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '8px 16px',
                                fontSize: '16px',
                            }}
                        >
                            전체삭제
                        </button>
                        {/*<button*/}
                        {/*    className="btn btn-warning ml-2"*/}
                        {/*    onClick={deleteSelectedWishlistItems}*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: '#f0ad4e',*/}
                        {/*        borderColor: '#f0ad4e',*/}
                        {/*        color: 'white',*/}
                        {/*        borderRadius: '5px',*/}
                        {/*        padding: '8px 16px',*/}
                        {/*        fontSize: '16px',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    선택삭제*/}
                        {/*</button>*/}
                    </div>
                </div>

                <div className="row">
                    {wishlistItems.map((item, index) => (
                        <Col key={item.id} md={3} sm={6} className="text-center" style={{marginBottom: '100px'}}>
                            {/*<div key={item.id} className="col">*/}
                            {item.wineInfo && (
                                // <div className="card mb-3">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-1">
                                        {/*<input*/}
                                        {/*    type="checkbox"*/}
                                        {/*    checked={selectedItems[item.id] || false}*/}
                                        {/*    onChange={() => toggleCheckbox(item.id)}*/}
                                        {/*    style={{marginLeft: '50px', transform: 'scale(1.5)'}}*/}
                                        {/*/>*/}
                                        <button key={item.wineInfo.id}
                                                onClick={() => handleAddToWishlist(item.wineInfo.id, index)}
                                                className={`bi ${toggleStates[index] ? 'bi-heart-fill' : 'bi-heart'}`}></button>


                                    </div>


                                    {/*<div className="col-md-3">*/}
                                    {/*    <img*/}
                                    {/*        src={item.wineInfo.img}*/}
                                    {/*        alt={item.wineInfo.name}*/}
                                    {/*        className="card-img-top"*/}
                                    {/*        style={{maxHeight: '200px', objectFit: 'contain'}}*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <Link to={`/wine/${item.id}`}><img src={item.wineInfo.img} alt={item.wineInfo.name}
                                                                       style={{
                                                                           width: '200px',
                                                                           height: '200px',
                                                                           marginBottom: '20px'
                                                                       }}/></Link>

                                    {/*<div className="col-md-8">*/}
                                    {/*    <div className="card-body d-flex align-items-center justify-content-between ">*/}
                                    <div>
                                        <h5 className="card-title" title={item.wineInfo.name} style={wineNameStyle}>
                                            {item.wineInfo.name}
                                        </h5>
                                        {/*{item.wineInfo.name.length > 17 &&*/}
                                        {/*    <h5 className="card-title" title={item.wineInfo.name}>*/}
                                        {/*        {item.wineInfo.name.length > 17 ? `${item.wineInfo.name.slice(17, 34)}${item.wineInfo.name.length > 34 ? '\n...' : ''}` : ''}*/}
                                        {/*    </h5>*/}
                                        {/*}*/}
                                    </div>
                                    <div style={{marginLeft: '10px', marginTop: '20px'}}>
                                        <div style={{marginRight: "20px"}}>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => addToCart(item.id)}
                                                style={{
                                                    fontSize: '25px',
                                                    color: '#131313',
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: '#f2f2f2',
                                                    padding: '2px 8px'
                                                }}><IoCartOutline/>
                                            </button>
                                            {/*<button*/}
                                            {/*    className="btn btn-danger btn-sm ms-2"*/}
                                            {/*    onClick={() => deleteWishlistItem(item.id)}*/}
                                            {/*    style={{*/}
                                            {/*        backgroundColor: '#f2f2f2',*/}
                                            {/*        borderColor: '#f2f2f2',*/}
                                            {/*        color: '#333'*/}
                                            {/*    }}*/}
                                            {/*>*/}
                                            {/*    X*/}
                                            {/*</button>*/}
                                        </div>
                                    </div>

                                    {/*</div>*/}
                                    {/*</div>*/}


                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                            )}
                            {/*</div>*/}
                        </Col>
                    ))}
                </div>

            </div>
        </div>

    )
        ;
}

export default Favorites;