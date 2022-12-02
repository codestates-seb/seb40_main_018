import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { Update } from "../CheckList/CheckInput";
import { useParams } from "react-router-dom";

export const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "350px")};
  height: ${(props) => (props.height ? props.height : "58px")};
  border-radius: 35px;
  box-shadow: 0 2px 2px 1px #0000002e;
  display: flex;
  > .form {
    display: flex;
  }
`;

export const Input = styled.input`
  outline-style: none;
  border: none;
  font-size: 14px;
  width: 365px;
  color: #535353;
  margin-top: -2px;
  margin-left: 20px;
`;

export const Button = styled.button`
  border: none;
  margin-top: 4px;
  background-color: transparent;

  > .add {
    cursor: pointer;
  }
`;

export const BucketInput = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodo,
  setEditTodo,
  completed,
  isEdit,
  setIsEdit,
}) => {
  const id = useParams().id;
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => (todo.id === id ? { title, id, completed } : todo));
    setTodos(newTodo);
    setEditTodo("");
  };
  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const setInputChange = (event) => {
    setInput(event.target.value);
  };

  const accessToken = localStorage.getItem("accessToken");

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setTodos([...todos, { bucketContent: input, isCheck: completed }]);
    setInput("");

    const todoPost = {
      bucketContent: input,
      isCheck: false,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}bucket-list`, todoPost, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));

    await axios
      .get(`${process.env.REACT_APP_API_URL}bucket-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        setTodos(result.data);
      });
  };

  const updateHandler = () => {
    updateTodo(input, editTodo.id, editTodo.completed);
    // console.log("patchid", editTodo.id);

    const patch2 = {
      bucketContent: input,
      isCheck: completed,
    };

    // ^^editTodo.id

    axios
      .patch(`${process.env.REACT_APP_API_URL}bucket-list${id}`, patch2)
      .then((res) => console.log(res))
      .then((err) => console.log("res2", err));

    setIsEdit(!isEdit);
  };
  return (
    <>
      <InputContainer width="424px" height="36px">
        <form onSubmit={onFormSubmit} className="form">
          <Input type="text" value={input} required onChange={setInputChange} />
          <Button type="submit">
            <AiOutlinePlusCircle className="add" color="5E5E5E" size="18" />
          </Button>
        </form>
      </InputContainer>
      {isEdit ? (
        <Update color="5E5E5E" size="18" onClick={(todos) => updateHandler(todos)}>
          저장
        </Update>
      ) : null}
    </>
  );
};
