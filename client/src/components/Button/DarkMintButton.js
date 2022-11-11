import styled from "styled-components";

const DarkMintButtonStyle = styled.button`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 54%);
  border: none;
  border-radius: 35px;
  font-size: 16px;
  &:hover {
    background-color: hsl(180, 25%, 35%);
  }
  &:active {
    background-color: hsl(180, 25%, 31%);
  }
`;

const DarkMintButton = ({ text, width, height, handleSubmit }) => {
  return (
    <DarkMintButtonStyle width={width} height={height} onClick={handleSubmit}>
      {text}
    </DarkMintButtonStyle>
  );
};

export default DarkMintButton;

// 가로세로 100*40 고정이라 미리 설정 해뒀습니다.
// <BlueButton text="Ask Question" />
