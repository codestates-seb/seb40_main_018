import styled from "styled-components";

const TitleArea = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
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
  justify-content: space-between;
  margin-bottom: 40px;
`;

const Title = styled.input`
  outline-style: none;
  border: none;
  width: 100%;
  color: #535353;
  background: none;
  font-family: "shinbttf";
  font-size: 16px;
`;

// const DateInput = styled.input`
//   outline-style: none;
//   border: none;
//   background: none;
//   width: 40px;
//   text-align: right;
//   margin-right: 5px;
//   color: #535353;
//   font-family: "shinbttf";
//   font-weight: 700;
// `;

// const DateText = styled.div`
//   color: #535353;
//   width: 70px;
//   font-family: "shinbttf";
//   font-size: 16px;
// `;
const WeatherBtn = styled.button`
  border: 0;
  outline: 0;
  background: none;
  color: #535353;
  font-family: "shinbttf";
  font-size: 16px;
`;

const Select = styled.select`
  font-family: "shinbttf";
  border: none;
  appearance: none;
`;

const Option = styled.option`
  font-family: "shinbttf";
`;

const DiaryTitle = () => {
  return (
    <TitleArea>
      <InputContainer width="380px">
        <Title placeholder="제목" />
      </InputContainer>
      <InputContainer width="280px">
        <Select>
          <Option>----</Option>
        </Select>
        <div>년</div>
        <Select>
          <Option>--</Option>
        </Select>
        <div>월</div>
        <Select>
          <Option>--</Option>
        </Select>
        <div>일</div>
        {/* <DateText>
          <DateInput placeholder="2022" />년
        </DateText>
        <DateText>
          <DateInput placeholder="11" />월
        </DateText>
        <DateText>
          <DateInput placeholder="14" />일
        </DateText> */}
        <WeatherBtn>날씨</WeatherBtn>
      </InputContainer>
    </TitleArea>
  );
};
export default DiaryTitle;
