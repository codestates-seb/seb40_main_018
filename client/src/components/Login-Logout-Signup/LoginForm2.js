import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../redux/useFetch";
import { getLoginStatus } from "../../redux/userAction";
import DarkMintButton from "../Button/DarkMintButton";

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

export const ShortInput = styled.input`
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

function LoginForm2() {
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
    console.log("data", data);

    const postLogin = {
      email: data.email,
      password: data.password,
    };

    const res = await useFetch("POST", `/auth/login`, postLogin);
    if (res === 404 || res === 401 || res === 405) {
      alert("로그인 실패!");
      return false;
    } else {
      dispatch(getLoginStatus({ isLogin: true }));
      navigate("/");
      alert("로그인 성공!");
    }
  };
  const onInValid = (error) => {
    console.log("error", error);
  };
  return (
    <>
      {/* height="240px" */}
      <MintCard width="500px">
        <Move>
          <InputContainer onSubmit={handleSubmit(onValid, onInValid)}>
            <Box>
              <InputTitle>이메일</InputTitle>
              <ShortInput
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
              <ShortInput
                type="password"
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
              />
            </Box>
            {errors.password && <ErrorMSG role="alert">{errors.password.message}</ErrorMSG>}
            <ButtonContainer>
              <DarkMintButton width="74px" text="로그인" handleSubmit={handleSubmit} />
            </ButtonContainer>
          </InputContainer>
        </Move>
      </MintCard>
    </>
  );
}

export default LoginForm2;
