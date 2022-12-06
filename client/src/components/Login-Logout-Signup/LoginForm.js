// import { dispatch } from "gatsby-cli/lib/reporter/redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../redux/useFetch";
// import { getLoginStatus } from "../../redux/userAction";
// import { loginUser } from "../../api/Users";
// import { SET_TOKEN } from "../../redux/store/Auth";
// import useFetch from "../../redux/useFetch";
import { getLoginStatus } from "../../redux/userAction";
// import { setRefreshToken } from "../../storage/Cookie";
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
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      // 8~16자 영문대소문자, 숫자, 특수문자 혼합 사용
      password: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,16}$/,
    };

    if (type === "email") {
      return pattern.email.test(value);
    } else if (type === "password") {
      return pattern.password.test(value);
    }
  };

  const checkInputVal = () => {
    if (email.length <= 0) {
      setEmailErrMsg("이메일 주소를 입력해주세요.");
    } else if (!isValid("email", email)) {
      setEmailErrMsg("올바른 이메일 형식이 아닙니다.");
    } else if (isValid("email", email)) {
      setEmailErrMsg("");
    }
    if (password.trim() === "") {
      setPwdErrMsg("비밀번호를 입력해주세요.");
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 영문대소문자, 숫자 혼합 사용하여 8~16자의 비밀번호를 입력하여 주세요.");
      return false;
    } else {
      setPwdErrMsg("");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputVal()) {
      alert("회원정보가 없습니다.");
      return false;
    }

    const postLogin = {
      email: email,
      password: password,
    };

    const res = await useFetch("POST", `/auth/login`, postLogin);
    if (res === 404 || res === 401) {
      alert("로그인 실패!");
      return false;
    } else {
      dispatch(getLoginStatus({ isLogin: true }));
      navigate("/");
      alert("로그인 성공!");
    }

    // 백으로부터 받은 응답
    // const response = await loginUser(postLogin);
    // console.log("response5", response);

    // if (response.status) {
    //   // 쿠키에 Refresh Token, store에 Access Token 저장
    //   // 정상적인 응답이 왔을 경우 setRefreshToken 을 통해 Refresh Token을 쿠키에 저장, dispatch()를 통해 Access Token을 store에 저장한다.
    //   setRefreshToken(response.json.refresh_token);
    //   console.log(response.json.refresh_token);
    //   dispatch(SET_TOKEN(response.json.access_token));
    //   // Cookie와 store에 데이터를 모두 저장한 이후 홈으로 이동한다.
    //   return navigate("/");
    // } else {
    //   console.log(response.json);
    // }

    // const postLogin = {
    //   email: email,
    //   password: password,
    // };

    // const res = await useFetch("POST", `${process.env.REACT_APP_API_URL}auth/login`, postLogin);
    // console.log("res9", res);

    // if (res === 400) {
    //   alert("로그인 실패!");
    //   return false;
    // } else {
    //   dispatch(getLoginStatus({ isLogin: true }));
    //   navigate("/");
    //   alert("로그인 성공!");
    // }
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
