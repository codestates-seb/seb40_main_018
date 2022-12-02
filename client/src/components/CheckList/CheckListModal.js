import { useEffect, useState } from "react";
import { CheckInput } from "./CheckInput";
import { CheckList } from "./CheckList";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../pages/Loading";

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
  margin-top: 32px;
`;

export const Text = styled.div`
  margin-left: 19px;
  font-size: 16px;
  color: #63aeae;
`;

export const Block = styled.div`
  flex-direction: row;
`;
export const ListInput = styled.div`
  display: flex;
  justify-content: center;
`;

export const CheckListModal = () => {
  // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [completed, setcompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/check-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        // 로딩 시간이 짧아 settimeout 적용
        const timer = setTimeout(() => {
          setTodos(result.data);
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      });
  }, []);

  return (
    <Block>
      <DarkMintShadowButton>체크리스트</DarkMintShadowButton>
      <Container>
        <ListHeader />
        <ListInput>
          <CheckInput
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            completed={completed}
            setcompleted={setcompleted}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          ></CheckInput>
        </ListInput>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <CheckList
              todos={todos}
              setTodos={setTodos}
              setEditTodo={setEditTodo}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      </Container>
    </Block>
  );
};
