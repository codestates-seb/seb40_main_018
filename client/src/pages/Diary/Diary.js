import styled from "styled-components";
// import React from "react";
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
          <div className="buttonArea">
            <MintLineButton className="submit" text="등록"></MintLineButton>
            <MintButton className="cancel" text="취소"></MintButton>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Diary;
