import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MintLineButton from "../Button/MintLineButton";
import { BottomButton, Container, Inside, MintButton3, ModalBackdrop, ModalView } from "./HeaderModal";

export const ModalBtn2 = styled.button`
  width: 100%;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  background-color: none;
  color: #afafaf;
`;

function DeleteModal() {
  const [isOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => {
    setIsOpen2(!isOpen2);
  };
  return (
    <Container>
      <Inside>
        <ModalBtn2 onClick={openModal2}>삭제</ModalBtn2>
        {isOpen2 === true ? (
          <ModalBackdrop onClick={openModal2}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <span className="close-btn">
                <IoIosClose className="close" size={30} onClick={openModal2}></IoIosClose>
              </span>
              <div className="desc">정말 삭제하시겠습니까?</div>
              <BottomButton>
                <Link to="/" className="yes">
                  <MintLineButton text="네" />
                </Link>
                <button onClick={openModal2} className="no">
                  <MintButton3 width="66px" height="30px">
                    아니오
                  </MintButton3>
                </button>
              </BottomButton>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </Inside>
    </Container>
  );
}

export default DeleteModal;
