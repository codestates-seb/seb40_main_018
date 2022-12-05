import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
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
  const id = useParams().id;
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
  const [addImage, setAddImage] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}diary/` + id, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const timer = setTimeout(() => {
          setSelected(res.data.data.area);
          setCity(res.data.data.city);
          setTitle(res.data.data.title);
          setYear(res.data.data.year);
          setMonth(res.data.data.month);
          setDay(res.data.data.day);
          setWeather(res.data.data.weather);
          setQuestion(res.data.data.question);
          setDiary(res.data.data.content);
          setPrice(res.data.data.cost);
          setTags(res.data.data.tags);
          setImageList(res.data.data.diaryImages);
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
    console.log(diaryInfo, imageList);
    const formData = new FormData();
    formData.append("diaryPostDto", new Blob([JSON.stringify(diaryInfo)], { type: "application/json" }));
    Array.from(imageList).forEach((el) => {
      formData.append("imgFiles", el);
    });

    console.log("imageList", imageList);

    for (const key of formData.keys()) {
      console.log("key", key);
    }

    for (const value of formData.values()) {
      console.log("value", value);
    }
    // console.log("formDataFile", formData.getAll("file"));
    console.log("formData", formData);

    const accessToken = localStorage.getItem("accessToken");

    axios
      .patch(`${process.env.REACT_APP_API_URL}diary/` + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .then((res) => navigate(`/detail/${res.data.diaryId}`))
      .then((err) => console.log(err));
  };
  return (
    <>
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
            <DiaryEditImg
              imageList={imageList}
              setImageList={setImageList}
              addImage={addImage}
              setAddImage={setAddImage}
            />
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
