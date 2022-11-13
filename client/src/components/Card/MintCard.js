import styled from "styled-components";

const MintCardStyle = styled.div`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 32%, 54%);
  border-radius: 35px;
  box-shadow: 0px 0px 4px 2px #63aeae;
`;

const MintCard = ({ height, width }) => {
  return <MintCardStyle width={width} height={height}></MintCardStyle>;
};

export default MintCard;

{
  // <MintButton width="74px" text="가입하기">
  // </MintButton>;
}
