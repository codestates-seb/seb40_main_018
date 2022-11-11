import styled from "styled-components";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "380px")};
  height: ${(props) => (props.height ? props.height : "52px")};
  padding: 15px 20px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  margin: 15px 0;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;
const InputTitle = styled.div`
  background-color: #ffffff;
  width: auto;
  font-size: 14px;
  color: #535353;
`;

const Input = styled.input`
  outline-style: none;
  border: none;
  font-size: 14px;
  width: 70%;
  color: #535353;
  text-align: right;
`;
const ShortInput = ({ width, height, text }) => {
  return (
    <InputContainer width={width} height={height}>
      <InputTitle>{text}</InputTitle>
      <Input type="text" />
    </InputContainer>
  );
};

export default ShortInput;

// 사용예시
// <ShortInput text="이메일" />
// <ShortInput text="비밀번호" />
