import { useState } from "react";
import styled from "styled-components";
import DarkMintButton from "../Button/DarkMintButton";
import MintCard from "../Card/MintCard";
import ShortInput from "../Input/ShortInput";
import { ButtonContainer, InputContainer } from "./SignupForm";

export const Move = styled.div`
  background-color: transparent;
  position: relative;
  z-index: 2;
  margin-top: -252px;
`;

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");

  const isValid = (type, value) => {
    const pattern = {
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      password: /^[a-zA-Z0-9]{4,12}$/,
    };

    if (type === "email") {
      return pattern.email.test(value);
    } else {
      return pattern.password.test(value);
    }
  };

  const checkInputVal = () => {
    if (email.length <= 0) {
      setEmailErrMsg("이메일 주소를 입력해주세요.");
      return false;
    } else if (!isValid("email", email)) {
      setEmailErrMsg("올바른 이메일 형식이 아닙니다.");
    }

    if (password.length <= 0) {
      setPwdErrMsg("비밀번호를 입력해주세요.");
      return false;
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("로그인 완료!");

    if (!checkInputVal) {
      return false;
    }

    // axios
    // // eslint-disable-next-line no-undef
    // .post("http://localhost:4000/login", {
    //     EMAIL: email,
    //     PASSWORD: password,
    // })
    // .then((res) => {
    //   if (res.headers.authorization) {
    //     localStorage.setItem("accessToken", res.headers.authorization); -> cookie
    //     localStorage.setItem("refreshToken", res.headers.refresh); -> cookie
    //   }

    //   setIsLogin(true); - mainpage
    //   setUserInfo(res.data.data);
    //   navigate("/");
    // })
    // .catch((error) => console.log(error));
  };

  return (
    <>
      <MintCard width="500px" height="240px" />
      <Move>
        <InputContainer>
          <ShortInput text="이메일" name="email" value={email} handlevalue={setEmail} errorMsg={emailErrMsg} />
          <ShortInput text="비밀번호" type="password" value={password} handlevalue={setPassword} errorMsg={pwdErrMsg} />
          {/* onChange={({ target }) => console.log(target.value)} */}
        </InputContainer>
        <ButtonContainer>
          <DarkMintButton width="74px" text="로그인" handleSubmit={handleSubmit} />
        </ButtonContainer>
      </Move>
    </>
  );
};
