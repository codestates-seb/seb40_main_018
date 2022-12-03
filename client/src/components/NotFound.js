import styled from "styled-components";
import { ReactComponent as Not } from "../images/NotFound2.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const SVGArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotText = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 900;
  color: #5e9090;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
`;

const HomeButton = styled.button`
  margin-top: 38px;
  height: 30px;
  width: auto;
  color: hsl(180, 32%, 54%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  font-size: 12px;
  padding: 0 10px;

  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

const NotFound = () => {
  return (
    <Container>
      <SVGArea>
        <Not />
        <NotText>Page Not Found</NotText>
      </SVGArea>
      <TextArea>
        <div>찾을 수 없는 페이지 입니다. </div>
        <div>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.</div>
      </TextArea>
      <Link to="/">
        <HomeButton>홈으로 돌아가기</HomeButton>
      </Link>
    </Container>
  );
};
export default NotFound;
