import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";
// import { useParams } from "react-router-dom";
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

export const Test = styled.div`
  margin: 32px 0 19px 0px;
  > .list-item {
    width: 100%;
    display: flex;
    border-top: 1px solid #dcdcdc;
    justify-content: space-between;
  }
`;

export const Block2 = styled.div`
  display: flex;
  > .complete-icon {
    border: none;
    background-color: transparent;
    margin-left: 3px;
    cursor: pointer;
  }
  > .complete {
    text-decoration-style: solid;
    text-decoration-line: line-through;
    text-decoration-color: black;
    opacity: 0.6;
  }

  > .list {
    width: 250px;
    border: none;
    color: #535353;
    font-size: 14px;
    padding-left: 10px;
    margin-right: 20px;
    line-height: 3;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  column-gap: 6px;
  align-items: center;
`;

export const MintLineButton2 = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 32%);
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(180, 66%, 74%);
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 12%, 96%);
  }
  &:active {
    background-color: hsl(180, 12%, 92%);
  }
`;

export const MintButton2 = styled.button`
  height: 30px;
  width: ${(props) => (props.width ? props.width : "auto")};
  color: hsl(0, 0%, 100%);
  background-color: hsl(180, 66%, 55%);
  border: none;
  border-radius: 35px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: hsl(180, 66%, 37%);
  }
  &:active {
    background-color: hsl(180, 66%, 33%);
  }
`;

export const CheckList = ({ input, setInput, todos, setTodos, editTodo, setEditTodo, completed }) => {
  // const id = useParams();

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
      setTodos([...todos, { title: input, completed: completed }]);
      setInput("");
    }
    // else {
    //   updateTodo(input, editTodo.id, editTodo.completed);
    // }
    // useEffect(() => {
    const todoPost = {
      title: input,
      completed: !completed,
    };
    axios
      .post("http://localhost:4000/todos", todoPost)
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));
    // }, []);
  };

  // const updateTodo = (title, id) => {
  //   const newTodo = todos.map((todo) => (todo.id === id ? { title, id, completed } : todo));
  //   setTodos(newTodo);
  //   setEditTodo("");
  // };

  const updateHandler = ({ id }) => {
    if (todos.find((todo) => todo.id === id)) {
      setTodos(todos.map((todo) => (todo.id === id ? { input, id, completed } : todo)));
    }
    console.log("patchid", id);

    setTodos([
      ...todos,
      {
        title: input,
        completed: !completed,
      },
    ]);

    const editTodos = {
      title: input,
      completed: !completed,
    };

    axios
      .patch(`http://localhost:4000/todos/` + id, editTodos)
      .then(() => setTodos(todos))
      .then((err) => console.log(err));
  };
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    );
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);

    // axios
    //   .patch(`http://localhost:4002/todos/` + id, {
    //     title: findTodo.title,
    //     completed: !findTodo.completed,
    //   })
    //   .then((res) => console.log(res.data))
    //   .then((err) => console.log(err));
  };

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todos) => todos.id !== id));
    axios.delete(`http://localhost:4000/todos/` + id);
  };

  return (
    <>
      <InputContainer width="424px" height="36px">
        <form onSubmit={onFormSubmit} className="form">
          <Input type="text" value={input} required onChange={onInputChange} />
          <Button type="submit">
            {editTodo ? (
              <MdOutlineUpdate className="update" color="5E5E5E" size="18" onClick={(todos) => updateHandler(todos)} />
            ) : (
              <AiOutlinePlusCircle className="add" color="5E5E5E" size="18" />
            )}
          </Button>
        </form>
      </InputContainer>
      <Test>
        {todos.map((todo) => (
          <li className="list-item" key={todo.id}>
            <Block2>
              <button onClick={() => handleComplete(todo)} className="complete-icon">
                {todo.completed ? "🔳" : "⬜"}
              </button>
              <input
                type="text"
                value={todo.title}
                // 완료 시 밑줄 그어짐
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
              />
            </Block2>
            <ButtonContainer>
              <MintLineButton2 width="50px" height="20px" onClick={() => handleEdit(todo)}>
                수정
              </MintLineButton2>
              <MintButton2 width="50px" height="20px" onClick={() => handleDelete(todo)}>
                삭제
              </MintButton2>
            </ButtonContainer>
          </li>
        ))}
      </Test>
    </>
    //   <div>
    //   <BiCheckSquare className="check-icon" size={24} />
    // </div>
  );
};
