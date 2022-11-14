import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail";
import Diary from "../src/pages/Diary/Diary";
import DiaryEdit from "./pages/DiaryEdit";
import { Login } from "./pages/Login";
import MainPage from "./pages/MainPage";
import MyList from "./pages/MyList";
import MyPage from "./pages/MyPage";
import { SignUp } from "./pages/SignUp";
import UserEdit from "./pages/UserEdit";
import { GlobalStyles } from "./style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diaryedit/:id" element={<DiaryEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/useredit" element={<UserEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
