import React from 'react';
import a from '../../img/추천와인.png'
import {Link} from "react-router-dom";

const Banner2 = () => {
    const userData = JSON.parse(sessionStorage.getItem(`loginInfo`))
    const preferredWine1 = userData?.preferredWine1;

    return (
        <div>
            <Link to={preferredWine1 ? `/${preferredWine1}` : "/Rose"}>
                <img src={a} alt="Banner Image" style={{ width: '100%', height: 'auto' }} />
            </Link>
        </div>
    );
};

export default Banner2;
