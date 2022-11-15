import { useEffect, useState } from "react";
// import { IoIosClose } from "react-icons/io";
import styled from "styled-components";
import { BucketInput } from "./BucketInput";
import { BucketList } from "./BucketList";

export const Container = styled.div`
  width: 100%;
  padding-left: 14px;
  padding-right: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #63aeae;
  border-radius: 35px;
  box-shadow: 0 0 1px #63aeae, 0 0 1px #63aeae, 0 0 5px #63aeae;
`;

export const ListHeader = styled.div`
  /* border: 1px solid pink; */
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  margin-bottom: 4px;
  margin-top: 18px;
  > div {
    font-size: 16px;
    color: #63aeae;
    background-color: transparent;
  }

  > .close-btn {
    background-color: transparent;
    margin-top: -4px;
    > .close {
      cursor: pointer;
      background-color: transparent;
    }
  }
`;

export const Text = styled.div`
  margin-left: 19px;
`;

export const ListInput = styled.div`
  /* border: 1px solid yellow; */
`;

export const BucketListModal = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <ListHeader>
        <Text>Bucket List</Text>
        {/* <span className="close-btn">
          <IoIosClose className="close" size={30}></IoIosClose>
        </span> */}
      </ListHeader>
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
  );
};
