import styled from "styled-components";
import LoginHeader from "../components/Header/LoginHeader";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;
// const Wrapper = styled.div`
//   margin: 100px 100px 100px 100px;
// `;
export default function MainPage() {
  return (
    <Main>
      <LoginHeader />
      <div>
        <MainTab />
        <Card />
      </div>
    </Main>
  );
}
