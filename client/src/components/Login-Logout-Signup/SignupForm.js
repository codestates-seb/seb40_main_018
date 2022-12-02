// import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import DarkLineButton from "../Button/DarkLineButton";
import DarkMintButton from "../Button/DarkMintButton";
import ShortInput from "../Input/ShortInput";
import useFetch from "../../redux/useFetch";
import { useDispatch } from "react-redux";
import { getLoginStatus, getmyInfo } from "../../redux/userAction";

export const MintCard = styled.div`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  box-shadow: 0px 0px 4px 2px #63aeae;
  display: flex;
  box-sizing: border-box;
`;
export const Move = styled.div`
  flex-direction: column;
  z-index: 2;
  margin-top: 40px;
`;

export const InputContainer = styled.div`
  padding-left: 57.26px;
  padding-right: 57.26px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValid = (type, value) => {
    const pattern = {
      // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
      nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
      // 숫자 (0~9) or 알파벳 (a~z, A~Z) 으로 시작하며 중간에 -_. 문자가 있을 수 있으며 그 후 숫자 (0~9) or 알파벳 (a~z, A~Z)이 올 수도 있고 연달아 올 수도 있고 없을 수도 있다.
      // @ 는 반드시 존재하며 . 도 반드시 존재하고 a~z, A~Z 의 문자가 2,3개 존재하고 i = 대소문자 구분 안한다.
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      // 8~16자 영문대소문자, 숫자, 특수문자 혼합 사용
      password: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,16}$/,
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
    } else if (!isValid("name", name)) {
      setNameErrMsg("닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로만 입력하여 주세요.");
    } else {
      setNameErrMsg("");
    }
    if (email.length <= 0) {
      setEmailErrMsg("이메일 주소를 입력해주세요.");
    } else if (!isValid("email", email)) {
      setEmailErrMsg("올바른 이메일 형식이 아닙니다.");
    } else if (isValid("email", email)) {
      setEmailErrMsg("");
    }
    if (password.length <= 0) {
      setPwdErrMsg("비밀번호를 입력해주세요.");
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 영문대소문자, 숫자 혼합 사용하여 8~16자의 비밀번호를 입력하여 주세요.");
      return false;
    } else {
      setPwdErrMsg("");
    }

    if (password.length !== password2.length) {
      setPwdErrMsg2("비밀번호가 일치하지 않습니다. 다시 확인하여 입력해주세요");
      return false;
    } else {
      setPwdErrMsg2("");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputVal()) {
      return false;
    }

    const postSignup = {
      nickname: name,
      email: email,
      password: password,
    };

    // ^^

    // 회원가입 요청
    const res = await useFetch("POST", `${process.env.REACT_APP_API_URL}auth/register`, postSignup);
    // 이메일은 있으나 비밀번호가 다른경우
    if (res === 400) {
      alert("회원가입 실패!");
    } else if (res === 409) {
      // 입력 정보가 이미 있으면 로그인
      await useFetch("POST", `${process.env.REACT_APP_API_URL}auth/login`, { email, password });

      //내 정보 가져오기
      // 본인 회원 정보 조회 api가 따로 있음
      const myInfo = await useFetch("GET", `${process.env.REACT_APP_API_URL}member/me`);
      dispatch(getLoginStatus({ isLogin: true }));
      dispatch(getmyInfo(myInfo));
      navigate("/login");
      alert("이미 가입되어 있는 정보입니다");
    } else {
      navigate("/login");
      alert("회원가입 성공!");
    }
  };

  // axios
  //   .post("http://localhost:4002/signup", postSignup)
  //   .then(() => {
  //     alert("회원가입 성공!");
  //     navigate("/login");
  //   })
  //   .catch((error) => {
  //     alert("회원가입 실패!");
  //     console.log(error);
  //   });

  return (
    <>
      {/* height="420px" */}
      <MintCard width="500px">
        <Move>
          <InputContainer>
            <ShortInput title="Display name" text="닉네임" value={name} handleValue={setName} errorMsg={nameErrMsg} />
            <ShortInput text="이메일입력" value={email} handleValue={setEmail} errorMsg={emailErrMsg} />
            <ShortInput
              text="비밀번호"
              value={password}
              handleValue={setPassword}
              errorMsg={pwdErrMsg}
              type="password"
            />
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
              <DarkMintButton width="78px" text="로그인" />
            </Link>
            {/* 가입 후 로그인 페이지로 이동 */}
            <DarkLineButton width="78px" text="가입하기" handleSubmit={handleSubmit} />
          </ButtonContainer>
        </Move>
      </MintCard>
    </>
  );
};
