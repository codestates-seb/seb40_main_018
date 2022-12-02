import axios from "axios";
import { useEffect, useState } from "react";
import { Location } from "./Location";
import styled from "styled-components";
// import LoginHeader from "../../components/Header/LoginHeader";
import MintLineButton from "../../components/Button/MintLineButton";
import DiaryTitle from "./DiaryTitle";
import DiaryImg from "./DiaryImg";
import DiaryText from "./DiaryText";
import DiaryPrice from "./DiaryPrice";
import DiaryPlace from "./DiaryPlace";
import DiaryHashtag from "./DiaryHashtag";
import CancelModal from "../../components/Modal/CancelModal";
// import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { useForm } from "react-hook-form";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  padding-top: 90px;
  font-size: 14px;
`;
const Container = styled.form`
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
  // const navigate = useNavigate();
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
  const [imageList, setImageList] = useState([]);
  const [question, setQuestion] = useState(randomQuestions[0]);
  let [counter, setCounter] = useState(0);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
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

    // const diaryInfo = {
    //   ...data,
    //   // nickname: nickname,
    //   question: question,
    //   counter: counter,
    //   tags: tags,
    // };

    // console.log("diaryInfo", diaryInfo);
    const formData = new FormData();

    Array.from(imageList).forEach((el) => {
      formData.append("file", el);
    });
    formData.append("area", data.area);
    formData.append("city", data.city);
    formData.append("content", data.content);
    formData.append("cost", data.cost);
    formData.append("day", data.day);
    formData.append("month", data.month);
    formData.append("title", data.title);
    formData.append("weather", data.weather);
    formData.append("year", data.year);
    formData.append("question", data.question);
    formData.append("counter", data.counter);
    tags.map((el) => {
      formData.append("tags", el);
    });

    console.log("imageList", imageList);

    for (const key of formData.keys()) {
      console.log("key", key);
    }

    for (const value of formData.values()) {
      console.log("value", value);
    }
    console.log("formDataFile", formData.getAll("file"));
    console.log("formData", formData);

    const accessToken = localStorage.getItem("accessToken");

    // axios
    //   // .post("http://localhost:4000/diary", diaryInfo)
    //   .post(`/diary`, diaryInfo, {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   // .then((res) => console.log("Diary", res.data))
    // .then((res) => navigate(`/detail/${res.data.data.diaryId}`))
    //   .catch((err) => console.log("DiaryErr", err));

    axios
      .post(`/diary`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      })
      .then((res) => console.log("IMGres:", res))
      // .then((res) => navigate(`/detail/${res.data.data.diaryId}`))

      .catch((err) => console.log("IMGErr", err));
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <LoginHeader /> */}
      {loading ? (
        <Loading />
      ) : (
        <Section>
          <Container onSubmit={handleSubmit(onSubmit)}>
            <DiaryTitle register={register} errors={errors} />
            <DiaryImg imageList={imageList} setImageList={setImageList} />
            <DiaryText
              question={question}
              setQuestion={setQuestion}
              counter={counter}
              setCounter={setCounter}
              randomQuestions={randomQuestions}
              register={register}
              errors={errors}
            />
            <DiaryPrice register={register} errors={errors} />
            <DiaryPlace Location={Location} register={register} errors={errors} />
            <DiaryHashtag tags={tags} setTags={setTags} />
            <BtnArea>
              <MintLineButton type="submit" text="등록"></MintLineButton>
              <CancelModal />
            </BtnArea>
          </Container>
        </Section>
      )}
    </>
  );
};

export default Diary;
