
import './App.css';
import Home from "./components/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorPage from "./layout/ErrorPage";
import WineList from "./components/WineList/WineList";
import QnaList from "./components/QnaList/QnaList";
import QnaInsert from "./components/QnaList/QnaInsert";
import QnaComment from "./components/QnaList/QnaComment";
import Payment from "./components/Payment/Payment";
import SubPayment from "./components/Payment/SubPayment";
import Membership from "./components/Payment/Membership";
import WineDetail from "./components/WineDetail/WineDetail";
import Review from "./components/WineDetail/Review";
import ShoppingCart from "./components/ShoppingCart";
import UserList from "./components/Admin/UserList";
import LoginForm2 from "./components/Login/LoginForm2";
import SignUpForm from "./components/Login/SignUpForm";
import Cart from "./components/Cart";
import EmailSender from "./components/Admin/EmailSender";
import SearchResult from "./components/SearchResult";
import MyPage from "./components/MyPage/MyPage";
import React from "react";
import MyReviews from "./components/MyPage/MyReviews";
import MyInquiries from "./components/MyPage/MyInquiries";
import AdminComment from "./components/Admin/AdminComment";
import AdminQna from "./components/Admin/AdminQna";
import WineInsert from "./components/Admin/WineInsert";
import Banner2 from "./components/Home/Banner2";
import WishList from "./components/WishList";
import Admin from "./components/Admin/Admin";
import LoginForm from "./components/Login/LoginForm";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
            <Route path={'*'} element={<ErrorPage/>} />
            <Route path={'/mypage'} element={<MyPage/>} />
            <Route path={'/myReviews'} element={<MyReviews/>} />
            <Route path={'/myInquiries'} element={<MyInquiries/>} />
            <Route path={'/:wineType'} element={<WineList/>} />
            <Route path={'/searchResult/:searchStr'} element={<SearchResult/>} />

            <Route path={'/qna'} element={<QnaList />} />
            <Route path={'/qna/write'} element={<QnaInsert />} />
            <Route path={'/qna/:inqIdx'} element={<QnaComment />} />
            <Route path={'/membership'} element={<Membership />} />
            <Route path={'/payment'} element={<Payment />} />
            <Route path={'/SubPayment'} element={<SubPayment />} />

            <Route path={'/admin'} element={<Admin/>}/>
            <Route path={'/user'} element={<UserList/>}/>
            <Route path={'/send'} element={<EmailSender/>}/>
            <Route path={'/adminqnacomment'} element={<AdminComment/>}/>
            <Route path={'/adminqna'} element={<AdminQna/>}/>
            <Route path={'/wineinsert'} element={<WineInsert/>}/>


            <Route path={`/wine/:id`} element={<WineDetail/>}/>
            <Route path="/review/:id" element={<Review/>}/>
            <Route path={`/login`} element={<LoginForm/>}/>
            {/*<Route path={`/login2`} element={<LoginForm2/>}/>*/}
            <Route path={`/signUp`} element={<SignUpForm/>}/>

            <Route path="/cart" element={<Cart/>}/>
          <Route path="/wishlist" element={<WishList/>}/>




        </Routes>
      </BrowserRouter>
  );
}

export default App;
