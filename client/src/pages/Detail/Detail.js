import styled from "styled-components";
import DarkMintButton from "../../components/Button/DarkMintButton";
// import CheckListInput from "../components/Input/CheckListInput";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Comment from "./Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

  > button {
    border: none;
  }
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
  /* width: 165px; */
  width: auto;
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
  const id = useParams().id;
  const navigate = useNavigate();

  const images = [
    { url: "images/1.jpg" },
    { url: "images/2.jpg" },
    { url: "images/3.jpg" },
    { url: "images/4.jpg" },
    { url: "images/5.jpg" },
    { url: "images/6.jpg" },
    { url: "images/7.jpg" },
  ];
  const [diaryDetail, setDiaryDetail] = useState([]);
  const [imageList, setImageList] = useState(images);
  const [user, setUser] = useState("Jisoo");
  const [like, setLike] = useState(false);

  // const [isEdit, setIsEdit] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/diary/` + id)
      .then((res) => {
        console.log(res.data);
        setDiaryDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4002/image/` + id, {
        responseType: "blob",
      })
      // .then((res) => {
      //   console.log(res.data);
      //   // setImageList(res.data);
      // })
      .then((res) => {
        console.log("res", res);
        const myFile = new File("file[]");
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewImage = e.target.result;
          setImageList(previewImage);
        };
        reader.readAsDataURL(myFile);
      })
      .catch((err) => console.log(err));
  }, []);

  // 하트
  const onClickHandler = () => {
    setLike(!like);

    const patch2 = {
      like: !like,
    };

    axios
      .patch(`http://localhost:4000/diary/` + id, patch2)
      .then((res) => console.log(res))
      .then((err) => console.log("res1", err));
  };

  // 다이어리 본문 수정버튼
  const editBtnHandler = () => {
    navigate(`/diaryedit/` + id);
  };

  const formatter = new Intl.NumberFormat("ko");

  return (
    <Section>
      <DiaryContainer>
        <TitleArea>
          <Title>{diaryDetail.title}</Title>
          <DateArea>
            <DateInfo>
              <DateText>{diaryDetail.year}년</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>{diaryDetail.month}월</DateText>
            </DateInfo>
            <DateInfo>
              <DateText>{diaryDetail.day}일</DateText>
            </DateInfo>
            <Weather>{diaryDetail.weather}</Weather>
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
            images={imageList.map((item) => {
              return item;
            })}
            // images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
            loop={true}
          />
        </IMGArea>
        <DiaryArea>
          <HeartAndNickname>
            <button onClick={() => onClickHandler()}>
              {like ? <FaHeart color="#DF4949" /> : <FiHeart color="#DF4949" fill="#646464" />}
            </button>
            <Nickname>{diaryDetail.nickname}</Nickname>
          </HeartAndNickname>
          <RandomQuestion>{diaryDetail.question}</RandomQuestion>
          <DiaryText>{diaryDetail.diary}</DiaryText>
        </DiaryArea>
        <PlaceAndPrice>
          <PlaceArea>
            {diaryDetail.selected} {diaryDetail.city}
          </PlaceArea>
          <PriceArea>총 예산 : {formatter.format(diaryDetail.price)} ₩</PriceArea>
        </PlaceAndPrice>
        <TagsArea>
          {diaryDetail.tags &&
            diaryDetail.tags.map((el, index) => <DarkMintButton key={index} text={el} width="auto" />)}
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