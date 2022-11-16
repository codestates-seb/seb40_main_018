// stop
import styled from "styled-components";
import { BiCheckSquare } from "react-icons/bi";
import { MintButton2, MintLineButton2 } from "./BucketList";

export const Box = styled.div`
  margin: 19px 0 19px -16px;
  background-color: white;
`;

export const Container2 = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  border-top: 1px solid #dcdcdc;
  justify-content: space-between;
  /* border: 1px solid pink; */
`;

export const List = styled.div`
  padding: 10px;
  color: #535353;
  background-color: transparent;
  line-height: 1.6;
  font-size: 14px;
`;

export const Block2 = styled.div`
  background-color: transparent;
  display: flex;
  > div {
    background-color: transparent;
    > .check-icon {
      margin-top: 10px;
      color: #535353;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  column-gap: 6px;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  background-color: transparent;
`;

function CheckList() {
  // 인풋창 비우기 - todolist
  // 완료 시 긋기
  return (
    <Box>
      <Container2>
        <Block2>
          <div>
            <BiCheckSquare className="check-icon" size={24} />
          </div>
          <List>여벌옷</List>
        </Block2>
        <ButtonContainer>
          <MintLineButton2 width="50px" height="20px">
            수정
          </MintLineButton2>
          <MintButton2 width="50px" height="20px">
            삭제
          </MintButton2>
        </ButtonContainer>
      </Container2>
      <Container2>
        <Block2>
          <div>
            <BiCheckSquare className="check-icon" size={24} />
          </div>
          <List>여벌옷</List>
        </Block2>
        <ButtonContainer>
          <MintLineButton2 width="50px" height="20px">
            수정
          </MintLineButton2>
          <MintButton2 width="50px" height="20px">
            삭제
          </MintButton2>
        </ButtonContainer>
      </Container2>
      <Container2>
        <Block2>
          <div>
            <BiCheckSquare className="check-icon" size={24} />
          </div>
          <List>여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷여벌옷</List>
        </Block2>
        <ButtonContainer>
          <MintLineButton2 width="50px" height="20px">
            수정
          </MintLineButton2>
          <MintButton2 width="50px" height="20px">
            삭제
          </MintButton2>
        </ButtonContainer>
      </Container2>
    </Box>
  );
}

export default CheckList;
