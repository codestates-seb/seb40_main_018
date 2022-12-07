import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
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

  > .add {
    cursor: pointer;
  }
`;

export const Update = styled.button`
  cursor: pointer;
  border: none;
  background-color: #ffffff;
  color: #535353;
  width: 39px;
  margin-left: 2px;
`;

export const CheckInput = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodo,
  // setEditTodo,
  completed,
  // isEdit,
  // setIsEdit,
}) => {
  // const cid = useParams().id;

  const accessToken = localStorage.getItem("accessToken");
  // const navigate = useNavigate();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setTodos([...todos, { checkContent: input, isCheck: completed }]);
    setInput("");

    // useEffect(() => {
    const todoPost = {
      checkContent: input,
      isCheck: false,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}check-list`, todoPost, {
        headers: {
          Authorization: accessToken,
        },
      })
      .catch((err) => console.log(err));

    await axios
      .get(`${process.env.REACT_APP_API_URL}member/me/check-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        setTodos(result.data.data);
      });
    // }, []);
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.checkContent);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  // pass
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // 수정 버튼
  // const updateTodo = (title, id) => {
  //   const newTodo = todos.map((todo) => {
  //     console.log("todo", todo);
  //     todo.checkId === id ? { title, id, completed } : todo;
  //   });
  //   console.log("newtodo", newTodo);
  //   setTodos(newTodo);
  //   setEditTodo("");
  // };

  // params x
  // const updateHandler = () => {
  //   //   updateTodo(input, editTodo.checkId);

  //   //   const patch2 = {
  //   //     checkContent: input,
  //   //     isCheck: completed,
  //   //   };

  //   // ^^editTodo.id
  //   axios
  //     .patch(`/check-list/${editTodo.checkId}`, patch2)
  //     .then((res) => console.log(res))
  //     .then((err) => console.log("res2", err));

  //   setIsEdit(!isEdit);
  // };
  return (
    <>
      <InputContainer width="424px" height="36px">
        <form onSubmit={onFormSubmit} className="form">
          <Input type="text" value={input} required onChange={onInputChange} />
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
