import { useEffect, useState } from "react";
import styled from "styled-components";
import { BucketInput } from "./BucketInput";
import { BucketList } from "./BucketList";
import { Block } from "../CheckList/CheckListModal";
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
  // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [completed, setcompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://ec2-43-201-50-74.ap-northeast-2.compute.amazonaws.com:8080/bucket-list`).then((result) => {
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
            completed={completed}
            setcompleted={setcompleted}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </ListInput>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <BucketList
              todos={todos}
              setTodos={setTodos}
              setEditTodo={setEditTodo}
              completed={completed}
              setcompleted={setcompleted}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      </Container>
    </Block>
  );
};
