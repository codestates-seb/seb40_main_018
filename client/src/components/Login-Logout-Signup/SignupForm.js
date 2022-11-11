import styled from "styled-components";
import ShortInput from "../Input/ShortInput";

export const Box = styled.div`
  border: 1px solid green;
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// > button {
//   flex-direction: row;
// }

export const SignupForm = () => {
  return (
    <Box>
      <ShortInput text="닉네임" />
      <ShortInput text="이메일입력" />
      <ShortInput text="비밀번호" />
      <ShortInput text="비밀번호 확인" />
      <div>
        <button>로그인</button>
        <button>가입하기</button>
      </div>
    </Box>
  );
};
