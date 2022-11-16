import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import MintLineButton from "../Button/MintLineButton";

export const Container = styled.div`
  width: 100%;
  padding: 16px 62px;
  border-bottom: 1px solid #dcdcdc;
  background-color: rgba(255, 255, 255, 0.05);

  :last-child {
    border: none;
  }

  @media screen and (max-width: 875px) {
    display: flex;
    flex-flow: row wrap;
  }
`;

export const Inside = styled.div`
  font-size: 14px;
  color: #535353;
  line-height: 1.8;
  text-align: center;

  > .word-break {
    > a {
      display: inline-block;
      width: 90px;
      margin-left: -15px;
      text-decoration: none;
      color: #535353;
      background-color: #ffffff;
    }
  }
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalBtn = styled.button`
  width: 100%;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: #ffffff;
  color: #535353;
`;

export const ModalView = styled.div`
  border-radius: 35px;
  background-color: #ffffff;
  width: 390px;
  height: 154px;
  @media screen and (max-width: 640px) {
    width: 330px;
    height: 144px;
  }
  > .close-btn {
    cursor: pointer;
    float: right;
    margin: 20px 20px 0 0;
  }
  > div.desc {
    margin: 40px 0px 10px 45px;
    color: #535353;
    font-size: 20px;
    @media screen and (max-width: 640px) {
      font-size: 18px;
    }
  }
`;

export const BottomButton = styled.button`
  border: none;
  justify-content: space-between;
  background-color: transparent;
  > .no {
    margin-left: 14px;
    border: none;
    background-color: transparent;
  }
`;

export const MintButton3 = styled.button`
  height: ${(props) => (props.height ? props.height : "auto")};
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 66%, 55%);
  border: none;
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 66%, 37%);
  }
  &:active {
    background-color: hsl(180, 66%, 33%);
  }
`;

export const HeaderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Container>
        <Inside>
          <div className="word-break">
            <Link to="/">메인페이지</Link>
          </div>
        </Inside>
      </Container>
      <Container>
        <Inside>
          <div className="word-break">
            <Link to="/mypage">마이페이지</Link>
          </div>
        </Inside>
      </Container>
      <Container>
        <Inside>
          <ModalContainer>
            <ModalBtn onClick={openModal}>로그아웃</ModalBtn>
            {isOpen === true ? (
              <ModalBackdrop onClick={openModal}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <span className="close-btn">
                    <IoIosClose className="close" size={30} onClick={openModal}></IoIosClose>
                  </span>
                  <div className="desc">로그아웃 하시겠습니까?</div>
                  <BottomButton>
                    {/* UserInfo.js / onClick={logoutHandler} */}
                    <Link to="/" className="yes">
                      <MintLineButton text="네" />
                    </Link>
                    <button onClick={openModal} className="no">
                      <MintButton3 width="66px" height="30px">
                        아니오
                      </MintButton3>
                    </button>
                  </BottomButton>
                </ModalView>
              </ModalBackdrop>
            ) : null}
          </ModalContainer>
        </Inside>
      </Container>
    </>
  );
};
