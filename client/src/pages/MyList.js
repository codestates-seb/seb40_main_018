import styled from "styled-components";
import LoginHeader from "../components/Header/LoginHeader";
import { BucketListModal } from "../components/Modal/BucketList/BucketListModal";
import { CheckListModal } from "../components/Modal/CheckList/CheckListModal";

const Block = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  margin-top: 178px;
`;

const Box = styled.div`
  display: flex;
  column-gap: 84px;

  @media screen and (max-width: 1160px) {
    flex-direction: column;
    row-gap: 84px;
  }
`;

function MyList() {
  return (
    <Block>
      <LoginHeader />
      <Box>
        <CheckListModal />
        <BucketListModal />
      </Box>
    </Block>
  );
}

export default MyList;
