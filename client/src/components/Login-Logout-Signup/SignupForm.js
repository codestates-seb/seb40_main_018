import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkLineButton from "../Button/DarkLineButton";
import DarkMintButton from "../Button/DarkMintButton";
// import MintCard from "../Card/MintCard";
import ShortInput from "../Input/ShortInput";

export const Box = styled.div`
  border: 1px solid green;
  width: 500px;
  height: 400px;
  justify-content: center;
  text-align: center;
`;

export const InputContainer = styled.div`
  border: 1px solid yellow;
  margin: 47.56px 0px 12.14px 0px;
  padding-left: 57.26px;
`;

export const ButtonContainer = styled.div`
  border: 1px solid pink;
  margin-bottom: 25.39px;
`;

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [nameErrMsg, setNameErroMsg] = useState("");

  const checkInputVal = () => {
    if (name.length <= 0) {
      setNameErroMsg("닉네임을 입력해주세요.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkInputVal) {
      return false;
    }
  };

  return (
    <Box>
      {/* <MintCard width="500px " height="400px"> */}
      <InputContainer>
        <ShortInput label="Display name" text="닉네임" value={name} handleValue={setName} errorMsg={nameErrMsg} />
        <ShortInput text="이메일입력" />
        <ShortInput text="비밀번호" />
        <ShortInput text="비밀번호 확인" />
      </InputContainer>
      <ButtonContainer>
        <Link to="/login">
          <DarkMintButton width="74px" text="로그인" />
        </Link>
        <Link to="/">
          <DarkLineButton width="74px" text="가입하기" onClick={handleSubmit} />
        </Link>
      </ButtonContainer>
      {/* </MintCard> */}
    </Box>
  );
};
