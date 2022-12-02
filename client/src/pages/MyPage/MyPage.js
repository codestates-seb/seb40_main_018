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
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const accessToken = localStorage.getItem("accessToken");

  const fetchDiaryList = async (page) => {
    setLoading(true);
    const res = await axios.get(`/member/me/diaries?size=10&page=${page}`, {
      headers: {
        Authorization: accessToken,
      },
    }); // &tag=${tag}

    console.log(res.data);
    const cards = res.data.data;
    const pagination = res.data.pageInfo;

    if (cardList.length > 0) {
      const previousCards = cardList;
      const newCards = cards;

      setCardList([...previousCards, ...newCards]);
    } else {
      setCardList(cards);
    }
    setPage(pagination.page + 1);
    setTotalPage(pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    // setLoading(true);
    // axios
    //   .get(`/member/me/diaries?size=10&page=1&tag=${tag}`, {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     const timer = setTimeout(() => {
    //       console.log(res.data);
    //       let response = res.data.data;
    //       setCardList(response.slice(0, 10));
    //       response = response.slice(10);
    //       setResult(response);
    //       setLoading(false);
    //     }, 2000);
    //     return () => clearTimeout(timer);
    //   })
    //   // .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
    // const timer = setTimeout(() => {
    fetchDiaryList(tag);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  // yerin
  // const [hasMore, setHasMore] = useState(true);
  const [result, setResult] = useState([]);

  return (
    <>
      {/* <LoginHeader /> */}
      <MyPageContainer>
        <UserEditBox />
        <MapIcon2 cardList={cardList} />
        <MyPageSearch cardList={cardList} setCardList={setCardList} setTag={setTag} />
        {loading && <SkeletonDiary />}
        {!loading && (
          <MyPageCard
            cardList={cardList}
            setCardList={setCardList}
            hasMore={page <= totalPage}
            // setHasMore={setHasMore}
            result={result}
            setResult={setResult}
            fetchDiaryList={fetchDiaryList}
            page={page}
          />
        )}
      </MyPageContainer>
    </>
  );
};

export default MyPage;
