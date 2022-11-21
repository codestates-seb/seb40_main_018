import styled from "styled-components";
import LoginHeader from "../components/Header/LoginHeader";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";
import PriceFilter from "../Filter/PriceFilter";


const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;

export default function MainPage() {
  return (
    <Main>
      <LoginHeader />
      <div>
        <MainTab />
        <Card />
      </div>
    </Main>

      <PriceFilter />
    </>

  );
}
