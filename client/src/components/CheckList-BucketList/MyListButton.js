import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BucketListModal } from "../Modal/BucketList/BucketListModal";
// import BaseModal from "../Modal/BaseModal";
import { CheckListModal } from "../Modal/CheckList/CheckListModal";

const Block = styled.div`
  /* border: 1px solid grey; */
  margin-top: 322px;
  padding-left: 320px;
  width: 100%;

  > p {
    color: #535353;
    margin-bottom: 5px;
    font-size: 12px;
  }
`;

const DarkMintShadowButton = styled.button`
  height: 30px;
  width: 166px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 54%);
  border: none;
  border-radius: 35px;
  font-size: 15px;
  margin-right: 11px;
  box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.01), 0 3px 2px hsla(0, 0%, 0%, 0.13), 2px 2px 6px hsla(0, 0%, 0%, 0.2);
  font-weight: bold;
  &:hover {
    background-color: hsl(180, 25%, 35%);
  }
  &:active {
    background-color: hsl(180, 25%, 31%);
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 430px;
  text-align: right;
  background-color: transparent;
  position: fixed;
  margin-top: 24px;
  margin-left: -20px;
  > .modal-inside {
    display: none;
    background-color: white;
  }
`;

// export const What = styled.div`
//   display: none;
//   width: 100%;
//   background-color: white;
//   box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.01), 0 3px 2px hsla(0, 0%, 0%, 0.13), 2px 2px 8px hsla(0, 0%, 0%, 0.13);
//   z-index: 2000;
//   border-radius: 35px;
//   white-space: normal;
//   border: 1px solid pink;
// `;

function MyListButton() {
  const buttonClickRef = useRef();
  const listRef = useRef();
  const buttonClickRef2 = useRef();
  const listRef2 = useRef();

  const modalHandler = ({ target }) => {
    if (buttonClickRef.current.contains(target)) {
      listRef.current.style.display = "block";
    } else if (!listRef.current.contains(target)) {
      listRef.current.style.display = "none";
    } else {
      listRef.current.style.display = "block";
    }

    if (buttonClickRef2.current.contains(target)) {
      listRef2.current.style.display = "block";
    } else if (!listRef2.current.contains(target)) {
      listRef2.current.style.display = "none";
    } else {
      listRef2.current.style.display = "block";
    }
  };

  useEffect(() => {
    window.addEventListener("click", modalHandler);
    return () => {
      window.removeEventListener("click", modalHandler);
    };
  });

  return (
    <Block>
      <p>이 안에 리스트를 작성할 수 있어요. 클릭해보세요!</p>
      <DarkMintShadowButton ref={buttonClickRef}>체크리스트</DarkMintShadowButton>
      <Modal>
        <div ref={listRef} className="modal-inside">
          <CheckListModal />
        </div>
      </Modal>

      <DarkMintShadowButton ref={buttonClickRef2}>버킷리스트</DarkMintShadowButton>
      <Modal>
        <div ref={listRef2} className="modal-inside">
          {/* <BaseModal /> */}
          <BucketListModal />
        </div>
      </Modal>
    </Block>
    //   <div>
    //   <BiCheckSquare className="check-icon" size={24} />
    // </div>
  );
}

export default MyListButton;
