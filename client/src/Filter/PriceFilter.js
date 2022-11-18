import styled from "styled-components";
import { HiFilter } from "react-icons/hi";
import { useState } from "react";

export const Block = styled.div`
  margin-top: 185px;
  margin-right: 114px;
  display: inline-block;
  float: right;
`;

export const ButtonContainer = styled.div`
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
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 377px;
  z-index: 999;
  /* 오른쪽 정렬 코드 */
  /* display: inline-block;
  float: right;
  margin-right: 114px; */
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid yellow;
  padding-top: 260px;
`;

export const Container = styled.div`
  width: 100%;
  padding-left: 9px;
  padding-right: 26.93px;
  border: 1px solid #63aeae;
  border-radius: 20px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
`;

const Box = styled.div`
  position: relative;
  border: 1px solid blue;
`;

export const Text = styled.div`
  margin: 16.27px 0 22px 19px;
  font-size: 24px;
  color: #63aeae;
  display: flex;
`;

export const Content = styled.div`
  margin-left: 19px;
  font-size: 8px;
  color: #535353;
  display: flex;
  flex-direction: column;
  margin-bottom: 34px;
  border: 1px solid red;
`;

function PriceFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Block>
      <ButtonContainer onClick={openModal}>
        <HiFilter size={30} />
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
              </Box>
            </Container>
          </ModalContainer>
        </ModalBackdrop>
      ) : null}
    </Block>
  );
}

export default PriceFilter;
