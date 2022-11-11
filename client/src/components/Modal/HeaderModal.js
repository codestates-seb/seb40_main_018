import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

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
      margin-left: -5px;
      text-decoration: none;
      color: #535353;
      background-color: #ffffff;
    }
  }
`;

export const ModalContainer = styled.div`
  text-align: center;
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
  text-decoration: none;
  border: none;
  padding-top: 5px;
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
  border: 1px solid blue;
  width: 130px;
  justify-content: space-between;
  > .yes {
    width: 54.3px;
    height: 29.13px;
    border: 1px solid blue;
  }
  > .no {
    width: 54.3px;
    height: 29.13px;
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
            <Link to="/mypage">마이페이지</Link>
          </div>
        </Inside>
      </Container>
      <Container>
        <Inside>
          <div className="word-break">
            <Link to="/diaryedit/:id">일기 작성</Link>
          </div>
          <div className="word-break">
            <Link to="/mylist">마이 리스트</Link>
          </div>
        </Inside>
      </Container>
      <Container>
        <Inside>
          <div className="word-break">
            <Link to="/useredit">회원정보 수정</Link>
          </div>
          <ModalContainer>
            <ModalBtn onClick={openModal}>로그아웃</ModalBtn>
            {isOpen === true ? (
              <ModalBackdrop onClick={openModal}>
                <ModalView onClick={(e) => e.stopPropagation()}>
                  <span className="close-btn">
                    <AiOutlineClose onClick={openModal}></AiOutlineClose>
                  </span>
                  <div className="desc">로그아웃 하시겠습니까?</div>
                  <BottomButton>
                    <Link to="/" className="yes">
                      네
                    </Link>
                    <button onClick={openModal} className="no">
                      아니오
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
