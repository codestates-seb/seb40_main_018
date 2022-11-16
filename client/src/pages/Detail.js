import styled from "styled-components";
import DarkMintButton from "../components/Button/DarkMintButton";
import { IoIosArrowDropdown } from "react-icons/io";
import SimpleImageSlider from "react-simple-image-slider";

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
  width: 110px;
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
// const Tag = styled.div``;
const BtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
const DeleteBtn = styled.button`
  font-size: 12px;
  color: #afafaf;
  background-color: #fbfbfb;
  border: none;
  outline: none;
  margin-left: 5px;
`;
const CommentContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  margin-bottom: 50px;
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
const CommentInputArea = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;
const CommentsArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background-color: #f1f1f1;
  border-radius: 10px;
`;
const CommentTextArea = styled.div``;
const CommentNickname = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #40d8d8;
  margin-bottom: 8px;
`;
const Comment = styled.div`
  font-size: 13px;
  color: #535353;
`;
const CommentBtnArea = styled.div``;
const CommentEditBtn = styled(EditBtn)`
  background-color: #f1f1f1;
`;
const CommentDeleteBtn = styled(DeleteBtn)`
  background-color: #f1f1f1;
`;
const Detail = () => {
  const tags = ["밤바다", "장범준", "회쏘"];
  const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
  ];
  return (
    <Section>
      <DiaryContainer>
        <TitleArea>
          <Title>스트로베리문</Title>
          <DateArea>
            <DateInfo>
              <DateText>2022년</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>11월</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>16일</DateText>
            </DateInfo>

            <Weather>맑음</Weather>
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
            // bgColor="#E1DFE9"
          />
        </IMGArea>
        <DiaryArea>
          <HeartAndNickname>
            <button>heart</button>
            <Nickname>dlwlrma</Nickname>
          </HeartAndNickname>
          <RandomQuestion>최고의 여행 명소는 어디였나요?</RandomQuestion>
          <DiaryText>
            의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 누구든지 체포 또는 구속을 당한 때에는 즉시
            변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는
            바에 의하여 국가가 변호인을 붙인다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 국정감사 및 조사에 관한
            절차 기타 필요한 사항은 법률로 정한다. 국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국
            영역안에서의 주류에 대한 동의권을 가진다. 대한민국의 국민이 되는 요건은 법률로 정한다. 국가는 과학기술의
            혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 국회는 법률에 저촉되지 아니하는
            범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써
            보호한다. 예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다.
            대한민국은 민주공화국이다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다.
            선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를
            당선자로 한다.
          </DiaryText>
        </DiaryArea>
        <PlaceAndPrice>
          <PlaceArea>전라남도 여수</PlaceArea>
          <PriceArea>총 예산 : 150000 ₩</PriceArea>
        </PlaceAndPrice>
        <TagsArea>
          {tags.map((el) => (
            <DarkMintButton key={el.id} text={el} />
          ))}
        </TagsArea>
        <BtnArea>
          <EditBtn>수정</EditBtn>
          <DeleteBtn>삭제</DeleteBtn>
        </BtnArea>
      </DiaryContainer>
      <CommentContainer>
        <CommentTitleArea>
          <CommentTitle>댓글</CommentTitle>
          <IoIosArrowDropdown color="#535353" size="22" />
        </CommentTitleArea>
        <CommentInputArea>
          <input />
        </CommentInputArea>
        <CommentsArea>
          <CommentTextArea>
            <CommentNickname>jisoo</CommentNickname>
            <Comment>어머어머 글이 너무 감성적이시네요~~ 짱짱맨</Comment>
          </CommentTextArea>
          <CommentBtnArea>
            <CommentEditBtn>수정</CommentEditBtn>
            <CommentDeleteBtn>삭제</CommentDeleteBtn>
          </CommentBtnArea>
        </CommentsArea>
      </CommentContainer>
    </Section>
  );
};

export default Detail;
