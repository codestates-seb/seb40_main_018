import styled from "styled-components";
import { MdOutlineChangeCircle } from "react-icons/md";
import { useState } from "react";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "55px")};
  padding: 0 18px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TextArea = styled(InputContainer)`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  padding: 0;
`;

const QuestionArea = styled.div`
  color: #535353;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border-bottom: 1px solid #63aeae;
  padding: 25px 32px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

const Question = styled.div`
  color: #535353;
  font-size: 14px;
  /* 
  font-size: 16px;
  font-family: "shinbttf"; */
`;

const WriteArea = styled.div`
  width: 100%;
  padding: 25px 32px;
  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
`;
const DiaryWrite = styled.textarea`
  width: 100%;
  height: 360px;
  color: #535353;
  resize: none;
  overflow: hidden;
  outline: none;
  border: none;
  background: none;
  font-family: "shinbttf";
  font-size: 16px;
`;
const RandomArea = styled.div`
  display: flex;
  align-items: center;
`;

const NumCount = styled.div`
  margin-right: 5px;
`;
const DiaryText = () => {
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

  const [question, setQuestion] = useState(randomQuestions[0]);
  let [counter, setCounter] = useState(0);

  let pop = Math.floor(Math.random() * randomQuestions.length);
  const onClickHandler = () => {
    setQuestion(randomQuestions[pop]);
    setCounter(counter + 1);
  };
  return (
    <TextArea>
      <QuestionArea>
        <Question>Random Question : {question}</Question>
        <RandomArea>
          <NumCount>{counter}/3</NumCount>
          <MdOutlineChangeCircle size="20" color="#63AEAE" onClick={onClickHandler} />
        </RandomArea>
      </QuestionArea>
      <WriteArea>
        <DiaryWrite placeholder="이곳에 여행일지를 기록 해주세요."></DiaryWrite>
      </WriteArea>
    </TextArea>
  );
};
export default DiaryText;
