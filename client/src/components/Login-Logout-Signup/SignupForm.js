import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkLineButton from "../Button/DarkLineButton";
import DarkMintButton from "../Button/DarkMintButton";
import ShortInput from "../Input/ShortInput";

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
  margin-bottom: 25px;
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
  // const navigate = useNavigate();

  const isValid = (type, value) => {
    const pattern = {
      // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성
      nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
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
      setNameErrMsg("닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로만 입력하여 주세요.");
    } else {
      setNameErrMsg("");
    }

    if (email.length <= 0) {
      setEmailErrMsg("이메일 주소를 입력해주세요.");
      return false;
    } else if (!isValid("email", email)) {
      setEmailErrMsg("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailErrMsg("");
    }

    // 비번 과 비번확인 같아야 함
    if (password.length <= 0) {
      setPwdErrMsg("비밀번호를 입력해주세요.");
      return false;
    } else if (!isValid("password", password)) {
      setPwdErrMsg("Password는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkInputVal()) {
      return false;
    }

    // axios
    //   // eslint-disable-next-line no-undef
    //   .post("http://localhost:4000/signup", {
    //     NAME: name,
    //     EMAIL: email,
    //     PASSWORD: password,
    //   })
    //   .then(() => {
    //     alert("회원가입 성공!");
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     alert("회원가입 실패!");
    //     console.log(error);
    //   });
  };

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
              <DarkLineButton width="74px" text="로그인" />
            </Link>
            {/* 가입 후 로그인 페이지로 이동 */}
            <DarkMintButton width="74px" text="가입하기" handleSubmit={handleSubmit} />
          </ButtonContainer>
        </Move>
      </MintCard>
    </>
  );
};
