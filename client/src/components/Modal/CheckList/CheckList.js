import styled from "styled-components";
import { ButtonContainer } from "../../CheckList-BucketList/CheckList";
import { MintButton2, MintLineButton2 } from "../../CheckList-BucketList/BucketList";
export const Test = styled.div`
  margin: 19px 0 19px 0px;
  background-color: white;
  > .list-item {
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    background-color: white;
    border-top: 1px solid #dcdcdc;
    justify-content: space-between;
  }
`;

export const Block2 = styled.div`
  background-color: transparent;
  display: flex;
  > .complete-icon {
    border: none;
    background-color: transparent;
    margin-left: 3px;
  }
  > .complete {
    text-decoration-style: solid;
    text-decoration-line: line-through;
    text-decoration-color: black;
    opacity: 0.6;
  }

  > .list {
    width: 220px;
    background-color: white;
    border: none;
    color: #535353;
    font-size: 14px;
    padding-left: 10px;
    margin-right: 20px;
    font-family: "Gowun Dodum", sans-serif;
    line-height: 3;
  }
`;

export const CheckList = ({ todos, setTodos, setEditTodo }) => {
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
  };

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todos) => todos.id !== id));
  };

  return (
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
  );
};
