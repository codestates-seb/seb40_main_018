// import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../redux/useFetch";
import { getLoginStatus } from "../../redux/userAction";
import DarkMintButton from "../Button/DarkMintButton";
import ShortInput from "../Input/ShortInput";
import { ButtonContainer, InputContainer, MintCard } from "./SignupForm";

export const Move = styled.div`
  background-color: transparent;
  position: relative;
  z-index: 2;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } else {
      setEmailErrMsg("");
    }

    if (password.length <= 0) {
      setPwdErrMsg("비밀번호를 입력해주세요.");
      return false;
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");
    } else {
      setPwdErrMsg("");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputVal()) {
      alert("로그인 실패!");
      return false;
    }

    const postLogin = {
      email: email,
      password: password,
    };

    const res = await useFetch("POST", "http://localhost:4003/login", postLogin);

    if (res === 401) {
      alert("회원정보가 없습니다.");
      return false;
    }

    dispatch(getLoginStatus({ isLogin: true }));
    navigate("/");
    alert("로그인 성공!");
    // axios
    // .post("http://localhost:4003/login", postLogin)
    // .then((res) => {
    //   console.log(res.data);
    //   alert("로그인 성공!");
    //   navigate("/");
    // })
    // .catch((error) => {
    //   alert("로그인 실패!");
    //   console.log(error);
    // });
  };

  return (
    <>
      {/* height="240px" */}
      <MintCard width="500px">
        <Move>
          <InputContainer>
            <ShortInput text="이메일" name="email" value={email} handleValue={setEmail} errorMsg={emailErrMsg} />
            <ShortInput
              text="비밀번호"
              type="password"
              value={password}
              handleValue={setPassword}
              errorMsg={pwdErrMsg}
            />
            {/* onChange={({ target }) => console.log(target.value)} */}
          </InputContainer>
          <ButtonContainer>
            <DarkMintButton width="74px" text="로그인" handleSubmit={handleSubmit} />
          </ButtonContainer>
        </Move>
      </MintCard>
    </>
  );
};
