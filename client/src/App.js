import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Diary from "../src/pages/Diary/Diary";
import DiaryEdit from "./pages/DiaryEdit/DiaryEdit";
import { Login } from "./pages/Login";
import MyList from "./pages/MyList";
import MyPage from "./pages/MyPage/MyPage";
import NotFound from "./components/NotFound";
import { SignUp } from "./pages/SignUp";
import { GlobalStyles } from "./style/GlobalStyle";
import useFetch from "./redux/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getmyInfo } from "./redux/userAction";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { setRefreshToken } from "./storage/Cookie";
import LoginHeader from "./components/Header/LoginHeader";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import Detail from "./pages/Detail/Detail";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userReducer.isLogin);
  const user = useSelector((state) => state.userReducer);
  // console.log("user", user);

  // 내 정보 가져오기
  const userLoad = async () => {
    const myInfo = await useFetch("GET", `/member/me`);
    dispatch(getmyInfo(myInfo));
    // console.log("myInfo member/me", myInfo);
  };

  useEffect(() => {
    if (isLogin) {
      userLoad();
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const { exp } = jwt_decode(token);
        // 토큰 만료 3일
        if (Date.now() >= exp * 60 * 60 * 24 * 3) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(getLoginStatus({ isLogin: false }));
          window.reload();

          // 토큰 만료 전 로그인 연장 필요
        } else if (Date.now() >= exp * 1000 - 100000) {
          dispatch(getLoginStatus({ isLogin: true }));
          setRefreshToken();
          // 토큰 유효
        } else {
          dispatch(getLoginStatus({ isLogin: true }));
        }
      } catch (e) {
        // console.log(e);
      }
    }
  }, [isLogin]);

  return (
    <>
      <GlobalStyles />
      <Router>
        {user.isLogin ? <LoginHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diaryedit/:id" element={<DiaryEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/mylist/:id" element={<MyList />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
