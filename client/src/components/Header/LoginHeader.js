import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { HeaderModal } from "../Modal/HeaderModal";
import { ReactComponent as Logo } from "../../images/DanimLogo.svg";
import MintLineButton from "../Button/MintLineButton";

export const Box = styled.div`
  width: 100%;
  height: 63px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  z-index: 99;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 63px;
  padding: 16px 40px 0px 0px;
  background-color: #ffffff;
  .user-image {
    margin-left: 18px;
    cursor: pointer;
  }
`;

export const Logo2 = styled(Logo)`
  width: 120px;
  height: 120px;
  margin-left: 35px;
  margin-top: -48px;
`;

export const Block = styled.div`
  display: flex;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 180px;
  position: fixed;
  margin-top: 36px;
  margin-left: 7px;
  > .modal-inside {
    display: none;
    width: 100%;
    background-color: white;
    box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.01), 0 3px 2px hsla(0, 0%, 0%, 0.13), 2px 2px 8px hsla(0, 0%, 0%, 0.13);
    z-index: 2000;
    border-radius: 35px;
    white-space: normal;
  }
`;

function LoginHeader() {
  const modalRef = useRef();
  const insideClickRef = useRef();

  const modalHandler = ({ target }) => {
    if (insideClickRef.current.contains(target)) {
      modalRef.current.style.display = "block";
    } else if (!modalRef.current.contains(target)) {
      modalRef.current.style.display = "none";
    } else {
      modalRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("click", modalHandler);
    return () => {
      window.removeEventListener("click", modalHandler);
    };
  });

  return (
    <Box>
      <HeaderContainer>
        <a href="/">
          <Logo2 />
        </a>
        {/* Header.js / 로그인 ? 로그인 후 헤더 : 로그인 전 헤더 */}
        <Block>
          <Link to="/diary">
            <MintLineButton text="일기 작성하기" width="138px" height="32px">
              일기 작성하기
            </MintLineButton>
          </Link>
          <div ref={insideClickRef} className="user-image">
            <FaUserCircle className="user" size="32" color="#40D8D8" />
          </div>
          <Modal>
            <div ref={modalRef} className="modal-inside">
              <HeaderModal />
            </div>
          </Modal>
        </Block>
      </HeaderContainer>
    </Box>
  );
}

export default LoginHeader;
