import styled from "styled-components";
import { BucketListModal } from "../BucketList/BucketListModal";
import { CheckListModal } from "../CheckList/CheckListModal";

const Block = styled.div`
  /* border: 1px solid grey; */
  margin-top: 322px;
  padding-left: 320px;
  width: 100%;

  > p {
    color: #535353;
    margin-bottom: 5px;
    font-size: 12px;
  }
`;

function MyListButton() {
  return (
    <Block>
      <p>이 안에 리스트를 작성할 수 있어요. 클릭해보세요!</p>
      <CheckListModal />
      <BucketListModal />
    </Block>
  );
}

export default MyListButton;
