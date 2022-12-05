// import { LoginForm } from "../components/Login-Logout-Signup/LoginForm";
import styled from "styled-components";
import LoginForm2 from "../components/Login-Logout-Signup/LoginForm2";
import { Container, Logo2, SignupContainer } from "./SignUp";

export const Intro = styled.div`
  margin-bottom: 40.17px;
  text-align: center;

  div {
    font-size: 16px;
    color: #40d8d8;
    margin-top: -50px;
  }
`;

export const Login = () => {
  return (
    <Container>
      <SignupContainer>
        <Intro>
          <Logo2 />
          <div>Danim과 함께 여행을 기록해볼까요?</div>
        </Intro>
        {/* <LoginForm /> */}
        <LoginForm2 />
      </SignupContainer>
    </Container>
  );
};
