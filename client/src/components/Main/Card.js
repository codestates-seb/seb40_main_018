import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";
import DarkMintTag from "../Tag/DarkMintTag";

const Main = styled.div`
  display: grid;
  gap: 100px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  @media screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const CardBox = styled.div`
  background-color: white;
  width: 320px;
  height: 480px;
  border-radius: 15px;
  padding: 20px 20px 25px 20px;
  display: grid;
  text-decoration: none !important;
  flex-direction: column;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const Id = styled.div`
  width: 280px;
  font-size: 12px;
`;

const Cardtitle = styled.div`
  width: 280px;
  font-size: 12px;
`;

const Cardcontents = styled.div`
  width: 280px;
  height: 42px;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Preview = styled.div`
  width: 280px;
  height: 280px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MintWrapper = styled.div`
  width: 160px;
  height: 30px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Region = styled.div`
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
`;

const Budget = styled.div`
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
`;

const TagContainer = styled.div`
  display: flex;
`;
const Heart = styled.div`
  margin-bottom: 240px;
  margin-left: 240px;
  cursor: pointer;
  /* display: flex;
  justify-content: flex-end;
  align-items: flex-start; */
`;
export const Card = () => {
  const [like, setLike] = useState(false);

  const onClickHandler = () => {
    setLike(!like);
  };
  return (
    <>
      <Main>
        <CardBox>
          <Preview>
            <Heart>
              {like ? (
                <FaHeart color="#DF4949" onClick={onClickHandler} />
              ) : (
                <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
              )}
            </Heart>
          </Preview>
          <Id>youthmn</Id>
          <Cardtitle>아이유 스트로베리문 들어보세요</Cardtitle>
          <Cardcontents>
            달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴
            팽팽한 어둠 사이로 떠오르는 기분 이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란
            strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더
            완벽해 ooh 다시 마주하기 어려운 행운이야 온몸에 심장이 뛰어 Oh 오히려 기꺼이 헤매고픈 밤이야 너와 길 잃을 수
            있다면 맞잡은 서로의 손으로 출입구를 허문 이 무한함의 끝과 끝 또 위아래로 비행을 떠날 거야 푸르른 우리 위로
            커다란 strawberry moon 한 스쿱
          </Cardcontents>
          <MintWrapper>
            <Region>전라북도 전주</Region>
            <Budget>150,000₩</Budget>
          </MintWrapper>
          <TagContainer>
            <DarkMintTag text="밤바다" height="16px" />
            <DarkMintTag text="장범준" height="16px" />
          </TagContainer>
        </CardBox>
        <CardBox>
          <Preview>
            <Heart>
              {like ? (
                <FaHeart color="#DF4949" onClick={onClickHandler} />
              ) : (
                <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
              )}
            </Heart>
          </Preview>
          <Id>youthmn</Id>
          <Cardtitle>아이유 스트로베리문 들어보세요</Cardtitle>
          <Cardcontents>
            달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴
            팽팽한 어둠 사이로 떠오르는 기분 이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란
            strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더
            완벽해 ooh 다시 마주하기 어려운 행운이야 온몸에 심장이 뛰어 Oh 오히려 기꺼이 헤매고픈 밤이야 너와 길 잃을 수
            있다면 맞잡은 서로의 손으로 출입구를 허문 이 무한함의 끝과 끝 또 위아래로 비행을 떠날 거야 푸르른 우리 위로
            커다란 strawberry moon 한 스쿱
          </Cardcontents>
          <MintWrapper>
            <Region>전라북도 전주</Region>
            <Budget>150,000₩</Budget>
          </MintWrapper>
          <TagContainer>
            <DarkMintTag text="밤바다" height="16px" />
            <DarkMintTag text="장범준" height="16px" />
          </TagContainer>
        </CardBox>
        <CardBox>
          <Preview>
            <Heart>
              {like ? (
                <FaHeart color="#DF4949" onClick={onClickHandler} />
              ) : (
                <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
              )}
            </Heart>
          </Preview>
          <Id>youthmn</Id>
          <Cardtitle>아이유 스트로베리문 들어보세요</Cardtitle>
          <Cardcontents>
            달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴
            팽팽한 어둠 사이로 떠오르는 기분 이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란
            strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더
            완벽해 ooh 다시 마주하기 어려운 행운이야 온몸에 심장이 뛰어 Oh 오히려 기꺼이 헤매고픈 밤이야 너와 길 잃을 수
            있다면 맞잡은 서로의 손으로 출입구를 허문 이 무한함의 끝과 끝 또 위아래로 비행을 떠날 거야 푸르른 우리 위로
            커다란 strawberry moon 한 스쿱
          </Cardcontents>
          <MintWrapper>
            <Region>전라북도 전주</Region>
            <Budget>150,000₩</Budget>
          </MintWrapper>
          <TagContainer>
            <DarkMintTag text="밤바다" height="16px" />
            <DarkMintTag text="장범준" height="16px" />
          </TagContainer>
        </CardBox>
        <CardBox>
          <Preview>
            <Heart>
              {like ? (
                <FaHeart color="#DF4949" onClick={onClickHandler} />
              ) : (
                <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
              )}
            </Heart>
          </Preview>
          <Id>youthmn</Id>
          <Cardtitle>아이유 스트로베리문 들어보세요</Cardtitle>
          <Cardcontents>
            달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴
            팽팽한 어둠 사이로 떠오르는 기분 이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란
            strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더
            완벽해 ooh 다시 마주하기 어려운 행운이야 온몸에 심장이 뛰어 Oh 오히려 기꺼이 헤매고픈 밤이야 너와 길 잃을 수
            있다면 맞잡은 서로의 손으로 출입구를 허문 이 무한함의 끝과 끝 또 위아래로 비행을 떠날 거야 푸르른 우리 위로
            커다란 strawberry moon 한 스쿱
          </Cardcontents>
          <MintWrapper>
            <Region>전라북도 전주</Region>
            <Budget>150,000₩</Budget>
          </MintWrapper>
          <TagContainer>
            <DarkMintTag text="밤바다" height="16px" />
            <DarkMintTag text="장범준" height="16px" />
          </TagContainer>
        </CardBox>
        <CardBox>
          <Preview>
            <Heart>
              {like ? (
                <FaHeart color="#DF4949" onClick={onClickHandler} />
              ) : (
                <FiHeart color="#DF4949" fill="#646464" onClick={onClickHandler} />
              )}
            </Heart>
          </Preview>
          <Id>youthmn</Id>
          <Cardtitle>아이유 스트로베리문 들어보세요</Cardtitle>
          <Cardcontents>
            달이 익어가니 서둘러 젊은 피야 민들레 한 송이 들고 사랑이 어지러이 떠다니는 밤이야 날아가 사뿐히 이루렴
            팽팽한 어둠 사이로 떠오르는 기분 이 거대한 무중력에 혹 휘청해도 두렵진 않을 거야 푸르른 우리 위로 커다란
            strawberry moon 한 스쿱 나에게 너를 맡겨볼래 eh oh 바람을 세로질러 날아오르는 기분 so cool 삶이 어떻게 더
            완벽해 ooh 다시 마주하기 어려운 행운이야 온몸에 심장이 뛰어 Oh 오히려 기꺼이 헤매고픈 밤이야 너와 길 잃을 수
            있다면 맞잡은 서로의 손으로 출입구를 허문 이 무한함의 끝과 끝 또 위아래로 비행을 떠날 거야 푸르른 우리 위로
            커다란 strawberry moon 한 스쿱
          </Cardcontents>
          <MintWrapper>
            <Region>전라북도 전주</Region>
            <Budget>150,000₩</Budget>
          </MintWrapper>
          <TagContainer>
            <DarkMintTag text="밤바다" height="16px" />
            <DarkMintTag text="장범준" height="16px" />
          </TagContainer>
        </CardBox>
      </Main>
    </>
  );
};
