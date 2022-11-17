import styled from "styled-components";
import LoginHeader from "../../components/Header/LoginHeader";
import MyList from "../MyList";
import MapIcon from "./MapIcon";
import MyPageSearch from "./MyPageSearch";
import MyPageCard from "./MapageCard";

const MyPageContanier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const MyPage = () => {
  // 무한스크롤 구현
  return (
    <>
      <LoginHeader />
      <MyPageContanier>
        <MyList />
        <MapIcon />
        <MyPageSearch />
        <MyPageCard />
      </MyPageContanier>
    </>
  );
};

export default MyPage;
