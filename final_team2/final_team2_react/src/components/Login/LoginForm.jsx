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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../layout/Header";
import Category from "../../layout/Category";
import Footer from "../../layout/Footer";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {/*{'Copyright © '}*/}
            {/*<Link color="inherit" href="https://mui.com/">*/}
            {/*  Your Website*/}
            {/*</Link>{' '}*/}
            {/*{new Date().getFullYear()}*/}
            {/*{'.'}*/}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginForm() {
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   const data = new FormData(event.currentTarget);
    //   console.log({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //   });
    // };

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/login",
                {userId, userPassword}
            );

            const sessionData = response.data;
            sessionStorage.setItem(`loginInfo`, JSON.stringify(sessionData));

            const storedSession = sessionStorage.getItem(`loginInfo`);
            if (storedSession) {
                const session = JSON.parse(storedSession);
                const userId = session.userId;
                alert(`${userId} 님 반갑습니다.`)
            }

            // 이전 페이지의 URL을 세션 스토리지에 저장합니다.
            const previousUrl = sessionStorage.getItem("redirectUrl");
            if (previousUrl) {
                navigate(previousUrl); // 이전 페이지의 URL로 이동합니다.
            } else {
                navigate("/"); // 저장된 URL이 없으면 기본 페이지로 이동합니다.
            }


            console.log(response.data);

        } catch (error) {
            console.error("Error logging in:", error);
            // 로그인 실패 처리
        }
    };

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
                            marginBottom: '200px',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" noValidate sx={{mt: 1}} onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="아이디"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                            />
                            <Button
                                type="submit" // type을 "submit"으로 변경
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                로그인
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Link href="/signUp" variant="body2">
                                        {"회원가입"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Container>

            <div>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}