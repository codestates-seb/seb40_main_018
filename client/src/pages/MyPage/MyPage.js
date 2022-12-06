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
  const [page2, setPage2] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const accessToken = localStorage.getItem("accessToken");
  console.log("tag", tag);

  const fetchDiaryList = async (page2) => {
    setLoading(true);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}member/me/diaries?size=10&page=${page2}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    const cards = res.data.data;
    const pagination = res.data.pageInfo;

    if (cardList.length > 0) {
      const previousCards = cardList;
      const newCards = cards;

      setCardList([...previousCards, ...newCards]);
    } else {
      setCardList(cards);
    }
    setPage2(pagination.page + 1);
    setTotalPage(pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchDiaryList(page2);
  }, []);

  // yerin
  // const [hasMore, setHasMore] = useState(true);
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
            hasMore={page2 <= totalPage}
            // setHasMore={setHasMore}
            result={result}
            setResult={setResult}
            fetchDiaryList={fetchDiaryList}
            page2={page2}
          />
        )}
      </MyPageContainer>
    </>
  );
};

export default MyPage;
