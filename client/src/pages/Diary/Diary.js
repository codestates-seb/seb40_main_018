import styled from "styled-components";
import { LoginHeader } from "../../components/Header/LoginHeader";

import MintLineButton from "../../components/Button/MintLineButton";
import MintButton from "../../components/Button/MintButton";
import DiaryTitle from "./DiaryTitle";
import DiaryImg from "./DiaryImg";
import DiaryText from "./DiaryText";
import DiaryPrice from "./DiaryPrice";
import DiaryPlace from "./DiaryPlace";
import DiaryHashtag from "./DiaryHashtag";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  margin-top: 90px;
  font-size: 14px;
`;
const Container = styled.div`
  width: 700px;
  margin-bottom: 40px;
`;
const BtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > button {
    margin-left: 20px;
  }
`;

const Diary = () => {
  return (
    <>
      <LoginHeader />
      <Section>
        <Container>
          <DiaryTitle />
          <DiaryImg />
          <DiaryText />
          <DiaryPrice />
          <DiaryPlace />
          <DiaryHashtag />
          <BtnArea>
            <MintLineButton className="submit" text="등록"></MintLineButton>
            <MintButton className="cancel" text="취소"></MintButton>
          </BtnArea>
        </Container>
      </Section>
    </>
  );
};

export default Diary;
