import styled from "styled-components";
import Header from "../components/Header/Header";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";
import { useSelector } from "react-redux";
import LoginHeader from "../components/Header/LoginHeader";


const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  /* background-color: #fbfbfb; */
`;

export default function MainPage() {
  const user = useSelector((state) => state.userReducer);
  return (

    <Main>
      {user.isLogin ? <LoginHeader /> : <Header />}
      <div>
        <MainTab />
        <Card />
      </div>
    </Main>

  );
}
