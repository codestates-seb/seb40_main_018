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
// import { useParams } from "react-router-dom";

import axios from "axios";
// import LoginHeader from "../../components/Header/LoginHeader";

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

function Detail() {
  const id = useParams().id;
  console.log("Detail-Like-id", id);
  const navigate = useNavigate();

  const [diaryDetail, setDiaryDetail] = useState([]);
  console.log("DiaryDetail", diaryDetail);
  const [imageList, setImageList] = useState([]);

  const [like, setLike] = useState();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`/diary/` + id, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setDiaryDetail(res.data.data);
        setImageList(res.data.data.diaryImages);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/likes/` + id, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => setLike(res.data.data.like));
  });
  // const myFile = new File("file[]");
  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   const previewImage = e.target.result;
  //   setImageList(previewImage);
  // };
  // reader.readAsDataURL(myFile);

  // 하트
  const onClickHandler = () => {
    setLike(!like);

    const patch2 = {
      like: !like,
    };

    axios
      .post(`/likes/` + id, patch2, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => console.log("likePost", res))
      .catch((err) => console.log("res1", err));
  };

  // 다이어리 본문 수정버튼
  const editBtnHandler = () => {
    axios
      .get(`/member/me`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        if (diaryDetail.memberId !== res.data.data.memberId) {
          alert("직접 작성한 일기만 수정가능합니다.");
          return false;
        } else if (diaryDetail.memberId === res.data.data.memberId) {
          navigate(`/diaryedit/` + id);
        }
      });
  };

  const formatter = new Intl.NumberFormat("ko");

  return (
    <>
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
              images={imageList.map((item) => {
                return item;
              })}
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
            <DiaryText>{diaryDetail.content}</DiaryText>
          </DiaryArea>
          <PlaceAndPrice>
            <PlaceArea>
              {diaryDetail.area} {diaryDetail.city}
            </PlaceArea>
            <PriceArea>총 예산 : {formatter.format(diaryDetail.cost)} ₩</PriceArea>
          </PlaceAndPrice>
          <TagsArea>
            {diaryDetail.tags &&
              diaryDetail.tags.map((el, index) => <DarkMintButton key={index} text={el} width="auto" />)}
          </TagsArea>
          <BtnArea>
            <EditBtn onClick={editBtnHandler}>수정</EditBtn>
            <DeleteModal diaryDetail={diaryDetail} />
          </BtnArea>
        </DiaryContainer>
        <CommentContainer>
          <CommentTitleArea>
            <CommentTitle>댓글</CommentTitle>
            <IoIosArrowDropdown color="#535353" size="22" />
          </CommentTitleArea>
        </CommentContainer>
        <Comment />
      </Section>
    </>
  );
}

export default Detail;
