import axios from "axios";
import { useState } from "react";
import { Location } from "./Location";
import styled from "styled-components";
import LoginHeader from "../../components/Header/LoginHeader";

import MintLineButton from "../../components/Button/MintLineButton";
// import MintButton from "../../components/Button/MintButton";
import DiaryTitle from "./DiaryTitle";
import DiaryImg from "./DiaryImg";
import DiaryText from "./DiaryText";
import DiaryPrice from "./DiaryPrice";
import DiaryPlace from "./DiaryPlace";
import DiaryHashtag from "./DiaryHashtag";
import CancelModal from "../../components/Modal/CancelModal";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  margin-top: 90px;
  font-size: 14px;
`;
const Container = styled.div`
  width: 700px;
  margin-bottom: 40px;
`;
const BtnArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  > button {
    margin-left: 20px;
  }
`;

const Diary = () => {
  const navigate = useNavigate();
  const randomQuestions = [
    "이번 여행에서 맛있게 먹은 음식은 무엇인가요?",
    "가장 좋았던 장소는 어디였나요?",
    "이번 여행에서 가장 인상 깊었던 향기는 무엇인가요?",
    "이번 여행에서 가장 귀찮았던 일은 무엇인가요?",
    "이번 여행에서 산책하는 강아지랑 인사 몇번 하셨나요?",
    "오랫동안 기억하고 싶은 장면은 무엇인가요?",
    "가장 마음에 드는 사진은 무엇인가요?",
    "다음에 이곳에 다시 여행을 온다면 누구와 함께 오고 싶나요?",
    "이번 여행에서 가장 특별했던 만남은 무엇이었나요?",
    "이번 여행의 주제곡을 골라보자면 무엇일까요?",
    "최고의 여행 명소는 어디였나요?",
    "이번 여행에서 먹었던 음식중에 술안주로 제격인 음식은 무엇인가요?",
    "나는 어떤 취향의 여행자일까요?",
    "이번 여행에서 가장 중요했던 한가지는 무었이었나요?",
    "이번 여행 중 나만 알고 싶은 사진 명소는 어디인가요?",
    "여행에서 자주 들은 노래는 무엇인가요?",
  ];

  const [title, setTitle] = useState("");
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [weather, setWeather] = useState("날씨");
  const [imageList, setImageList] = useState([]);
  const [question, setQuestion] = useState(randomQuestions[0]);
  let [counter, setCounter] = useState(0);
  const [diary, setDiary] = useState("");
  const [price, setPrice] = useState();
  const select1 = Object.keys(Location);
  const [selected, setSelected] = useState(select1[0]);
  const [city, setCity] = useState(Location[selected][0]);
  const [tags, setTags] = useState([]);

  //post
  const submitHandler = () => {
    const diaryInfo = {
      // Id: Id,
      nickname: "dlwlrma",
      title: title,
      year: year,
      month: month,
      day: day,
      weather: weather,
      imageList: imageList,
      question: question,
      counter: counter,
      diary: diary,
      price: price,
      selected: selected,
      city: city,
      tags: tags,
    };
    axios
      .post("http://localhost:4000/diary", diaryInfo)
      .then((res) => navigate(`/detail/${res.data.id}`))
      .then((err) => console.log(err));
    // console.log(diaryInfo);
  };
  return (
    <>
      <LoginHeader />
      <Section>
        <Container>
          <DiaryTitle
            title={title}
            setTitle={setTitle}
            weather={weather}
            setWeather={setWeather}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
          />
          <DiaryImg imageList={imageList} setImageList={setImageList} />
          <DiaryText
            question={question}
            setQuestion={setQuestion}
            counter={counter}
            setCounter={setCounter}
            diary={diary}
            setDiary={setDiary}
            randomQuestions={randomQuestions}
          />
          <DiaryPrice price={price} setPrice={setPrice} />
          <DiaryPlace
            Location={Location}
            selected={selected}
            setSelected={setSelected}
            city={city}
            setCity={setCity}
            select1={select1}
          />
          <DiaryHashtag tags={tags} setTags={setTags} />
          <BtnArea>
            <MintLineButton className="submit" text="등록" handleSubmit={submitHandler}></MintLineButton>
            <CancelModal />
            {/* <MintButton className="cancel" text="취소"></MintButton> */}
          </BtnArea>
        </Container>
      </Section>
    </>
  );
};

export default Diary;
