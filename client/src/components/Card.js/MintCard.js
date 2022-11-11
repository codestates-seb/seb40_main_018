import styled from "styled-components";

const MintCardStyle = styled.button`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  box-shadow: 0px 0px 4px 2px #63aeae;
  font-size: 14px;
`;

const MintCard = ({ text, height, width }) => {
  return (
    <MintCardStyle width={width} height={height}>
      {text}
    </MintCardStyle>
  );
};

export default MintCard;

{
  /* <BlueButton text="Ask Question" width="300px "height="200px" /> */
}
