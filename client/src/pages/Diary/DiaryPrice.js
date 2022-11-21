import styled from "styled-components";
import { BiWon } from "react-icons/bi";

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

const PriceArea = styled(InputContainer)`
  width: 216px;
`;
const TitleText = styled.span`
  white-space: nowrap;
`;

const Price = styled.input`
  outline-style: none;
  border: none;
  background: none;
  width: 70%;
  text-align: right;
  & ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const DiaryPrice = ({ price, setPrice }) => {
  const onChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  return (
    <PriceArea>
      <TitleText>경비 :</TitleText>
      <Price type="number" value={price} onChange={onChangeHandler} />
      <BiWon />
    </PriceArea>
  );
};
export default DiaryPrice;
