import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../redux/useFetch";
import { getmyInfo } from "../../redux/userAction";
import DarkLineButton from "../Button/DarkLineButton";
import DarkMintButton from "../Button/DarkMintButton";
// import ShortInput from "../Input/ShortInput";
// import ShortInput2 from "./ShortInput2";

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

export const InputContainer = styled.form`
  padding-left: 57.26px;
  padding-right: 57.26px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Box = styled.div`
  width: ${(props) => (props.width ? props.width : "380px")};
  height: ${(props) => (props.height ? props.height : "52px")};
  padding: 15px 20px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  margin: 18px 0;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const ShortInput2 = styled.input`
  outline-style: none;
  border: none;
  font-size: 14px;
  width: 70%;
  color: #535353;
  text-align: right;
  background-color: transparent;
`;
const InputTitle = styled.div`
  background-color: #ffffff;
  width: auto;
  font-size: 14px;
  color: #535353;
`;

const ErrorMSG = styled.div`
  color: rgb(222, 79, 84);
  margin-bottom: 6px;
`;

const SignupForm2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // watch()를 활용해서 4개의 값이 모두 입력되면 버튼의 색깔 바꾸기
  const currentPassword = useRef({});
  currentPassword.current = watch("password", "");

  const onValid = async (data) => {
    // console.log("data", data);

    const postSignup = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    };

    // console.log("postSignup", postSignup);
    // 회원가입 요청
    const res = await useFetch("POST", `${process.env.REACT_APP_API_URL}auth/register`, postSignup);
    if (res === 404 || res === 401 || res === 405) {
      alert("회원가입 실패!");
    } else if (res === 409) {
      // 입력 정보가 이미 있으면 로그인
      await useFetch("POST", `${process.env.REACT_APP_API_URL}auth/login`, postSignup);

      //내 정보 가져오기
      // 본인 회원 정보 조회 api가 따로 있음
      const myInfo = await useFetch("GET", `${process.env.REACT_APP_API_URL}member/me`);
      // dispatch(getLoginStatus({ isLogin: true }));
      dispatch(getmyInfo(myInfo));
      navigate("/login");
      alert("이미 가입되어 있는 정보입니다");
    } else {
      navigate("/login");
      alert("회원가입 성공!");
    }
  };
  const onInValid = (error) => {
    console.log("error", error);
  };
  return (
    <>
      {/* height="420px" */}
      <MintCard width="500px">
        <Move>
          <InputContainer onSubmit={handleSubmit(onValid, onInValid)}>
            <Box>
              <InputTitle>닉네임</InputTitle>
              <ShortInput2
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 최소 2글자 이상입니다.",
                  },
                  //   pattern: {
                  //     value: /^(?=.*[a-zA-Z가-힣])(?=.*[^a-zA-Z0-9]|.*[0-9]).{2,16}$/,
                  //     message:
                  //       "닉네임은 한글이나 영문대소문자, 숫자, 특수문자 혼합 사용하여 2자 이상 16자 이하로 입력해 주세요.",
                  //   },
                })}
                text="닉네임"
              />
            </Box>
            {errors.nickname && <ErrorMSG role="alert">{errors.nickname.message}</ErrorMSG>}
            <Box>
              <InputTitle>이메일</InputTitle>
              <ShortInput2
                {...register("email", {
                  required: true,
                  minLength: {
                    value: 2,
                    message: "이메일 주소를 입력해주세요.",
                  },
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "올바른 이메일 형식이 아닙니다.",
                  },
                })}
                placeholder="Example@email.com"
              />
            </Box>
            {errors.email && <ErrorMSG role="alert">{errors.email.message}</ErrorMSG>}
            <Box>
              <InputTitle>비밀번호</InputTitle>
              <ShortInput2
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "최소 8자 이상의 숫자를 입력해주세요.",
                  },
                  pattern: {
                    value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/,
                    message: "영문, 숫자, 특수문자를 혼합 사용하여 주세요.",
                  },
                })}
                type="password"
              />
            </Box>
            {errors.password && <ErrorMSG role="alert">{errors.password.message}</ErrorMSG>}
            <Box>
              <InputTitle>비밀번호 확인</InputTitle>
              <ShortInput2
                {...register("password2", {
                  validate: (value) => value === currentPassword.current || "비밀번호가 일치하지 않습니다.",
                })}
                type="password"
              />
            </Box>
            {errors.password2 && <ErrorMSG role="alert">{errors.password2.message}</ErrorMSG>}
            <ButtonContainer>
              <Link to="/login">
                <DarkMintButton width="78px" text="로그인" />
              </Link>
              {/* 가입 후 로그인 페이지로 이동 */}
              <DarkLineButton width="78px" text="가입하기" />
            </ButtonContainer>
          </InputContainer>
        </Move>
      </MintCard>
    </>
  );
};

export default SignupForm2;
