import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "350px")};
  height: ${(props) => (props.height ? props.height : "58px")};
  padding: 18px 20px;
  border-radius: 35px;
  box-shadow: 0 2px 2px 1px #0000002e;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  outline-style: none;
  border: none;
  font-size: 14px;
  width: 90%;
  color: #535353;
`;

// 어떻게 구현하실지 몰라서 일단 버튼 안에 넣어뒀습니다!
const Button = styled.button`
  background: none;
  border: none;
`;

const CheckListInput = () => {
  return (
    <InputContainer>
      <Input />
      <Button>
        <AiOutlinePlusCircle color="5E5E5E" size="24" />
      </Button>
    </InputContainer>
  );
};

export default CheckListInput;
