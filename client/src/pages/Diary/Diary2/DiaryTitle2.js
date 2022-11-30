// import { useState } from "react";
import styled from "styled-components";
// import { MdClose } from "react-icons/md";

const TitleArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const TitleErr = styled.div`
  display: flex;
  flex-direction: column;
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

// const Err = styled.div`
//   display: flex;
// `;
const DateArea = styled.div`
  display: flex;
`;
const DateText = styled.div`
  position: relative;
  font-family: "shinbttf";
  font-size: 16px;
`;
// const WeatherBtn = styled.button`
//   border: 0;
//   outline: 0;
//   background: none;
//   color: #535353;
//   font-family: "shinbttf";
//   font-size: 16px;
// `;

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
// const ModalContainer = styled.div`
//   background-color: #fbfbfb;
//   position: absolute;
//   /* top: 158px;
//   right: 163px; */
//   top: 60px;
//   right: 0;
//   width: 280px;
//   height: 260px;
//   padding: 15px 18px;
//   border-radius: 35px;
//   box-shadow: 0 0 5px 2px #63aeae;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   z-index: 1;
// `;
// const WeatherArea = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   padding: 10px 0;
// `;
// const ModalBtn = styled.button`
//   outline: none;
//   border: none;
//   background-color: #fbfbfb;
//   font-size: 16px;
//   padding: 0 10px;
// `;
// const ModalTxt = styled.div`
//   font-family: "shinbttf";
// `;
const ErrorMSG = styled.div`
  margin-top: 10px;
  color: red;
`;

const DiaryTitle2 = ({ register, errors }) => {
  return (
    <TitleArea>
      <TitleErr>
        <InputContainer width="380px">
          <Title
            name="title"
            placeholder="제목"
            {...register("title", { required: { value: true, message: "제목은 필수 입력입니다." } })}
          />
        </InputContainer>
        {errors.title && <ErrorMSG role="alert">{errors.title.message}</ErrorMSG>}
      </TitleErr>
      <TitleErr>
        <InputContainer width="280px">
          <DateArea>
            <Select
              name="year"
              {...register("year", {
                required: { value: true, message: "날짜를 선택해주세요." },
              })}
            >
              <Option value=""> ----</Option>
              <Option value="2022">2022</Option>
              <Option value="2021">2021</Option>
              <Option value="2020">2020</Option>
              <Option value="2019">2019</Option>
              <Option value="2018">2018</Option>
              <Option value="2017">2017</Option>
              <Option value="2016">2016</Option>
              <Option value="2015">2015</Option>
              <Option value="2014">2014</Option>
              <Option value="2013">2013</Option>
              <Option value="2012">2012</Option>
              <Option value="2011">2011</Option>
              <Option value="2010">2010</Option>
              <Option value="2009">2009</Option>
              <Option value="2008">2008</Option>
              <Option value="2007">2007</Option>
              <Option value="2006">2006</Option>
              <Option value="2005">2005</Option>
              <Option value="2004">2004</Option>
              <Option value="2003">2003</Option>
              <Option value="2002">2002</Option>
              <Option value="2001">2001</Option>
              <Option value="2000">2000</Option>
            </Select>
            <DateText>년</DateText>
          </DateArea>
          <DateArea>
            <Select name="month" {...register("month", { required: { value: true, message: "날짜를 선택해주세요." } })}>
              <Option value="">--</Option>
              <Option value="12">12</Option>
              <Option value="11">11</Option>
              <Option value="10">10</Option>
              <Option value="09">09</Option>
              <Option value="08">08</Option>
              <Option value="07">07</Option>
              <Option value="06">06</Option>
              <Option value="05">05</Option>
              <Option value="04">04</Option>
              <Option value="03">03</Option>
              <Option value="02">02</Option>
              <Option value="01">01</Option>
            </Select>
            <DateText>월</DateText>
          </DateArea>
          <DateArea>
            <Select name="day" {...register("day", { required: { value: true, message: "날짜를 선택해주세요." } })}>
              <Option value="">--</Option>
              <Option value="31">31</Option>
              <Option value="30">30</Option>
              <Option value="29">29</Option>
              <Option value="28">28</Option>
              <Option value="27">27</Option>
              <Option value="26">26</Option>
              <Option value="25">25</Option>
              <Option value="24">24</Option>
              <Option value="23">23</Option>
              <Option value="22">22</Option>
              <Option value="21">21</Option>
              <Option value="20">20</Option>
              <Option value="19">19</Option>
              <Option value="18">18</Option>
              <Option value="17">17</Option>
              <Option value="16">16</Option>
              <Option value="15">15</Option>
              <Option value="14">14</Option>
              <Option value="13">13</Option>
              <Option value="12">12</Option>
              <Option value="11">11</Option>
              <Option value="10">10</Option>
              <Option value="09">09</Option>
              <Option value="08">08</Option>
              <Option value="07">07</Option>
              <Option value="06">06</Option>
              <Option value="05">05</Option>
              <Option value="04">04</Option>
              <Option value="03">03</Option>
              <Option value="02">02</Option>
              <Option value="01">01</Option>
            </Select>
            <DateText>일</DateText>
          </DateArea>
          <Select
            name="weather"
            {...register("weather", { required: { value: true, message: "날씨를 선택해주세요." } })}
          >
            <Option value="">날씨</Option>
            <Option value="태풍">태풍</Option>
            <Option value="미세먼지">미세먼지</Option>
            <Option value="맑음">맑음</Option>
            <Option value="안개">안개</Option>
            <Option value="구름적음">구름적음</Option>
            <Option value="흐림">흐림</Option>
            <Option value="황사">황사</Option>
            <Option value="천둥번개">천둥번개</Option>
            <Option value="소나기">소나기</Option>
            <Option value="비">비</Option>
            <Option value="구름많음">구름많음</Option>
            <Option value="눈">눈</Option>
          </Select>
        </InputContainer>
        {(errors.year && errors.month && errors.day && <ErrorMSG role="alert">{errors.year.message}</ErrorMSG>) ||
          (errors.weather && <ErrorMSG role="alert">{errors.weather.message}</ErrorMSG>)}
      </TitleErr>
    </TitleArea>
  );
};
export default DiaryTitle2;
