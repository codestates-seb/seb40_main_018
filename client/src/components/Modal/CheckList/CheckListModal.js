import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { CheckInput } from "./CheckInput";
import { CheckList } from "./CheckList";
import styled from "styled-components";
// import axios from "axios";

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

export const Container = styled.div`
  width: 100%;
  padding-left: 14px;
  padding-right: 16px;
  border: 1px solid #63aeae;
  border-radius: 35px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  margin-top: 17px;
  > .close-btn {
    margin-top: -3px;
    > .close {
      cursor: pointer;
    }
  }
`;

export const Text = styled.div`
  margin-left: 19px;
  font-size: 16px;
  color: #63aeae;
`;

export const ListInput = styled.div``;
export const Box = styled.div``;
export const ModalContainer2 = styled.div`
  width: 100%;
  max-width: 430px;
  text-align: right;
  position: fixed;
  margin-top: 24px;
  margin-left: -20px;
  z-index: 999;
`;

export const ModalBackdrop2 = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-left: 320px;
  padding-top: 372px;
`;

export const CheckListModal = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
  //     setTodos(result.data);
  //   });
  // }, []);
  return (
    <>
      <DarkMintShadowButton onClick={openModal}>체크리스트</DarkMintShadowButton>
      {isOpen === true ? (
        <ModalBackdrop2 onClick={openModal}>
          <ModalContainer2>
            <Container onClick={openModal}>
              <Box onClick={(e) => e.stopPropagation()}>
                <ListHeader>
                  <Text>Check List</Text>
                  <span className="close-btn">
                    <IoIosClose onClick={openModal} className="close" size={30}></IoIosClose>
                  </span>
                </ListHeader>
                <ListInput>
                  <CheckInput
                    input={input}
                    setInput={setInput}
                    todos={todos}
                    setTodos={setTodos}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                  />
                </ListInput>
                <div>
                  <CheckList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
                </div>
              </Box>
            </Container>
          </ModalContainer2>
        </ModalBackdrop2>
      ) : null}
    </>
  );
};
