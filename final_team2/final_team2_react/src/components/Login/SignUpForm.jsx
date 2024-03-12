import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {FormHelperText} from "@mui/material";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Footer from "../../layout/Footer";
import {useNavigate} from "react-router-dom";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
  `

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {/*{'Copyright © '}*/}
            {/*<Link color="inherit" href="https://mui.com/">*/}
            {/*    Your Website*/}
            {/*</Link>{' '}*/}
            {/*{new Date().getFullYear()}*/}
            {/*{'.'}*/}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpForm() {
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [inputError, setInputError] = useState(false); // 입력 필드 오류 여부
    const navigate = useNavigate();

    const [userDto, setUserDto] = useState({
        userId: "",
        userPassword: "",
        userName: "",
        userEmail: "",
        userCall: "",
        preferredWine1: "",
        preferredWine2: "",
        preferredWine3: "",
        userAddress: ""
    });

    const handleSignUp = async () => {
        // 이메일 유효성 검사
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (userDto.userEmail && !emailRegex.test(userDto.userEmail)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return; // 이메일 형식이 올바르지 않으면 회원가입 처리 중단
        } else {
            setEmailError(""); // 이메일 형식이 올바르면 에러 메시지 초기화
        }

        // 전화번호 형식 확인
        const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
        if (!phoneRegex.test(userDto.userCall)) {
            setPhoneError("올바른 전화번호 형식이 아닙니다.");
            return; // 전화번호 형식이 올바르지 않으면 회원가입 처리 중단
        } else {
            setPhoneError(""); // 전화번호 형식이 올바르면 에러 메시지 초기화
        }

        // 입력 필드가 하나라도 비어있으면 회원가입을 처리하지 않음
        const requiredFields = [userDto.userId, userDto.userPassword, userDto.userName, userDto.userEmail, userDto.userCall, userDto.userAddress];
        if (!requiredFields.every(value => value !== "")) {
            setInputError(true);
            return;
        }

        try {
            setInputError(false);
            const response = await axios.post("http://localhost:8080/user/signup", userDto);
            console.log(response.data);
            alert("회원가입에 성공하였습니다.");
            navigate('/login');
        } catch (error) {
            console.error("Error signing up:", error);
            // 회원가입 실패 처리
        }
    };

    const handleChange = (e) => {
        setUserDto({ ...userDto, [e.target.name]: e.target.value });
    };

    // 이메일 유효성 확인
    useEffect(() => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (userDto.userEmail && !emailRegex.test(userDto.userEmail)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
        } else {
            setEmailError("");
        }
    }, [userDto.userEmail]);

    // 전화번호 유효성 확인
    useEffect(() => {
        const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/; // 예시: 010-1234-5678
        if (userDto.userCall && !phoneRegex.test(userDto.userCall)) {
            setPhoneError("올바른 전화번호 형식이 아닙니다.");
        } else {
            setPhoneError("");
        }
    }, [userDto.userCall]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <div style={{margin: '0 400px'}}>
                <Header/>
            </div>
            <div style={{padding: '0 400px', position: 'sticky', top: '-1px', zIndex: '1', backgroundColor: 'white'}}>
                <Category/>
            </div>
            <hr/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="id"
                                    name="userId"
                                    label="아이디"
                                    autoFocus
                                    value={userDto.userId}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="userPassword"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={userDto.userPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="userName"
                                    label="이름"
                                    value={userDto.userName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="이메일 주소"
                                    name="userEmail"
                                    autoComplete="email"
                                    value={userDto.userEmail}
                                    onChange={handleChange}
                                    error={emailError !== "" || false}
                                />
                            </Grid>
                            <FormHelperTexts>{emailError}</FormHelperTexts>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="전화번호"
                                    name="userCall"
                                    autoComplete="phoneNumber"
                                    value={userDto.userCall}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <FormHelperTexts>{phoneError}</FormHelperTexts>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="주소"
                                    name="userAddress"
                                    autoComplete="address"
                                    value={userDto.userAddress}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSignUp}
                        >
                            회원가입
                        </Button>
                        {/* 오류 메시지 표시 */}
                        {inputError && (
                            <Typography variant="body2" color="error">
                                모든 입력 필드를 채워주세요.
                            </Typography>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    로그인
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
            <div>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}