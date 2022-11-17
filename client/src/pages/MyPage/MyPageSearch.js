import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  width: 1000px;
  margin-top: 100px;
`;

const SearchBox = styled.div`
  width: 366px;
  height: auto;
  padding: 10px 20px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  margin: 18px 0;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  margin-left: 5px;
  border: none;
  outline: none;
  font-size: 14px;
`;
const MyPageSearch = () => {
  // 검색구현하기
  return (
    <Container>
      <SearchBox>
        <AiOutlineSearch color="#63aeae" size="20" />
        <Input type="text" placeholder="지역을 입력해주세요." />
      </SearchBox>
    </Container>
  );
};

export default MyPageSearch;
