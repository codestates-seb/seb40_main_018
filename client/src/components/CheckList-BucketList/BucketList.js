import { BiCheckSquare } from "react-icons/bi";
import styled from "styled-components";

export const Box = styled.div`
  margin: 19px 0 19px -16px;
  background-color: white;
`;

export const Container = styled.div`
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
  /* word-break: break-all;
  word-wrap: break-word; */
`;

export const Block = styled.div`
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

export const MintLineButton2 = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 66%, 74%);
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

export const MintButton2 = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 66%, 55%);
  border: none;
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 66%, 37%);
  }
  &:active {
    background-color: hsl(180, 66%, 33%);
  }
`;

function BucketList() {
  return (
    <Box>
      <Container>
        <Block>
          <div>
            <BiCheckSquare className="check-icon" size={24} />
          </div>
          <List>피그마 최최최최종</List>
        </Block>
        <ButtonContainer>
          <MintLineButton2 width="50px" height="20px">
            수정
          </MintLineButton2>
          <MintButton2 width="50px" height="20px">
            삭제
          </MintButton2>
        </ButtonContainer>
      </Container>
      <Container>
        <Block>
          <div>
            <BiCheckSquare className="check-icon" size={24} />
          </div>
          <List>피그마 최최최최최최종최최최최최최종최최최최최최종최최최최최최종최최최최최최종최최최최최최종최최최</List>
        </Block>
        <ButtonContainer>
          <MintLineButton2 width="50px" height="20px">
            수정
          </MintLineButton2>
          <MintButton2 width="50px" height="20px">
            삭제
          </MintButton2>
        </ButtonContainer>
      </Container>
    </Box>
  );
}

export default BucketList;
