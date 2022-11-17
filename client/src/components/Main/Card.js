import styled from "styled-components";
import DarkMintTag from "../Tag/DarkMintTag";

const Main = styled.div``;

const CardBox = styled.div`
  width: 320px;
  height: 480px;
  border-radius: 15px;
  padding: 20px 20px 25px 20px;
  display: grid;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  > photo {
    width: 280px;
    height: 280px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > id {
    width: 280px;
    font-size: 12px;
  }
  > cardtitle {
    width: 280px;
    font-size: 12px;
  }
  > cardcontents {
    width: 280px;
    height: 42px;
    font-size: 11px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const MintWrapper = styled.div`
  width: 160px;
  height: 30px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > region {
    clear: both;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 16px;
    color: #535353;
    background-color: hsl(0, 0%, 100%);
    border: 1px solid hsl(180, 32%, 54%);
    border-radius: 35px;
    font-size: 10px;
    &:hover {
      background-color: hsl(180, 12%, 96%);
    }
    &:active {
      background-color: hsl(180, 12%, 92%);
    }
  }
  > budget {
    clear: both;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 16px;
    color: #535353;
    background-color: hsl(0, 0%, 100%);
    border: 1px solid hsl(180, 32%, 54%);
    border-radius: 35px;
    font-size: 10px;
    &:hover {
      background-color: hsl(180, 12%, 96%);
    }
    &:active {
      background-color: hsl(180, 12%, 92%);
    }
  }
`;

const TagWrapper = styled(DarkMintTag)`
  width: 10px;
  height: 10px;
`;

export const Card = () => {
  return (
    <>
      <Main>
        <CardBox>
          <photo>사진 들어가는 곳</photo>
          <id>youthmn</id>
          <cardtitle>제가 좋아하는 노래는 치즈의 사랑이라오입니다.</cardtitle>
          <cardcontents>
            그대 오늘 밤 할 일이 많은가요 혹시 이 연락이 그댈 방해할까 봐 한참을 고민하다 전화했어요 혹시 자고 있던
            건가요 지금 그대의 집 앞으로 갈게요 혹시 괜찮다면 만나줄수 있나요 오늘은 이상하게 용기가 생겨서 괜찮을 것
            같아 사랑을 아냐고 물었던 그날밤 난 말없이 웃어 넘겼죠
          </cardcontents>
          <MintWrapper>
            <region>전라북도 전주</region>
            <budget>150,000₩</budget>
          </MintWrapper>
          <TagWrapper>
            <DarkMintTag />
          </TagWrapper>
        </CardBox>
      </Main>
      <CardBox>
        <photo>사진 들어가는 곳</photo>
        <id>youthmn</id>
        <cardtitle>제가 좋아하는 노래는 치즈의 사랑이라오입니다.</cardtitle>
        <cardcontents>
          그대 오늘 밤 할 일이 많은가요 혹시 이 연락이 그댈 방해할까 봐 한참을 고민하다 전화했어요 혹시 자고 있던 건가요
          지금 그대의 집 앞으로 갈게요 혹시 괜찮다면 만나줄수 있나요 오늘은 이상하게 용기가 생겨서 괜찮을 것 같아 사랑을
          아냐고 물었던 그날밤 난 말없이 웃어 넘겼죠
        </cardcontents>
        <MintWrapper>
          <region>전라북도 전주</region>
          <budget>150,000₩</budget>
        </MintWrapper>
        <TagWrapper>
          <DarkMintTag />
        </TagWrapper>
      </CardBox>
    </>
  );
};
