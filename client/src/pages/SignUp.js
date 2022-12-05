import styled from "styled-components";
// import { SignupForm } from "../components/Login-Logout-Signup/SignupForm";
import SignupForm2 from "../components/Login-Logout-Signup/SignupForm2";
import { ReactComponent as Logo } from "../images/DanimLogo.svg";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`;

export const SignupContainer = styled.div`
  /* border: 1px solid blue; */
`;

export const Intro = styled.div`
  margin-bottom: 40.17px;
  text-align: center;

  div {
    font-size: 16px;
    color: #40d8d8;
    margin-top: -60px;
  }
`;

export const Logo2 = styled(Logo)`
  width: 181px;
  height: 178px;
  background-color: transparent !important;
`;

export const SignUp = () => {
  return (
    <Container>
      <SignupContainer>
        <Intro>
          <Logo2 />
          <div>Danim에 오신걸 환영합니다!</div>
        </Intro>
        {/* <SignupForm /> */}
        <SignupForm2 />
      </SignupContainer>
    </Container>
  );
};
