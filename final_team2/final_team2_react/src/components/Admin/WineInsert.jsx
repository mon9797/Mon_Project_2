import React, { useState } from 'react';
import axios from 'axios';
import './WineInsert.css'; // CSS 파일 import

function WineInsert() {
    const [wineInfo, setWineInfo] = useState({
        id: `0`,
        name: '',
        producer: '',
        nation: '',
        local1: '',
        local2: '',
        varieties1: '',
        varieties2: '',
        varieties3: '',
        wineType: '',
        wineUse: '',
        abv: 0,
        degree: '',
        sweet: '',
        acidity: '',
        body: '',
        tannin: '',
        price: 0,
        year: 0,
        ml: 0,
        img: ''
    });

    const [salesRateInfo, setSalesRateInfo] = useState({
        id: '',
        salesRate: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWineInfo({ ...wineInfo, [name]: value });
    };

    const handleSalesRateChange = (e) => {
        const { name, value } = e.target;
        setSalesRateInfo({ ...salesRateInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/wineInsert', wineInfo);
            alert('등록되었습니다.');
        } catch (error) {
            console.error(error);
            alert('등록에 실패했습니다.');
        }
    };

    const handleSalesRateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/salesrate', salesRateInfo);
            alert('Sales rate가 업데이트되었습니다.');
        } catch (error) {
            console.error(error);
            alert('Sales rate 업데이트에 실패했습니다.');
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Wine 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ID:</label>
                        <input className="form-input" type="number" name="id" value={wineInfo.id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-input" type="text" name="name" value={wineInfo.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Producer:</label>
                        <input className="form-input" type="text" name="producer" value={wineInfo.producer} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nation:</label>
                        <input className="form-input" type="text" name="nation" value={wineInfo.nation} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Local1:</label>
                        <input className="form-input" type="text" name="local1" value={wineInfo.local1} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Local2:</label>
                        <input className="form-input" type="text" name="local2" value={wineInfo.local2} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Varieties1:</label>
                        <input className="form-input" type="text" name="varieties1" value={wineInfo.varieties1} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Varieties2:</label>
                        <input className="form-input" type="text" name="varieties2" value={wineInfo.varieties2} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Varieties3:</label>
                        <input className="form-input" type="text" name="varieties3" value={wineInfo.varieties3} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Wine Type:</label>
                        <input className="form-input" type="text" name="wineType" value={wineInfo.wineType} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Wine Use:</label>
                        <input className="form-input" type="text" name="wineUse" value={wineInfo.wineUse} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ABV:</label>
                        <input className="form-input" type="number" name="abv" value={wineInfo.abv} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Degree:</label>
                        <input className="form-input" type="text" name="degree" value={wineInfo.degree} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Sweet:</label>
                        <input className="form-input" type="text" name="sweet" value={wineInfo.sweet} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Acidity:</label>
                        <input className="form-input" type="text" name="acidity" value={wineInfo.acidity} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Body:</label>
                        <input className="form-input" type="text" name="body" value={wineInfo.body} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Tannin:</label>
                        <input className="form-input" type="text" name="tannin" value={wineInfo.tannin} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input className="form-input" type="number" name="price" value={wineInfo.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Year:</label>
                        <input className="form-input" type="number" name="year" value={wineInfo.year} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ml:</label>
                        <input className="form-input" type="number" name="ml" value={wineInfo.ml} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input className="form-input" type="text" name="img" value={wineInfo.img} onChange={handleChange} />
                    </div>
                    <button className="btn-submit" type="submit">등록</button>
                </form>
            </div>
            {/*<div>*/}
            {/*    <h2>와인 판매량 업데이트</h2>*/}
            {/*    <form onSubmit={handleSalesRateSubmit}>*/}
            {/*        <div className="form-group">*/}
            {/*            <label>ID:</label>*/}
            {/*            <input className="form-input" type="number" name="id" value={salesRateInfo.id} onChange={handleSalesRateChange} />*/}
            {/*        </div>*/}
            {/*        <div className="form-group">*/}
            {/*            <label>Sales Rate:</label>*/}
            {/*            <input className="form-input" type="number" name="salesRate" value={salesRateInfo.salesRate} onChange={handleSalesRateChange} />*/}
            {/*        </div>*/}
            {/*        <button className="btn-submit" type="submit">업데이트</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>

    );
}

export default WineInsert;
