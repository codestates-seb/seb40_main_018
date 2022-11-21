import styled from "styled-components";
import DarkMintButton from "../../components/Button/DarkMintButton";
// import CheckListInput from "../components/Input/CheckListInput";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Comment from "./Comment";
// import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;
const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 700px;
  margin-top: 113px;
  border-bottom: 1px solid #86c1c1;
`;
const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-family: "shinbttf";
`;
const DateArea = styled.div`
  display: flex;
`;
const DateInfo = styled.div`
  display: flex;
  margin-left: 5px;
`;
const DateText = styled.div`
  font-family: "shinbttf";
`;
const Weather = styled.div`
  font-family: "shinbttf";
  margin-left: 10px;
`;
const IMGArea = styled.div`
  background-color: beige;
  width: 700px;
  height: 480px;
  margin-bottom: 46px;
`;
const DiaryArea = styled.div`
  background-color: #f1f1f1;
  width: 700px;
  height: auto;
  padding: 18px 30px;
  border-radius: 10px;
  margin-bottom: 26px;
`;
const HeartAndNickname = styled.div`
  margin-bottom: 16px;
  display: flex;
`;
const Nickname = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
  color: #378686;
`;
const RandomQuestion = styled.div`
  font-size: 13px;
  margin-bottom: 20px;
`;
const DiaryText = styled.div`
  font-family: "shinbttf";
  font-size: 14px;
  line-height: 1.5;
`;

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "55px")};
  padding: 0 18px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const PlaceAndPrice = styled.div`
  width: 700px;
  display: flex;
`;
const PlaceArea = styled(InputContainer)`
  width: 112px;
  height: 34px;
  margin-right: 24px;
  font-size: 12px;
`;
const PriceArea = styled(InputContainer)`
  width: 164px;
  height: 34px;
  font-size: 12px;
`;
const TagsArea = styled.div`
  width: 700px;
`;
const BtnArea = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  width: 700px;
  margin-bottom: 26px;
`;
const EditBtn = styled.button`
  font-size: 12px;
  color: #afafaf;
  background-color: #fbfbfb;
  border: none;
  outline: none;
`;

const CommentContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  /* border: 1px solid red; */
`;
const CommentTitleArea = styled.div`
  display: flex;
  align-items: center;
`;
const CommentTitle = styled.div`
  margin: 16px 10px 16px 18px;
  font-size: 14px;
  color: #535353;
`;

const Detail = () => {
  // const navigate =useNavigate()
  // const inputRef = useRef("");

  const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
  ];
  const title = "스트로베리문";
  const year = "2022";
  const month = "11";
  const day = "18";
  const weather = "맑음";
  const nickname = "dlwlrma";
  const question = "최고의 여행 명소는 어디였나요?";
  const diary =
    "의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 대한민국의 국민이 되는 요건은 법률로 정한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다. 대한민국은 민주공화국이다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.";
  const selected = "전라남도";
  const city = "여수";
  const price = 150000;
  const tags = ["밤바다", "장범준", "회쏘"];

  // const comments = [
  //   {
  //     commentId: 1,
  //     userName: "jisoo",
  //     comment: "어머어머 글이 너무 감성적이시네요~~ 짱짱맨",
  //   },
  //   {
  //     commentId: 2,
  //     userName: "jennie",
  //     comment:
  //       "우와 대박이다 ! 이렇게 길게 쓰면 어떻게 되지? 우와 대박이다 ! 이렇게 길게 쓰면 어떻게 되지? 우와 대박이다 ! 이렇게 길게 쓰면 어떻게 되지?",
  //   },
  // ];
  const [like, setLike] = useState(false);

  // 하트
  const onClickHandler = () => {
    setLike(!like);
  };

  // 다이어리 본문 수정버튼
  const editBtnHandler = () => {
    console.log("수정페이지로 이동");
    // navigate("/diaryedit/:id")
  };

  // 댓글 추가
  // axios post
  // const onChangeHandler = (e) => {
  //   setInput(e.target.value);
  // };

  const [user, setUser] = useState("Jisoo");

  return (
    <Section>
      <DiaryContainer>
        <TitleArea>
          <Title>{title}</Title>
          <DateArea>
            <DateInfo>
              <DateText>{year}년</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>{month}월</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>{day}일</DateText>
            </DateInfo>
            <Weather>{weather}</Weather>
          </DateArea>
        </TitleArea>
        <IMGArea>
          <SimpleImageSlider
            style={{
              backgroundSize: "contain",
              backgroundRepeat: "none",
            }}
            width={"700px"}
            height={"480px"}
            // images={imageList.map((item) => {
            //   return { url: URL.createObjectURL(item) };
            // })}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
            loop={true}
          />
        </IMGArea>
        <DiaryArea>
          <HeartAndNickname>
            {like ? (
              <FaHeart color="#DF4949" onClick={onClickHandler} />
            ) : (
              <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
            )}
            <Nickname>{nickname}</Nickname>
          </HeartAndNickname>
          <RandomQuestion>{question}</RandomQuestion>
          <DiaryText>{diary}</DiaryText>
        </DiaryArea>
        <PlaceAndPrice>
          <PlaceArea>
            {selected} {city}
          </PlaceArea>
          <PriceArea>총 예산 : {price} ₩</PriceArea>
        </PlaceAndPrice>
        <TagsArea>
          {tags.map((el) => (
            <DarkMintButton key={el.id} text={el} />
          ))}
        </TagsArea>
        <BtnArea>
          <EditBtn onClick={editBtnHandler}>수정</EditBtn>
          {/* props로 일기id 내려주기 */}
          <DeleteModal />
        </BtnArea>
      </DiaryContainer>
      <CommentContainer>
        <CommentTitleArea>
          <CommentTitle>댓글</CommentTitle>
          <IoIosArrowDropdown color="#535353" size="22" />
        </CommentTitleArea>
      </CommentContainer>
      <Comment user={user} setUser={setUser} />
    </Section>
  );
};

export default Detail;
