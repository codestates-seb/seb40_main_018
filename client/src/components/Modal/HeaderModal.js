import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import MintLineButton from "../Button/MintLineButton";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "../../redux/userAction";

export const Container = styled.div`
  width: 100%;
  padding: 16px 62px;
  border-bottom: 1px solid #dcdcdc;
  @media screen and (max-width: 875px) {
    display: flex;
    flex-flow: row wrap;
  }
`;

const Container2 = styled(Container)`
  border-bottom: none;
`;

export const Inside = styled.div`
  font-size: 14px;
  color: #535353;
  line-height: 2;
  text-align: center;

  > .word-break {
    > a {
      display: inline-block;
      width: 90px;
      margin-left: -15px;
      text-decoration: none;
      color: #535353;
    }
  }
`;

export const ModalContainer = styled.div``;

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
  color: #535353;
  background-color: white;
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

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
`;
const LogoutAsk = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  width: 100%;
  color: #535353;
  font-size: 20px;
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const YesBtn = styled.div`
  margin-right: 14px;
`;

export const HeaderModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.userReducer.data);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    console.log("로그아웃 완료");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(getLoginStatus({ isLogin: false }));
    navigate("/");
    window.location.reload(); // 효과
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
          <div className="word-break">
            <Link to="/mylist">마이리스트</Link>
          </div>
        </Inside>
      </Container>
      <Container2>
        <Inside>
          <ModalBtn onClick={openModal} className="last">
            로그아웃
          </ModalBtn>
        </Inside>
      </Container2>
      <ModalContainer>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModal}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <span className="close-btn">
                <IoIosClose className="close" size={30} onClick={openModal} color="#535353"></IoIosClose>
              </span>
              <TextArea>
                <LogoutAsk>로그아웃 하시겠습니까?</LogoutAsk>
                <Box>
                  <YesBtn>
                    <MintLineButton handleSubmit={logoutHandler} text="네" />
                  </YesBtn>
                  <MintButton3 width="66px" height="30px" onClick={openModal}>
                    아니오
                  </MintButton3>
                </Box>
              </TextArea>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
