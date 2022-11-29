import styled from "styled-components";
import Header from "../components/Header/Header";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";
import { useSelector } from "react-redux";
import { SET_TOKEN, DELETE_TOKEN } from "../redux/store/Auth";
import LoginHeader from "../components/Header/LoginHeader";
// import { useEffect, useState } from "react";
// import SkeletonCard from "../components/Skeleton/SkeletonCard";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;

export default function MainPage() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get("http://localhost:4000/todos").then((result) => {
  //     // 로딩 시간이 짧아 settimeout 적용
  //     const timer = setTimeout(() => {
  //       setTodos(result.data);
  //       setLoading(false);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   });
  // }, []);
  const user = useSelector(SET_TOKEN);
  console.log("user", user.payload.userReducer.isLogin);
  const accesstoken = useSelector(DELETE_TOKEN);
  console.log("accesstoken", accesstoken);
  return (
    <Main>
      {user.payload.userReducer.isLogin ? <LoginHeader /> : <Header />}
      <div>
        <MainTab />
        {/* {loading && <SkeletonCard />} */}
        {/* {!loading && <Card />} */}
        <Card />
      </div>
    </Main>
  );
}
