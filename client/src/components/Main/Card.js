import axios from "axios";
// import { useEffect } from "react";
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
  margin: 0 10px;
  gap: 40px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  font-size: 12px;
  color: #86c1c1;
  font-weight: 800;
`;

const Cardtitle = styled.div`
  margin-top: 10px;
  font-weight: 600;
  width: 280px;
  font-size: 12px;
  color: #535353;
`;

const Cardcontents = styled.div`
  width: 280px;
  height: 46px;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #535353;
  margin: 6px 0px 6px 0px;
`;

const Preview = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;

const MintWrapper = styled.div`
  width: auto;
  height: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
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
  padding: 1px 7px;
  color: #535353;
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
  cursor: pointer;
  > .heartBtn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const TopStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Card = ({ diaryList, setDiaryList, hasMore, fetchDiaryList, loading, page, setLike, like }) => {
  console.log("diaryList2", diaryList);
  console.log("like", like);

  // const id = useParams().id;
  const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}likes/` + id, {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     })
  //     .then((res) => setLike(res.data.data.like))
  //     .catch((err) => {
  //       console.log("likeGetErr", err);
  //     });
  // }, []);

  const onClickHandler = (list) => {
    setLike(!like);
    console.log("list", list);

    setDiaryList(
      diaryList.map((item) => {
        if (item.diaryId === list.diaryId) {
          return { ...item, like: !item.like };
        }
        return item;
      }),
    );

    const patch2 = {
      like: !list.like,
    };

    // pass
    axios
      .post(`${process.env.REACT_APP_API_URL}likes/` + list.diaryId, patch2, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => console.log("postLike", res.data.data.like))
      .catch((err) => console.log("res1", err));
  };

  // const onClickHandler = ({ id }) => {
  //   const heartClick = like.find((todo) => todo.id === id);
  //   setLike(heartClick);
  //   console.log(heartClick);
  //   setLike(!like);
  // };

  // 스크롤 시에 데이터를 추가적으로 받아오는 함수
  // const fetchMoreData = () => {
  // if (diaryList.length >= 50) {
  //   setHasMore(!hasMore);
  //   return;
  // }
  // // 가장 유력한 수정 후보
  // setTimeout(() => {
  //   setDiaryList(diaryList.concat(result.slice(0, 12))); // 12개씩 커팅하기로 결정 -> 12개씩 slice
  //   setResult(result.slice(12));
  // }, 1500);
  // };

  const formatter = new Intl.NumberFormat("ko");

  return (
    <>
      {loading && <SkeletonCard />}

      <InfiniteScroll
        dataLength={diaryList.length}
        next={() => fetchDiaryList(page)}
        hasMore={hasMore && !loading}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
            <b>마지막 페이지입니다 : )</b>
          </p>
        }
      >
        {/* 리스트 */}
        {!loading && (
          <Main>
            {/* 정렬 - diaryList?.sort(MainTab(selected)) */}
            {diaryList.map((list, index) => (
              <CardBox key={index}>
                <TopStyle>
                  <Id>{list.nickname}</Id>
                  <Heart>
                    <button className="heartBtn" onClick={() => onClickHandler(list)}>
                      {list.like ? <FaHeart color="#DF4949" /> : <FiHeart color="#DF4949" fill="#646464" />}
                    </button>
                  </Heart>
                </TopStyle>
                <Link to={`/detail/${list.diaryId}`}>
                  <Preview src={list.imageUrl} alt="이미지" />
                  <Cardtitle>{list.title}</Cardtitle>
                  <Cardcontents>{list.content}</Cardcontents>
                </Link>
                <MintWrapper>
                  <Region>
                    {list.area} {list.city}
                  </Region>
                  <Budget>총 예산 : {formatter.format(list.cost)} ₩</Budget>
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
