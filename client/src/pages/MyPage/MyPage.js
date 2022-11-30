import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import LoginHeader from "../../components/Header/LoginHeader";
import MapIcon from "./MapIcon";
import MyPageCard from "./MyPageCard";
import { UserEditBox } from "../../components/UserEdit/UserEdit";
import SkeletonDiary from "../../components/Skeleton/SkeletonDiary";
import MyPageSearch from "./MyPageSearch";

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
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/diary`).then((res) => {
      const timer = setTimeout(() => {
        console.log(res.data);
        setCardList(res.data);
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <>
      <LoginHeader />
      <MyPageContainer>
        <UserEditBox />
        <MapIcon cardList={cardList} />
        <MyPageSearch cardList={cardList} setCardList={setCardList} />
        {loading && <SkeletonDiary />}
        <MyPageCard cardList={cardList} />
      </MyPageContainer>
    </>
  );
};

export default MyPage;
