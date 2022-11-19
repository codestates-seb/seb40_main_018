import { useState } from "react";
import { Location } from "../Diary/Location";
import styled from "styled-components";
import LoginHeader from "../../components/Header/LoginHeader";
import MintLineButton from "../../components/Button/MintLineButton";
import DiaryEditTitle from "./DiaryEditTitle";
import DiaryEditImg from "./DiaryEditImg";
import DiaryEditText from "./DiaryEditText";
import DiaryEditPrice from "./DiaryEditPrice";
import DiaryEditPlace from "./DiaryEditPlace";
import DiaryEditHashtag from "./DiaryEditHashtag";
import CancelModal from "../../components/Modal/CancelModal";

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
  const select1 = Object.keys(Location);
  const [selected, setSelected] = useState(select1[0]);
  const [city, setCity] = useState(Location[selected][0]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [weather, setWeather] = useState("날씨");
  const [imageList, setImageList] = useState([]);
  // 랜덤 퀘스천이랑 카운트는 변경 불가함, 그냥 받아서 잘 뿌려주기! text는 변경 가능함
  //데이터받아올때는 여기 밑에있는 상태관리 초기값 비워야함
  const [question, setQuestion] = useState("이번 여행에서 맛있게 먹은 음식은 무엇인가요?");
  let [counter, setCounter] = useState(0);
  const text =
    "의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 대한민국의 국민이 되는 요건은 법률로 정한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다. 대한민국은 민주공화국이다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.";
  const [diary, setDiary] = useState(text);
  const [price, setPrice] = useState(150000);
  // const [tags, setTags] = useState([]);
  const [tags, setTags] = useState(["밤바다", "장범준", "회쏘"]);

  // patch
  const submitHandler = () => {
    const diaryInfo = {
      // memberId: memberId,
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
    console.log(diaryInfo);
  };
  return (
    <>
      <LoginHeader />
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
          <DiaryEditText
            question={question}
            setQuestion={setQuestion}
            counter={counter}
            setCounter={setCounter}
            diary={diary}
            setDiary={setDiary}
          />
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
    </>
  );
};

export default DiaryEdit;
