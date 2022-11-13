import { Link } from "react-router-dom";
import { Box, HeaderContainer, Logo2 } from "./LoginHeader";
import styled from "styled-components";

export const BtnArea = styled.div`
  display: flex;
  text-align: center;
  padding-right: 12px;
  border: 1px solid blue;
  > a {
    > button {
      border: none;
    }
  }
`;

export const AddStyle = styled.div`
  margin-left: 5px;
  > a {
    > button {
      border: none;
    }
  }
`;

export const Header = () => {
  return (
    <Box>
      <HeaderContainer>
        <Link to="/">
          <Logo2 />
        </Link>
        <BtnArea>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <AddStyle>
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          </AddStyle>
        </BtnArea>
      </HeaderContainer>
    </Box>
  );
};
