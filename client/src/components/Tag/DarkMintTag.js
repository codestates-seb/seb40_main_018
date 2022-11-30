import styled from "styled-components";

const DarkMintTagStyle = styled.button`
  padding: 0px 26px 0px 26px;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "30px")};
  clear: both;
  float: left;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 64%);
  border-radius: 35px;
  font-size: 12px;
  border: none;
  &:hover {
    background-color: hsl(180, 36%, 53%);
  }
  &:active {
    background-color: hsl(180, 36%, 49%);
  }
`;
const DarkMintTag = ({ text, handleSubmit, width, height }) => {
  return (
    <DarkMintTagStyle onClick={handleSubmit} width={width} height={height}>
      {text}
    </DarkMintTagStyle>
  );
};

export default DarkMintTag;

{
  /* <DarkMintTagStyle text="Ask Question" width="300px "height="200px" /> */
}