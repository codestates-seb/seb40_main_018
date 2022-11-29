import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
import DarkMintTag from "../Tag/DarkMintTag";

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

  // const onClickHandler = () => {
  //   setLike(!like);
  // };

  const onClickHandler = (like) => {
    setLike(
      like.map((item) => {
        if (item.id === like.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    );

    const patch2 = {
      title: like.title,
      completed: !like.completed,
    };

    axios
      .patch(`http://localhost:4000/diary/` + like.id, patch2)
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
    axios.get("http://localhost:4000/diary").then((res) => {
      console.log(res.data);
      setDiaryList(res.data);
    });
  }, []);

  return (
    <>
      <Main>
        {diaryList.map((item, index) => (
          <CardBox key={index}>
            <Preview src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg" alt="이미지">
              <Heart>
                <button onClick={() => onClickHandler(like)}>
                  {like ? (
                    <FaHeart color="#DF4949" onClick={onClickHandler} />
                  ) : (
                    <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
                  )}
                </button>
              </Heart>
            </Preview>
            <Id>{item.nickname}</Id>
            <Cardtitle>{item.title}</Cardtitle>
            <Cardcontents>{item.diary}</Cardcontents>
            <MintWrapper>
              <Region>
                {item.selected}
                {item.city}
              </Region>
              <Budget>{item.price}</Budget>
            </MintWrapper>
            <TagContainer>
              {item.tags.map((tag, idx) => (
                <li key={idx}>
                  <DarkMintTag height="16px" text={tag}></DarkMintTag>
                </li>
              ))}
            </TagContainer>
          </CardBox>
        ))}
      </Main>
    </>
  );
};
