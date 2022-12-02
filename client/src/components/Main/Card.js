import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
import DarkMintTag from "../Tag/DarkMintTag";
import SkeletonCard from "../Skeleton/SkeletonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
// import { MainTab } from "./MainTab";

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
  color: #000000;
`;

const Cardtitle = styled.div`
  width: 280px;
  font-size: 12px;
  color: #000000;
`;

const Cardcontents = styled.div`
  width: 280px;
  height: 42px;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #000000;
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
  width: auto;
  height: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Region = styled.div`
  clear: both;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  /* height: 16px; */
  color: #535353;
  padding: 1px 7px;
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  font-size: 12px;

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
  width: auto;
  padding: 8px;
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
  align-items: flex-start;
  height: 26px;
  overflow: hidden;
  /* word-break: break-all; */
  gap: 6px;
  flex-wrap: wrap;
`;
const Heart = styled.div`
  margin-bottom: 240px;
  margin-left: 240px;
  cursor: pointer;
  > .heartBtn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
// { selected }
export const Card = ({ diaryList, setDiaryList, hasMore, setHasMore, result, setResult, loading }) => {
  console.log("diaryList2", diaryList);
  const [like, setLike] = useState(false);

  // const [completed, setcompleted] = useState(false);

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

  // 스크롤 시에 데이터를 추가적으로 받아오는 함수
  const fetchMoreData = () => {
    if (diaryList.length >= 50) {
      setHasMore(!hasMore);
      return;
    }
    // 가장 유력한 수정 후보
    setTimeout(() => {
      setDiaryList(diaryList.concat(result.slice(0, 12))); // 12개씩 커팅하기로 결정 -> 12개씩 slice
      setResult(result.slice(12));
    }, 1500);
  };

  return (
    <>
      {loading && <SkeletonCard />}

      <InfiniteScroll
        dataLength={diaryList.length}
        next={fetchMoreData}
        hasMore={hasMore}
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
            {/* 정렬 - diaryList?.sort(MainTab(selected)) */}
            {diaryList.map((list, index) => (
              <CardBox key={index}>
                <Preview src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg" alt="이미지">
                  <Heart>
                    <button className="heartBtn" onClick={() => onClickHandler(list)}>
                      {list.like ? <FaHeart color="#DF4949" /> : <FiHeart color="#DF4949" fill="#646464" />}
                    </button>
                  </Heart>
                </Preview>
                <Link to={`/detail/${list.diaryId}`}>
                  <Id>{list.nickname}</Id>
                  <Cardtitle>{list.title}</Cardtitle>
                  <Cardcontents>{list.content}</Cardcontents>
                </Link>
                <MintWrapper>
                  <Region>
                    {list.area}
                    {list.city}
                  </Region>
                  <Budget>{list.cost}</Budget>
                </MintWrapper>
                <TagContainer>
                  {list.tags.map((tag, idx) => (
                    <li key={idx}>
                      <DarkMintTag text={tag}></DarkMintTag>
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
