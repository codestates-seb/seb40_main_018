import styled from "styled-components";

const MintLineButtonStyle = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 66%, 74%);
  border-radius: 35px;
  font-size: 12px;
  padding: 0px 26px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

const MintLineButton = ({ text, width, handleSubmit }) => {
  return (
    <MintLineButtonStyle width={width} onClick={handleSubmit}>
      {text}
    </MintLineButtonStyle>
  );
};

export default MintLineButton;

{
  /* <BlueButton text="Ask Question" width="300px "height="200px" /> */
}
