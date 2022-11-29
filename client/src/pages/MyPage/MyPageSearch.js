import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import MyPageCard2 from "./MyPageCard2";

const Container = styled.div`
  display: flex;
  width: 1000px;
  margin-top: 100px;
  flex-direction: column;
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

//  cardList
const MyPageSearch = ({ cardList }) => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const city = cardList.map((item) => item.city);
  const [options, setOptions] = useState(city);
  console.log("cardList", cardList);
  // console.log(Object.values(options));

  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
    }
  }, [inputValue]);

  const onInput = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    if (value.includes("\\")) return;

    // input에 텍스트가 있는지 없는지 확인하는 코드
    value ? setHasText(true) : setHasText(false);

    // updateText
    setInputValue(value);

    // dropdown을 위한 기능
    const filterRegex = new RegExp(value, "i");
    const resultOptions = city.filter((option) => option.match(filterRegex));
    setOptions(resultOptions);
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    const resultOptions = city.filter((option) => option === clickedOption);
    setOptions(resultOptions);
  };

  return (
    <Container>
      <SearchBox hasText={hasText}>
        <AiOutlineSearch color="#63aeae" size="20" />
        <Input id="search" type="text" value={inputValue} placeholder="지역을 입력해주세요." onChange={onInput} />
      </SearchBox>

      {/* 자동완성,결과 값 */}
      {hasText ? <MyPageCard2 cardList={cardList} options={options} handleDropDownClick={handleDropDownClick} /> : null}
    </Container>
  );
};

export default MyPageSearch;
