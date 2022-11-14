import styled from "styled-components";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "55px")};
  padding: 0 18px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const HashTagArea = styled(InputContainer)``;

const Tags = styled.div`
  margin-left: 10px;
  width: 100%;
`;
const TitleText = styled.span`
  white-space: nowrap;
`;

const TagsInput = styled.input`
  outline-style: none;
  border: none;
  width: 100%;
  color: #535353;
  background: none;
`;
const DiaryHashtag = () => {
  return (
    <HashTagArea>
      <TitleText>해시태그 :</TitleText>
      <Tags>
        <TagsInput />
      </Tags>
    </HashTagArea>
  );
};
export default DiaryHashtag;
