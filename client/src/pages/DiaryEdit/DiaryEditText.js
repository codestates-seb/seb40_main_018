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
const DiaryEditText = () => {
  // const randomQuestions = [
  //   "이번 여행에서 맛있게 먹은 음식은 무엇인가요?",
  //   "가장 좋았던 장소는 어디였나요?",
  //   "이번 여행에서 가장 인상 깊었던 향기는 무엇인가요?",
  //   "이번 여행에서 가장 귀찮았던 일은 무엇인가요?",
  //   "이번 여행에서 산책하는 강아지랑 인사 몇번 하셨나요?",
  //   "오랫동안 기억하고 싶은 장면은 무엇인가요?",
  //   "가장 마음에 드는 사진은 무엇인가요?",
  //   "다음에 이곳에 다시 여행을 온다면 누구와 함께 오고 싶나요?",
  //   "이번 여행에서 가장 특별했던 만남은 무엇이었나요?",
  //   "이번 여행의 주제곡을 골라보자면 무엇일까요?",
  //   "최고의 여행 명소는 어디였나요?",
  //   "이번 여행에서 먹었던 음식중에 술안주로 제격인 음식은 무엇인가요?",
  //   "나는 어떤 취향의 여행자일까요?",
  //   "이번 여행에서 가장 중요했던 한가지는 무었이었나요?",
  //   "이번 여행 중 나만 알고 싶은 사진 명소는 어디인가요?",
  //   "여행에서 자주 들은 노래는 무엇인가요?",
  // ];
  const text =
    "의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다. 정당의 설립은 자유이며, 복수정당제는 보장된다. 국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 대한민국의 국민이 되는 요건은 법률로 정한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다. 예비비는 총액으로 국회의 의결을 얻어야 한다. 예비비의 지출은 차기국회의 승인을 얻어야 한다. 대한민국은 민주공화국이다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.";

  const [diaryText, setDiaryText] = useState(text);

  const onChangeHandler = (e) => {
    setDiaryText(e.target.value);
  };
  return (
    <TextArea>
      <QuestionArea>
        {/* 질문이랑 카운트 동적으로 받아오기 -변경은 불가함 */}
        <Question>Random Question : 여행에서 자주 들은 노래는 무엇인가요?</Question>
        <RandomArea>
          <NumCount>2/3</NumCount>
          <MdOutlineChangeCircle size="20" color="#535353" />
        </RandomArea>
      </QuestionArea>
      <WriteArea>
        <DiaryWrite placeholder="이곳에 여행일지를 기록 해주세요." onChange={onChangeHandler}>
          {diaryText}
        </DiaryWrite>
      </WriteArea>
    </TextArea>
  );
};
export default DiaryEditText;
