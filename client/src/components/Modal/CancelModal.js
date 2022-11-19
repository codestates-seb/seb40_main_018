import styled from "styled-components";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import MintButton from "../Button/MintButton";
import MintLineButton from "../Button/MintLineButton";
import { Container, Inside, MintButton3, ModalBackdrop, ModalView } from "./HeaderModal";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YesBtn = styled.div`
  margin-right: 14px;
`;

function CancelModal() {
  const navigate = useNavigate();
  const [isOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <>
      <MintButton3 onClick={openModal2} text="취소" width="69px" height="35px">
        취소
      </MintButton3>
      <Container>
        <Inside>
          {isOpen2 === true ? (
            <ModalBackdrop onClick={openModal2}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <span className="close-btn">
                  <IoIosClose className="close" size={30} onClick={openModal2}></IoIosClose>
                </span>
                <div className="desc">정말 취소하시겠습니까?</div>
                <Box>
                  <YesBtn>
                    <MintLineButton text="네" handleSubmit={() => navigate(-1)} />
                  </YesBtn>

                  <MintButton3 width="66px" height="30px" onClick={openModal2}>
                    아니오
                  </MintButton3>
                </Box>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </Inside>
      </Container>
    </>
  );
}

export default CancelModal;
