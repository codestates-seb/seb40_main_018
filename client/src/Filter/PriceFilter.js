import styled from "styled-components";
import { HiFilter } from "react-icons/hi";
import { useState } from "react";

export const Block = styled.div`
  margin-top: 185px;
  margin-right: 114px;
  float: right;
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  width: 60px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 54%);
  border: none;
  border-radius: 20px;
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
  width: 100%;
  max-width: 270px;
  z-index: 999;
  /* 오른쪽 정렬 코드 */
  float: right;
  margin-right: 114px;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  /* z-index: 999; // card 보다 높다 */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid yellow;
  padding-top: 260px;
`;

export const Container = styled.div`
  width: 100%;
  border: 1px solid #63aeae;
  border-radius: 20px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
`;

const Box = styled.div`
  position: relative;
  border: 1px solid blue;
`;

export const Text = styled.div`
  margin: 10px 0 6px 19px;
  font-size: 14px;
  color: #63aeae;
`;

export const Content = styled.div`
  margin-left: 19px;
  font-size: 8px;
  color: #63aeae;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

export const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 214px;
  border-radius: 10px;
  background-color: #dddddd;
`;

export const FilterPriceSlideInner = styled.div`
  position: absolute;
  left: ${(props) => props.rangeMinPercent}%; // %
  right: ${(props) => props.rangeMaxPercent}%;
  height: 4px;
  border-radius: 10px;
  background-color: #b0b0b0;
`;

const FilterPriceRangeWrap = styled.div`
  position: relative;
  border: 1px solid yellow;
  width: 214px;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -12px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  border: 1px solid;
  pointer-events: none;
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
  border: 1px solid pink;
  /* top: 10px; // 지우기 */
`;

const PriceBox = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const Min = styled.div`
  border-radius: 8px !important;
  box-shadow: rgb(176 176 176) 0px 0px 0px 1px inset;
  > .price {
    outline: none;
    border: none;
  }
`;

const Max = styled.div`
  border-radius: 8px !important;
  box-shadow: rgb(176 176 176) 0px 0px 0px 1px inset;
`;
const Mid = styled.div`
  margin: 8px;
`;

function PriceFilter() {
  const fixedMinPrice = 100;
  const fixedMaxPrice = 100000;
  const priceGap = 10000;
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
  return (
    <Block>
      <ButtonContainer onClick={openModal}>
        <HiFilter className="filter" size={30} />
      </ButtonContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModal}>
          <ModalContainer>
            <Container onClick={openModal}>
              <Box onClick={(e) => e.stopPropagation()}>
                <Text>가격 범위</Text>
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
                    <div>최저예산</div>
                    <span>₩</span>
                    <input className="price" autoComplete="off" type="text" value="23020"></input>
                  </Min>
                  <Mid>-</Mid>
                  <Max>
                    <div>최고예산</div>
                    <span>₩</span>
                    <input className="price" autoComplete="off" type="text" value="23020"></input>
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
