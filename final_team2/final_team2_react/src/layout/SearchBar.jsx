import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import {TextField} from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
// import Button from '@mui/material/Button';

const SearchBarContainer = styled.form`
    display: flex;
    align-items: center;
    margin-right: 10px;
`;

const SearchInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 5px;
    font-size: 14px;
`;

const SearchButton = styled.button`
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0056b3;
    }
`;

const SearchBar = () => {
    const [searchStr, setSearchStr] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchStr(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchStr}`);

        if (searchStr) {
            axios.get(`http://localhost:8080/search/${searchStr}`)
                .then(res => {
                    const dataList = res.data.data;
                    console.log(dataList);

                    // 검색 버튼을 클릭하면 다른 화면으로 이동
                    navigate(`/searchResult/${searchStr}`); // 적절한 경로로 수정
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        // <SearchBarContainer onSubmit={handleSearchSubmit}>
        //     <SearchInput
        //         type="text"
        //         placeholder="검색어를 입력하세요"
        //         value={searchStr}
        //         onChange={handleSearchChange}
        //     />
        //     <SearchButton type="submit">검색</SearchButton>
        // </SearchBarContainer>

        <Paper
            onSubmit={handleSearchSubmit}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색어를 입력하세요"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleSearchChange}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
