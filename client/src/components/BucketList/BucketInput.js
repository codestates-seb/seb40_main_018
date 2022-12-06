// import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Update } from "../CheckList/CheckInput";

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
  // editTodo,
  // setEditTodo,
  completed,
  // isEdit,
  // setIsEdit,
}) => {
  // const id = useParams().id;

  const accessToken = localStorage.getItem("accessToken");

  // pass
  const onFormSubmit = async (event) => {
    event.preventDefault();
    setTodos([...todos, { bucketContent: input, isBucket: completed }]);
    setInput("");

    const todoPost = {
      bucketContent: input,
      isBucket: false,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}bucket-list`, todoPost, {
        headers: {
          Authorization: accessToken,
        },
      })
      .catch((err) => console.log(err));

    await axios
      .get(`${process.env.REACT_APP_API_URL}member/me/bucket-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        setTodos(result.data.data);
      });
  };

  // useEffect(() => {
  //   if (editTodo) {
  //     setInput(editTodo.bucketContent);
  //   } else {
  //     setInput("");
  //   }
  // }, [setInput, editTodo]);

  const setInputChange = (event) => {
    setInput(event.target.value);
  };

  // const updateTodo = (id) => {
  //   // const newTodo = todos.map((todo) => (todo.id === id ? { title, id, completed } : todo));

  //   console.log("newTodo", newTodo);
  //   setTodos(newTodo);
  //   setEditTodo("");
  // };

  // const updateHandler = () => {
  //   //  오류핵심
  //   // updateTodo(editTodo.bucketId);
  //   // console.log("patchid", editTodo.id);
  //   const id = editTodo.id;
  //   console.log("id", id);
  //   const newTodo = todos.find((todo) => todo.id === id);
  //   setEditTodo("");

  //   const patch2 = {
  //     bucketContent: newTodo.bucketContent,
  //     isBucket: completed,
  //   };

  //   // ^^editTodo.id

  //   axios
  //     .patch(`/bucket-list/${editTodo.bucketId}`, patch2)
  //     .then((res) => console.log(res))
  //     .then((err) => console.log("res2", err));

  //   setIsEdit(!isEdit);
  // };
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
      {/* {isEdit ? (
        <Update color="5E5E5E" size="18" onClick={(todos) => updateHandler(todos)}>
          저장
        </Update>
      ) : null} */}
    </>
  );
};
