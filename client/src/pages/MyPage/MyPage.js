import styled from "styled-components";
import LoginHeader from "../../components/Header/LoginHeader";
import MapIcon from "./MapIcon";
import MyPageSearch from "./MyPageSearch";
import MyPageCard from "./MyPageCard";
import { UserEditBox } from "../../components/UserEdit/UserEdit";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  background-color: #fbfbfb;
  padding-top: 140px;
`;

const MyPage = () => {
  // 무한스크롤 구현
  return (
    <>
      <LoginHeader />
      <MyPageContainer>
        <UserEditBox />
        <MapIcon />
        <MyPageSearch />
        <MyPageCard />
      </MyPageContainer>
    </>
  );
};

export default MyPage;
