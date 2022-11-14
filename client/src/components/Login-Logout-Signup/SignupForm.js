import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkLineButton from "../Button/DarkLineButton";
import DarkMintButton from "../Button/DarkMintButton";
import MintCard from "../Card/MintCard";
import ShortInput from "../Input/ShortInput";

export const Move = styled.div`
  background-color: transparent;
  position: relative;
  z-index: 2;
  margin-top: -402px;
`;

export const InputContainer = styled.div`
  background-color: transparent;
  /* border: 1px solid yellow; */
  margin: 57.56px 0px 22.14px 0px;
  padding-left: 57.26px;
  padding-right: 57.26px;
`;

export const ButtonContainer = styled.div`
  background-color: transparent;
  text-align: center;
  /* border: 1px solid pink; */
`;

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [pwdErrMsg2, setPwdErrMsg2] = useState("");

  const isValid = (type, value) => {
    const pattern = {
      // 숫자, 영어, 한국어와 언더스코어, 공백 허용, 최소 2자 닉네임
      nickname: /^[가-힣ㄱ-ㅎa-zA-Z0-9]{2,}\$/,
      // 숫자 (0~9) or 알파벳 (a~z, A~Z) 으로 시작하며 중간에 -_. 문자가 있을 수 있으며 그 후 숫자 (0~9) or 알파벳 (a~z, A~Z)이 올 수도 있고 연달아 올 수도 있고 없을 수도 있다.
      // @ 는 반드시 존재하며 . 도 반드시 존재하고 a~z, A~Z 의 문자가 2,3개 존재하고 i = 대소문자 구분 안한다.
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      password: /^[a-zA-Z0-9]{4,12}$/,
    };

    if (type === "name") {
      return pattern.nickname.test(value);
    } else if (type === "email") {
      return pattern.email.test(value);
    } else {
      return pattern.password.test(value);
    }
  };

  const checkInputVal = () => {
    if (name.length <= 0) {
      setNameErrMsg("닉네임을 입력해주세요.");
      return false;
    } else if (!isValid("name", name)) {
      setNameErrMsg("닉네임은 2자의 한글, 영문 대소문자와 숫자로만 입력하여 주세요.");
    }

    if (email.length <= 0) {
      setEmailErrMsg("이메일 주소를 입력해주세요.");
      return false;
    } else if (!isValid("email", email)) {
      setEmailErrMsg("올바른 이메일 형식이 아닙니다.");
    }

    // 비번 과 비번확인 같아야 함
    if (password.length <= 0) {
      setPwdErrMsg("비밀번호를 입력해주세요.");
      return false;
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");
    }

    if (password.length !== password2.length) {
      setPwdErrMsg2("비밀번호가 일치하지 않습니다. 다시 확인하여 입력해주세요");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkInputVal) {
      return false;
    }
  };

  return (
    <>
      <MintCard width="500px" height="400px" />
      <Move>
        <InputContainer>
          <ShortInput title="Display name" text="닉네임" value={name} handleValue={setName} errorMsg={nameErrMsg} />
          <ShortInput text="이메일입력" value={email} handleValue={setEmail} errorMsg={emailErrMsg} />
          <ShortInput text="비밀번호" value={password} handleValue={setPassword} errorMsg={pwdErrMsg} type="password" />
          <ShortInput
            text="비밀번호 확인"
            value={password2}
            handleValue={setPassword2}
            errorMsg={pwdErrMsg2}
            type="password"
          />
        </InputContainer>
        <ButtonContainer>
          <Link to="/login">
            <DarkMintButton width="74px" text="로그인" />
          </Link>
          <DarkLineButton width="74px" text="가입하기" handleSubmit={handleSubmit} />
        </ButtonContainer>
      </Move>
    </>
  );
};
