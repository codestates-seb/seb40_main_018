import styled from "styled-components";
import { HiFilter } from "react-icons/hi";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

export const Block = styled.div`
  /* margin-top: -8px; */
  float: right;
`;

export const ButtonContainer = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 46px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 54%);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 25%, 35%);
  }
  &:active {
    background-color: hsl(180, 25%, 31%);
  }

  > .filter {
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 54px;
  right: 0;
  width: 100%;
  max-width: 343px;
  /* 오른쪽 정렬 코드 */
  /* float: right;
  margin-right: 261px; */
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  height: 100vh;
  /*z-index: 999;   // card 보다 높이 지정 */
  top: 5px;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Container = styled.div`
  width: 100%;
  border: 1px solid #63aeae;
  border-radius: 20px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
  background-color: #ffffff;
`;

const Box = styled.div`
  position: relative;
  /* border: 1px solid pink; */
`;

export const Text = styled.div`
  margin: 15px 0 10px 19px;
  font-size: 16px;
  font-weight: 700;
  color: #63aeae;
`;

const CloseBtn = styled.span`
  cursor: pointer;
  float: right;
  margin: -30px 10px 0 0;

  > .close {
    margin-top: -6px;
  }
`;

export const Content = styled.div`
  margin-left: 19px;
  font-size: 12px;
  color: #63aeae;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

export const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 294px;
  border-radius: 10px;
  background-color: #dddddd;
  margin-left: 22px;
`;

export const FilterPriceSlideInner = styled.div`
  /* 보이지 않지만 기능 문제 없음  */
  position: absolute;
  left: ${(props) => props.rangeMinPercent}%;
  right: ${(props) => props.rangeMaxPercent}%;
  height: 4px;
  border-radius: 10px;
  background-color: #b0b0b0;
`;

const FilterPriceRangeWrap = styled.div`
  position: relative;
  /* border: 1px solid green; */
  width: 294px;
  margin-left: 22px;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -10px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  pointer-events: none;
  width: 294px;
  &::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 2px solid #b0b0b0;
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)`
  width: 295px;
`;

const InputContainer = styled.div`
  > input {
    border: none;
    outline: none;
    font-size: 16px;
    width: 80px;
    margin-left: 4px;
  }
`;

const PriceBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Min = styled.div`
  border-radius: 8px !important;
  box-shadow: rgb(176 176 176) 0px 0px 0px 1px inset;
  font-size: 12px;
  width: 134px;
  padding: 10px;

  > .text {
    /* border: 1px solid red; */
    color: #535353;
    margin-left: 4px;
  }

  > .flex {
    display: flex;
    font-size: 16px;
    margin-left: 4px;
  }
`;

const Max = styled.div`
  border-radius: 8px !important;
  box-shadow: rgb(176 176 176) 0px 0px 0px 1px inset;
  font-size: 12px;
  width: 134px;
  padding: 10px;

  > .text {
    /* border: 1px solid red; */
    color: #535353;
    margin-left: 4px;
  }
  > .flex {
    display: flex;
    font-size: 16px;
    margin-left: 4px;
  }
`;
const Mid = styled.div`
  margin: 8px;
`;

function PriceFilter({ page }) {
  // 막대 필터 적용시 자동 필터 검색
  const fixedMinPrice = 10000;
  const fixedMaxPrice = 1000000;
  const priceGap = 100000;
  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const prcieRangeMinValueHandler = (e) => {
    setRangeMinValue(parseInt(e.target.value));
  };

  const priceRangeMaxValueHandler = (e) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < priceGap) {
      setRangeMaxValue((rangeMinValue) => rangeMinValue + priceGap);
      setRangeMinValue((rangeMaxValue) => rangeMaxValue - priceGap);
    } else {
      setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
      setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
    }
  };
  // console.log("rangeMinValue", rangeMinValue); // range 조절
  // console.log("rangeMaxValue", rangeMaxValue); // range 조절

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}diary/cost?min=${rangeMinValue}&max=${rangeMaxValue}&size=10&page=${page}`)
      .then((res) => {
        // console.log("price", res);
        setRangeMinValue(res.data.min);
        setRangeMaxValue(res.data.max);
      });
  }, []);

  const formatter = new Intl.NumberFormat("ko");
  return (
    <Block>
      <ButtonContainer onClick={openModal}>
        <HiFilter className="filter" size={24} />
      </ButtonContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModal}>
          <ModalContainer>
            <Container onClick={openModal}>
              <Box onClick={(e) => e.stopPropagation()}>
                <Text>가격 범위</Text>
                <CloseBtn>
                  <IoIosClose className="close" size={30} onClick={openModal} color="#535353"></IoIosClose>
                </CloseBtn>
                <Content>
                  <div>총 예산</div>
                </Content>

                {/* 필터  */}
                <FilterPriceSlide>
                  <FilterPriceSlideInner left={rangeMinPercent} right={rangeMaxPercent} />
                </FilterPriceSlide>
                <FilterPriceRangeWrap>
                  <FilterPriceRangeMin
                    type="range"
                    min={fixedMinPrice}
                    max={fixedMaxPrice - priceGap}
                    // step="1000"
                    value={rangeMinValue}
                    onChange={(e) => {
                      prcieRangeMinValueHandler(e);
                      twoRangeHandler();
                    }}
                  />
                  <FilterPriceRangeMax
                    type="range"
                    min={fixedMinPrice + priceGap}
                    max={fixedMaxPrice}
                    value={rangeMaxValue}
                    onChange={(e) => {
                      priceRangeMaxValueHandler(e);
                      twoRangeHandler();
                    }}
                  />
                </FilterPriceRangeWrap>
                <PriceBox>
                  <Min>
                    <div className="text">최저예산</div>
                    <div className="flex">
                      <span>₩</span>
                      <InputContainer>
                        <input
                          autoComplete="off"
                          type="text"
                          width="120"
                          value={formatter.format(rangeMinValue)}
                          readOnly
                        />
                      </InputContainer>
                    </div>
                  </Min>
                  <Mid>-</Mid>
                  <Max>
                    <div className="text">최고예산</div>
                    <div className="flex">
                      <span>₩</span>
                      <InputContainer>
                        <input autoComplete="off" type="text" value={formatter.format(rangeMaxValue)} readOnly />
                      </InputContainer>
                    </div>
                  </Max>
                </PriceBox>
              </Box>
            </Container>
          </ModalContainer>
        </ModalBackdrop>
      ) : null}
    </Block>
  );
}

export default PriceFilter;
