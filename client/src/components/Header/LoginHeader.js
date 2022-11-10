import styled from "styled-components";
import { Link } from "react-router-dom";
// import user from "../../images/user.png";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../images/DanimLogo.PNG";
import { useEffect, useRef } from "react";
import { HeaderModal } from "../Modal/HeaderModal";

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
  background: white;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 63px;
  padding: 16px 32px 0px 35px;
  text-align: center;
  > a {
    > .logo {
      width: 102px;
    }
    > .user-icon {
    }
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 204px;
  position: relative;
  text-align: right;
  > .modal-inside {
    width: 100%;
    background-color: white;
    box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.01), 0 3px 2px hsla(0, 0%, 0%, 0.13), 2px 2px 0px hsla(0, 0%, 0%, 0.13);
    z-index: 2000;
    border-radius: 35px;
    white-space: normal;
  }
`;

export const LoginHeader = () => {
  const modalRef = useRef();
  const insideClickRef = useRef();

  const modalHandler = ({ target }) => {
    if (insideClickRef.current.contains(target)) {
      modalRef.current.style.display = "block";
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
        <Link to="/">
          <img className="logo" alt="logo" src={logo} />
        </Link>
        <Modal ref={insideClickRef}>
          <FaUserCircle size="32" color="#40D8D8" />
          <div ref={modalRef} className="modal-inside">
            <HeaderModal />
          </div>
        </Modal>
      </HeaderContainer>
    </Box>
  );
};
