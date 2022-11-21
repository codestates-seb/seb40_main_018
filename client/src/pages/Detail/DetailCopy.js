import styled from "styled-components";

import { useState, useEffect } from "react";
import DarkMintButton from "../../components/Button/DarkMintButton";
// import CheckListInput from "../components/Input/CheckListInput";

import { IoIosArrowDropdown } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import SimpleImageSlider from "react-simple-image-slider";
import DeleteModal from "../../components/Modal/DeleteModal";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/Modal/CheckList/CheckInput";
import { MdOutlineUpdate } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
  width: 140px;
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
const CommentsArea = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 12px;
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
  width: 600px;
`;
const CommentBtnArea = styled.div``;
const CommentEditBtn = styled(EditBtn)`
  background-color: #f1f1f1;
`;
const CommentDeleteBtn = styled(DeleteBtn)`
  background-color: #f1f1f1;
`;
const CommentEditInput = styled.input`
  outline-style: none;
  /* border: none; */
  background-color: #f1f1f1;
  width: 600px;
`;

const DetailCopy = () => {
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
  console.log(setDiaryDetail);
  const [like, setLike] = useState(false);
  const [input, setInput] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);

  const [editComment, setEditComment] = useState(null);
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
      .get(`http://localhost:4001/comments`)
      .then((res) => {
        console.log(res.data);
        setCommentArray(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 하트
  const onClickHandler = () => {
    setLike(!like);
  };

  // 다이어리 본문 수정버튼
  const editBtnHandler = () => {
    console.log("수정페이지로 이동");
    navigate(`/diaryedit/` + id);
  };

  // 댓글 추가
  // axios post
  // const onChangeHandler = (e) => {
  //   setInput(e.target.value);
  // };

  const commentAddHandler = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    } else {
      setCommentArray([...commentArray, { commentId: uuidv4(), userName: "kim", comment: input }]);
      setInput("");
    }
    // const editComment = {
    //   commentId: uuidv4(),
    //   userName: "kim",
    //   comment: input,
    // };
    // axios.post(`http://localhost:4001/comments`, editComment);
  };

  // 댓글 수정버튼
  // const commentEditInputHandler = (e) => {
  //   setCommentInput(e.target.value);
  // };

  // const commentEditBtn = ({ id }) => {
  //   const filtered = commentArray.filter((el) => el.id === id);
  //   console.log("filtered", filtered[0].id);
  //   setIsEdit(true);
  // };

  // 댓글 수정 완료하면 server로 보내기 -> 보내고 다시 get? 아니면 그냥 update가 되나? 아니면 useEffect get(){,[여기함수를 써줘야할까...?]}
  // const commentSaveBtn = () => {
  //   // axios patch?
  //   setIsEdit(false);
  //   console.log("댓글 수정완료");
  // };

  // New Edit
  const updateComment = (comment, id, userName) => {
    const newComment = commentArray.map((el) => (el.id === id ? { comment, id, userName } : el));
    setCommentArray(newComment);
    setEditComment("");
  };

  const handleEdit = ({ id }) => {
    const findComment = commentArray.find((el) => el.id === id);
    setEditComment(findComment);
  };

  useEffect(() => {
    if (editComment) {
      setInput(editComment.comment);
    } else {
      setInput("");
    }
  }, [setInput, editComment]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    if (!editComment) {
      setCommentArray([...commentArray, { id: uuidv4(), userName: "kim", comment: input }]);
      setInput("");
    } else {
      updateComment(input, editComment.id, editComment.userName);
    }
  };

  // 댓글 삭제
  const commentDeleteHandler = ({ id }) => {
    // axios delete
    console.log("댓글 삭제");
    setCommentArray(commentArray.filter((el) => el.id !== id));
  };

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
            <Nickname>{diaryDetail.nickname}</Nickname>
          </HeartAndNickname>
          <RandomQuestion>{diaryDetail.question}</RandomQuestion>
          <DiaryText>{diaryDetail.diary}</DiaryText>
        </DiaryArea>
        <PlaceAndPrice>
          <PlaceArea>
            {diaryDetail.selected} {diaryDetail.city}
          </PlaceArea>
          <PriceArea>총 예산 : {diaryDetail.price} ₩</PriceArea>
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
        <form onSubmit={commentSubmit}>
          <CommentInputArea>
            {/* <form onSubmit={commentSubmit}> */}
            <Input
              type="text"
              value={input}
              required
              onChange={onInputChange}
              width="100%"
              height="36px"
              placeholder="댓글을 입력해주세요."
            />
            <Button type="submit">
              {editComment ? (
                <MdOutlineUpdate className="update" color="5E5E5E" size="18" />
              ) : (
                <AiOutlinePlusCircle className="add" color="5E5E5E" size="18" />
              )}
            </Button>
            {/* </form> */}
          </CommentInputArea>
          {commentArray.map((el) => (
            <CommentsArea key={el.id}>
              <CommentTextArea>
                <CommentNickname>{el.userName}</CommentNickname>
                {editComment ? (
                  //    onChange={(e) => e.preventDefault()}
                  <CommentEditInput type="text" value={el.comment} />
                ) : (
                  <Comment>{el.comment}</Comment>
                )}
              </CommentTextArea>

              <CommentBtnArea>
                {!editComment ? (
                  <CommentEditBtn onClick={() => handleEdit(el)}>수정</CommentEditBtn>
                ) : (
                  <CommentEditBtn onClick={() => commentAddHandler}>저장</CommentEditBtn>
                )}

                <CommentDeleteBtn onClick={() => commentDeleteHandler(el)}>삭제</CommentDeleteBtn>
              </CommentBtnArea>
            </CommentsArea>
          ))}
        </form>
      </CommentContainer>
    </Section>
  );
};

export default DetailCopy;
