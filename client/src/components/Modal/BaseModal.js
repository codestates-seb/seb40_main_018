// import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import styled from "styled-components";
import BucketList from "../CheckList-BucketList/BucketList";
import Input from "../CheckList-BucketList/Input";

export const Container = styled.div`
  width: 100%;
  padding-left: 32px;
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
  margin-bottom: 13px;
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

export const ListInput = styled.div`
  /* border: 1px solid yellow; */
`;

export const ListContent = styled.div`
  /* border: 1px solid blue; */
`;

function BaseModal() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState("");
  return (
    <>
      <Container>
        <ListHeader>
          <div>Bucket List</div>
          <span className="close-btn">{/* <IoIosClose className="close" size={30}></IoIosClose> */}</span>
        </ListHeader>
        <ListInput>
          <Input input={input} setInput={setInput} todos={todos} setTodos={setTodos} />
        </ListInput>
        <ListContent>
          <BucketList />
        </ListContent>
      </Container>
    </>
  );
}

export default BaseModal;
