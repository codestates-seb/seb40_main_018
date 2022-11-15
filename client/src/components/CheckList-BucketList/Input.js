import CheckListInput from "../Input/CheckListInput";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export const Block = styled.div`
  width: 100%;
  margin-left: -18px;
`;

function Input({ input, setInput, todos, setTodos }) {
  const onInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log([...todos, { id: uuidv4(), title: input, completed: false }]);
    setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
    setInput("");
  };
  return (
    <Block onSubmit={onFormSubmit}>
      <CheckListInput width="399px" height="36px" value={input} required onChange={onInputChange} />
    </Block>
  );
}

export default Input;
