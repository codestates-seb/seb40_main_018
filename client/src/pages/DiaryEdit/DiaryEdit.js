import axios from "axios";
import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Location } from "../Diary/Location";
import styled from "styled-components";
// import LoginHeader from "../../components/Header/LoginHeader";
import MintLineButton from "../../components/Button/MintLineButton";
import DiaryEditTitle from "./DiaryEditTitle";
import DiaryEditImg from "./DiaryEditImg";
import DiaryEditText from "./DiaryEditText";
import DiaryEditPrice from "./DiaryEditPrice";
import DiaryEditPlace from "./DiaryEditPlace";
import DiaryEditHashtag from "./DiaryEditHashtag";
import CancelModal from "../../components/Modal/CancelModal";
import Loading from "../Loading";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  margin-top: 63px;
  padding-top: 50px;
  font-size: 14px;
`;
const Container = styled.div`
  width: 700px;
  margin-bottom: 40px;
`;
const BtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  > button {
    margin-left: 20px;
  }
`;

const DiaryEdit = () => {
  // const id = useParams().id;
  const navigate = useNavigate();
  const select1 = Object.keys(Location);
  const [selected, setSelected] = useState(select1[0]);
  const [city, setCity] = useState(Location[selected][0]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [weather, setWeather] = useState("");
  const [imageList, setImageList] = useState([]);
  const [question, setQuestion] = useState("");
  const [diary, setDiary] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      // .get(`http://localhost:4000/diary/` + id)
      .get(`/diary/{diary-id}`)
      .then((res) => {
        console.log(res.data);
        const timer = setTimeout(() => {
          setSelected(res.data.area);
          setCity(res.data.city);
          setTitle(res.data.title);
          setYear(res.data.year);
          setMonth(res.data.month);
          setDay(res.data.day);
          setWeather(res.data.weather);
          setQuestion(res.data.question);
          setDiary(res.data.content);
          setPrice(res.data.cost);
          setTags(res.data.tags);
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => console.log(err));
  }, []);

  // patch
  const submitHandler = () => {
    if (imageList.length === 0) {
      console.log("imageList:", imageList);
      alert("이미지를 추가해 주세요.");
      return false;
    }
    if (tags.length < 3) {
      console.log("tags:", tags);
      alert("태그를 세개 이상 등록해 주세요.");
      return false;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const diaryInfo = {
      title: title,
      year: yearNum,
      month: monthNum,
      day: dayNum,
      weather: weather,
      question: question,
      content: diary,
      cost: price,
      area: selected,
      city: city,
      tags: tags,
    };
    axios
      // .patch(`http://localhost:4000/diary/` + id, diaryInfo)
      .patch(`/diary/{diary-id}`, diaryInfo)
      .then((res) => navigate(`/detail/${res.data.id}`))
      .then((err) => console.log(err));
  };
  return (
    <>
      {/* <LoginHeader /> */}
      {loading ? (
        <Loading />
      ) : (
        <Section>
          <Container>
            <DiaryEditTitle
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
            <DiaryEditImg imageList={imageList} setImageList={setImageList} />
            <DiaryEditText question={question} setQuestion={setQuestion} diary={diary} setDiary={setDiary} />
            <DiaryEditPrice price={price} setPrice={setPrice} />
            <DiaryEditPlace
              Location={Location}
              selected={selected}
              setSelected={setSelected}
              city={city}
              setCity={setCity}
              select1={select1}
            />
            <DiaryEditHashtag tags={tags} setTags={setTags} />
            <BtnArea>
              <MintLineButton className="submit" text="수정" handleSubmit={submitHandler}></MintLineButton>
              <CancelModal />
            </BtnArea>
          </Container>
        </Section>
      )}
    </>
  );
};

export default DiaryEdit;
