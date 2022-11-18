import { useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const TitleArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

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

const Title = styled.input`
  outline-style: none;
  border: none;
  width: 100%;
  color: #535353;
  background: none;
  font-family: "shinbttf";
  font-size: 16px;
`;

const DateArea = styled.div`
  display: flex;
`;
const DateText = styled.div`
  position: relative;
  font-family: "shinbttf";
  font-size: 16px;
`;
const WeatherBtn = styled.button`
  border: 0;
  outline: 0;
  background: none;
  color: #535353;
  font-family: "shinbttf";
  font-size: 16px;
`;

const Select = styled.select`
  font-size: 16px;
  padding-left: 8px;
  padding-right: 4px;
  /* font-weight: 800; */
  font-family: "shinbttf";
  border: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fbfbfb;

  &:focus {
    outline: none;
  }
  &::-ms-expand {
    display: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.option`
  font-family: "shinbttf";
  padding: 3px 10px;
`;
const ModalContainer = styled.div`
  background-color: #fbfbfb;
  position: absolute;
  /* top: 158px;
  right: 163px; */
  top: 60px;
  right: 0;
  width: 280px;
  height: 260px;
  padding: 15px 18px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const WeatherArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0;
`;
const ModalBtn = styled.button`
  outline: none;
  border: none;
  background-color: #fbfbfb;
  font-size: 16px;
  padding: 0 10px;
`;
const ModalTxt = styled.div`
  font-family: "shinbttf";
`;

const DiaryTitle = ({ title, setTitle, weather, setWeather, year, setYear, month, setMonth, day, setDay }) => {
  const weatherTxt = [
    "태풍",
    "미세먼지",
    "맑음",
    "안개",
    "구름적음",
    "흐림",
    "황사",
    "천둥번개",
    "소나기",
    "비",
    "구름많음",
    "눈",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const onClickHandler = (e) => {
    setWeather(e.target.textContent);
  };

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const selectYearHandler = (e) => {
    setYear(e.target.value);
  };
  const selectMonthHandler = (e) => {
    setMonth(e.target.value);
  };
  const selectDayHandler = (e) => {
    setDay(e.target.value);
  };
  return (
    <TitleArea>
      <InputContainer width="380px">
        <Title placeholder="제목" onChange={onChangeHandler} value={title} />
      </InputContainer>
      <InputContainer width="280px">
        <DateArea>
          <Select defaultValue={year} onClick={selectYearHandler}>
            <Option> ----</Option>
            <Option>2022</Option>
            <Option>2021</Option>
            <Option>2020</Option>
            <Option>2019</Option>
            <Option>2018</Option>
            <Option>2017</Option>
            <Option>2016</Option>
            <Option>2015</Option>
            <Option>2014</Option>
            <Option>2013</Option>
            <Option>2012</Option>
            <Option>2011</Option>
            <Option>2010</Option>
            <Option>2009</Option>
            <Option>2008</Option>
            <Option>2007</Option>
            <Option>2006</Option>
            <Option>2005</Option>
            <Option>2004</Option>
            <Option>2003</Option>
            <Option>2002</Option>
            <Option>2001</Option>
            <Option>2000</Option>
          </Select>
          <DateText>년</DateText>
        </DateArea>
        <DateArea>
          <Select defaultValue={month} onClick={selectMonthHandler}>
            <Option>--</Option>
            <Option>12</Option>
            <Option>11</Option>
            <Option>10</Option>
            <Option>09</Option>
            <Option>08</Option>
            <Option>07</Option>
            <Option>06</Option>
            <Option>05</Option>
            <Option>04</Option>
            <Option>03</Option>
            <Option>02</Option>
            <Option>01</Option>
          </Select>
          <DateText>월</DateText>
        </DateArea>
        <DateArea>
          <Select defaultValue={day} onClick={selectDayHandler}>
            <Option>--</Option>
            <Option>31</Option>
            <Option>30</Option>
            <Option>29</Option>
            <Option>28</Option>
            <Option>27</Option>
            <Option>26</Option>
            <Option>25</Option>
            <Option>24</Option>
            <Option>23</Option>
            <Option>22</Option>
            <Option>21</Option>
            <Option>20</Option>
            <Option>19</Option>
            <Option>18</Option>
            <Option>17</Option>
            <Option>16</Option>
            <Option>15</Option>
            <Option>14</Option>
            <Option>13</Option>
            <Option>12</Option>
            <Option>11</Option>
            <Option>10</Option>
            <Option>09</Option>
            <Option>08</Option>
            <Option>07</Option>
            <Option>06</Option>
            <Option>05</Option>
            <Option>04</Option>
            <Option>03</Option>
            <Option>02</Option>
            <Option>01</Option>
          </Select>
          <DateText>일</DateText>
        </DateArea>
        <WeatherBtn onClick={openModal}>{weather}</WeatherBtn>
      </InputContainer>
      {isOpen ? (
        <ModalContainer>
          <MdClose size="18" color="#63aeae" onClick={openModal} />
          <WeatherArea>
            {weatherTxt.map((el) => (
              <ModalBtn onClick={onClickHandler} key={el.id}>
                <ModalTxt>{el}</ModalTxt>
              </ModalBtn>
            ))}
          </WeatherArea>
        </ModalContainer>
      ) : null}
    </TitleArea>
  );
};
export default DiaryTitle;
