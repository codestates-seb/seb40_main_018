import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";

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
  > .update {
    cursor: pointer;
  }
  > .add {
    cursor: pointer;
  }
`;

export const CheckInput = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };
  return (
    <InputContainer width="424px" height="36px">
      <form onSubmit={onFormSubmit} className="form">
        <Input type="text" value={input} required onChange={onInputChange} />
        <Button type="submit">
          {editTodo ? (
            <MdOutlineUpdate className="update" color="5E5E5E" size="18" />
          ) : (
            <AiOutlinePlusCircle className="add" color="5E5E5E" size="18" />
          )}
        </Button>
      </form>
    </InputContainer>
  );
};
