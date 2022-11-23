import styled from "styled-components";
import Header from "../components/Header/Header";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";
import { useSelector } from "react-redux";
import { SET_TOKEN, DELETE_TOKEN } from "../redux/store/Auth";
import LoginHeader from "../components/Header/LoginHeader";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  /* background-color: #fbfbfb; */
`;

export default function MainPage() {
  const user = useSelector(SET_TOKEN);
  console.log("user", user.payload.userReducer.isLogin);
  const accesstoken = useSelector(DELETE_TOKEN);
  console.log("accesstoken", accesstoken);
  return (
    <Main>
      {user.payload.userReducer.isLogin ? <LoginHeader /> : <Header />}
      <div>
        <MainTab />
        <Card />
      </div>
    </Main>
  );
}
