import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
// import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MintLineButton from "../Button/MintLineButton";
import { Container, Inside, MintButton3, ModalBackdrop, ModalView } from "./HeaderModal";

export const ModalBtn2 = styled.button`
  border: none;
  cursor: pointer;
  font-size: 12px;
  background-color: #fbfbfb;
  margin-left: 5px;
  color: #afafaf;
`;
const Container2 = styled(Container)`
  border-bottom: none;
`;

const CloseBtn = styled.div`
  display: flex;
  margin: 15px 15px 0 0;
  justify-content: flex-end;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
`;
const DeleteText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  font-size: 20px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 10px;
`;
const YesBtn = styled.div`
  margin-right: 14px;
`;

function DeleteModal({ diaryDetail }) {
  const navigate = useNavigate();

  const [isOpen2, setIsOpen2] = useState(false);
  const [isMine, setIsMine] = useState();
  const openModal2 = () => {
    setIsOpen2(!isOpen2);
  };
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}member/me`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => setIsMine(res.data.data.memberId));
  }, []);

  const submitHandler = () => {
    if (isMine === diaryDetail.memberId) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}diary/${diaryDetail.diaryId}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then(() => navigate("/"))
        .catch((err) => console.log("deleteErr", err));
    } else if (isMine !== diaryDetail.memberId) {
      alert("직접 작성한 일기만 삭제 가능합니다.");
      return false;
    }
  };
  return (
    <>
      <ModalBtn2 onClick={openModal2}>삭제</ModalBtn2>
      <Container2>
        <Inside>
          {isOpen2 === true ? (
            <ModalBackdrop onClick={openModal2}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <CloseBtn>
                  <IoIosClose className="close" size={30} onClick={openModal2}></IoIosClose>
                </CloseBtn>
                <TextArea>
                  <DeleteText>정말 삭제하시겠습니까?</DeleteText>
                  <Box>
                    <YesBtn>
                      <MintLineButton text="네" handleSubmit={submitHandler} />
                    </YesBtn>
                    <MintButton3 width="66px" height="30px" onClick={openModal2} className="no">
                      아니오
                    </MintButton3>
                  </Box>
                </TextArea>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </Inside>
      </Container2>
    </>
  );
}

export default DeleteModal;
