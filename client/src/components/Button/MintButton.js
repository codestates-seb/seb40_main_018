import styled from "styled-components";

const MintButtonStyle = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 66%, 55%);
  border: none;
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 66%, 37%);
  }
  &:active {
    background-color: hsl(180, 66%, 33%);
  }
`;

const MintButton = ({ text, width, handleSubmit }) => {
  return (
    <MintButtonStyle width={width} onClick={handleSubmit}>
      {text}
    </MintButtonStyle>
  );
};

export default MintButton;

{
  /* <BlueButton text="Ask Question" width="300px "height="200px" /> */
}
