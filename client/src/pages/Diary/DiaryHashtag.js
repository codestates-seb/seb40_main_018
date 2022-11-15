import { useState } from "react";
import styled from "styled-components";
import { TagsInput } from "react-tag-input-component";
import "./tag.css";

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

const HashTagArea = styled(InputContainer)`
  height: auto;
`;

const Tags = styled.div`
  margin-left: 10px;
  width: 100%;
`;
const TitleText = styled.span`
  white-space: nowrap;
`;

const DiaryHashtag = () => {
  const [selected, setSelected] = useState([]);
  return (
    <HashTagArea>
      <TitleText>해시태그 :</TitleText>
      <Tags>
        <TagsInput
          // style={{ border: "none", backgroundColor: "red" }}
          value={selected}
          onChange={setSelected}
          name="HashTag"
          placeHolder="태그를 입력해주세요."
        />
      </Tags>
    </HashTagArea>
  );
};
export default DiaryHashtag;
