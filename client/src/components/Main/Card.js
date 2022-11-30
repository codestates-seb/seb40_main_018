import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
import DarkMintTag from "../Tag/DarkMintTag";
import SkeletonCard from "../Skeleton/SkeletonCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const CardBox = styled.div`
  background-color: white;
  width: 320px;
  height: 480px;
  border-radius: 15px;
  padding: 20px 20px 25px 20px;
  display: grid;
  text-decoration: none !important;
  flex-direction: column;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const Id = styled.div`
  width: 280px;
  font-size: 12px;
`;

const Cardtitle = styled.div`
  width: 280px;
  font-size: 12px;
`;

const Cardcontents = styled.div`
  width: 280px;
  height: 42px;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Preview = styled.div`
  width: 280px;
  height: 280px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MintWrapper = styled.div`
  width: 160px;
  height: 30px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Region = styled.div`
  clear: both;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 16px;
  color: #535353;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  font-size: 10px;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

const Budget = styled.div`
  clear: both;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 16px;
  color: #535353;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  font-size: 10px;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

const TagContainer = styled.div`
  display: flex;
  word-break: break-all;
`;
const Heart = styled.div`
  margin-bottom: 240px;
  margin-left: 240px;
  cursor: pointer;
  /* display: flex;
  justify-content: flex-end;
  align-items: flex-start; */
`;
export const Card = () => {
  const [like, setLike] = useState(false);
  const [diaryList, setDiaryList] = useState([]);
  // const [completed, setcompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const onClickHandler = () => {
  //   setLike(!like);
  // };

  const onClickHandler = (list) => {
    setLike(!like);

    setDiaryList(
      diaryList.map((item) => {
        if (item.id === list.id) {
          return { ...item, like: !item.like };
        }
        return item;
      }),
    );

    const patch2 = {
      title: list.title,
      like: !list.like,
    };

    axios
      .patch(`http://localhost:4000/diary/` + list.id, patch2)
      .then((res) => console.log(res))
      .then((err) => console.log("res1", err));
  };

  // const onClickHandler = ({ id }) => {
  //   const heartClick = like.find((todo) => todo.id === id);
  //   setLike(heartClick);
  //   console.log(heartClick);
  //   setLike(!like);
  // };

  useEffect(() => {
    // axios.get(`http://localhost:4000/diary/${id}`).then((res) => {
    setLoading(true);
    axios.get("http://localhost:4000/diary").then((res) => {
      const timer = setTimeout(() => {
        console.log(res.data);
        setDiaryList(res.data);
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    });
  }, []);

  // yerin
  const [hasMore, setHasMore] = useState(true);
  // const [items, setItems] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    if (diaryList.length >= 50) {
      setHasMore(!hasMore);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      // setItems(items.concat(Array.from({ length: 10 })));
      setDiaryList(diaryList.concat(diaryList.slice(0, 10))); // 가장 유력한 수정 후보
    }, 1000);
  };
  return (
    <>
      {loading && <SkeletonCard />}

      <InfiniteScroll
        dataLength={diaryList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        // height={500}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* 리스트 */}
        {!loading && (
          <Main>
            {diaryList.map((list, index) => (
              <CardBox key={index}>
                <Preview src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg" alt="이미지">
                  <Heart>
                    <button onClick={() => onClickHandler(list)}>
                      {list.like ? <FaHeart color="#DF4949" /> : <FiHeart color="#DF4949" fill="#646464" />}
                    </button>
                  </Heart>
                </Preview>
                <Id>{list.nickname}</Id>
                <Cardtitle>{list.title}</Cardtitle>
                <Cardcontents>{list.diary}</Cardcontents>
                <MintWrapper>
                  <Region>
                    {list.selected}
                    {list.city}
                  </Region>
                  <Budget>{list.price}</Budget>
                </MintWrapper>
                <TagContainer>
                  {list.tags.map((tag, idx) => (
                    <li key={idx}>
                      <DarkMintTag height="16px" text={tag}></DarkMintTag>
                    </li>
                  ))}
                </TagContainer>
              </CardBox>
            ))}
          </Main>
        )}
      </InfiniteScroll>
    </>
  );
};
