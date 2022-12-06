import axios from "axios";
import styled from "styled-components";

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

export const BucketList = ({ todos, setTodos }) => {
  const accessToken = localStorage.getItem("accessToken");
  const handleComplete = async (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.bucketId) {
          return { ...item, isBucket: !item.isBucket };
        }
        return item;
      }),
    );

    const patch2 = {
      bucketContent: todo.bucketContent,
      isBucket: !todo.isBucket,
    };

    axios
      .patch(`${process.env.REACT_APP_API_URL}bucket-list/${todo.bucketId}`, patch2)
      .catch((err) => console.log("res1", err));

    await axios
      .get(`${process.env.REACT_APP_API_URL}member/me/bucket-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        setTodos(result.data.data);
        // navigate(`/mylist/${cid}`);
      });
  };

  // const handleEdit = (bucketId) => {
  //   console.log("handleEdit_bucketId", bucketId);
  //   const findTodo = todos.find((todo) => todo.bucketId === bucketId);
  //   setEditTodo(findTodo);

  //   setIsEdit(!isEdit);
  // };

  const handleDelete = async (item) => {
    // setTodos(todos.filter((todos) => todos.id !== id));
    await axios.delete(`${process.env.REACT_APP_API_URL}bucket-list/${item.bucketId}`);

    await axios
      .get(`${process.env.REACT_APP_API_URL}member/me/bucket-list`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((result) => {
        setTodos(result.data.data);
        // navigate(`/mylist/${cid}`);
      });
  };

  return (
    <Test>
      {todos.length > 0 &&
        todos.map((todo, idx) => (
          <li className="list-item" key={idx}>
            <Block2>
              <button onClick={() => handleComplete(todo)} className="complete-icon">
                {todo.isBucket ? "🔳" : "⬜"}
              </button>
              <input
                type="text"
                value={todo.bucketContent}
                // 완료 시 밑줄 그어짐
                className={`list ${todo.isBucket ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
              />
            </Block2>
            <ButtonContainer>
              {/* <MintLineButton2 width="50px" height="20px" onClick={() => handleEdit(todo)}>
              수정
            </MintLineButton2> */}
              <MintButton2 width="50px" height="20px" onClick={() => handleDelete(todo)}>
                삭제
              </MintButton2>
            </ButtonContainer>
          </li>
        ))}
    </Test>
  );
};
