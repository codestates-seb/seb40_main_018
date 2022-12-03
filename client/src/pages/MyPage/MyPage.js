import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
// import LoginHeader from "../../components/Header/LoginHeader";
import MapIcon2 from "./MapIcon2";
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
  // const [mainImage, setMainImage] = useState([])
  const [tag, setTag] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/member/me/diaries?size=10&page=1&tag=${tag}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        const timer = setTimeout(() => {
          console.log("Diaries", res.data.data);
          let response = res.data.data;
          setCardList(response.slice(0, 10));
          response = response.slice(10);
          // setMainImage()
          setResult(response);
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  // yerin
  const [hasMore, setHasMore] = useState(true);
  const [result, setResult] = useState([]);

  return (
    <>
      {/* <LoginHeader /> */}
      <MyPageContainer>
        <UserEditBox cardList={cardList} />
        <MapIcon2 cardList={cardList} />
        <MyPageSearch cardList={cardList} setCardList={setCardList} setTag={setTag} />
        {loading && <SkeletonDiary />}
        {!loading && (
          <MyPageCard
            cardList={cardList}
            setCardList={setCardList}
            hasMore={hasMore}
            setHasMore={setHasMore}
            result={result}
            setResult={setResult}
          />
        )}
      </MyPageContainer>
    </>
  );
};

export default MyPage;
