import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "350px")};
  height: ${(props) => (props.height ? props.height : "58px")};
  padding: 18px 20px;
  border-radius: 35px;
  box-shadow: 0 2px 2px 1px #0000002e;
  background-color: white;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`;
export const Input = styled.input`
  outline-style: none;
  border: none;
  font-size: 14px;
  width: 90%;
  color: #535353;
  background-color: transparent;
`;

// 어떻게 구현하실지 몰라서 일단 버튼 안에 넣어뒀습니다!
export const Button = styled.button`
  background: none;
  border: none;
  margin-top: 4px;
  background-color: transparent;

  > .add {
    background-color: transparent;
    cursor: pointer;
  }
`;

const CheckListInput = ({ width, height }) => {
  return (
    <InputContainer width={width} height={height}>
      <Input />
      <Button>
        <AiOutlinePlusCircle className="add" color="5E5E5E" size="18" />
      </Button>
    </InputContainer>
  );
};

export default CheckListInput;
