import styled from "styled-components";

const DarkMintTagStyle = styled.button`
  padding: 0px 26px 0px 26px;
  height: 30px;
  clear: both;
  float: left;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 64%);
  border-radius: 35px;
  font-size: 12px;
  &:hover {
    background-color: hsl(180, 36%, 53%);
  }
  &:active {
    background-color: hsl(180, 36%, 49%);
  }
`;

const DarkMintTag = ({ text, handleSubmit }) => {
  return <DarkMintTagStyle onClick={handleSubmit}>{text}</DarkMintTagStyle>;
};

export default DarkMintTag;

{
  /* <DarkMintTagStyle text="Ask Question" width="300px "height="200px" /> */
}
