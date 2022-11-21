import { useEffect, useState } from "react";
import styled from "styled-components";
import { BucketInput } from "./BucketInput";
import { BucketList } from "./BucketList";
import { Block } from "../CheckList/CheckListModal";

const DarkMintShadowButton = styled.button`
  height: 30px;
  width: 170px;
  margin-bottom: 20px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 32%, 54%);
  border: none;
  border-radius: 35px;
  font-size: 15px;
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
  width: 500px;
  background-color: white;
  padding-left: 14px;
  padding-right: 16px;
  border: 1px solid #63aeae;
  border-radius: 35px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
`;

export const ListHeader = styled.div`
  margin-top: 30px;
`;

export const Text = styled.div`
  margin-left: 19px;
  font-size: 16px;
  color: #63aeae;
`;

export const ListInput = styled.div`
  display: flex;
  justify-content: center;
`;
export const Box = styled.div``;

export const BucketListModal = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <Block>
      <DarkMintShadowButton>버킷리스트</DarkMintShadowButton>
      <Container>
        <ListHeader />
        <ListInput>
          <BucketInput
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </ListInput>
        <div>
          <BucketList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
        </div>
      </Container>
    </Block>
  );
};