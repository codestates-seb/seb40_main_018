import styled from "styled-components";
import { LoginHeader } from "../../components/Header/LoginHeader";

import MintLineButton from "../../components/Button/MintLineButton";
import MintButton from "../../components/Button/MintButton";
import DiaryEditTitle from "./DiaryEditTitle";
import DiaryEditImg from "./DiaryEditImg";
import DiaryEditText from "./DiaryEditText";
import DiaryEditPrice from "./DiaryEditPrice";
import DiaryEditPlace from "./DiaryEditPlace";
import DiaryEditHashtag from "./DiaryEditHashtag";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  margin-top: 63px;
  padding-top: 50px;
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

const DiaryEdit = () => {
  return (
    <>
      <LoginHeader />
      <Section>
        <Container>
          <DiaryEditTitle />
          <DiaryEditImg />
          <DiaryEditText />
          <DiaryEditPrice />
          <DiaryEditPlace />
          <DiaryEditHashtag />
          <BtnArea>
            <MintLineButton className="submit" text="수정"></MintLineButton>
            <MintButton className="cancel" text="취소"></MintButton>
          </BtnArea>
        </Container>
      </Section>
    </>
  );
};

export default DiaryEdit;
