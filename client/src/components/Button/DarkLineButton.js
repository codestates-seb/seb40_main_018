import styled from "styled-components";

const DarkLineButtonStyle = styled.button`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(180, 32%, 54%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  font-size: 16px;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

const DarkLineButton = ({ text, height, width, handleSubmit }) => {
  return (
    <DarkLineButtonStyle width={width} height={height} onClick={handleSubmit}>
      {text}
    </DarkLineButtonStyle>
  );
};

export default DarkLineButton;

// 가로세로 100*40 고정이라 미리 설정 해뒀습니다.
// <BlueButton text="Ask Question" />
