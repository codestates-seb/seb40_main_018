import { Link } from "react-router-dom";
import { Box, HeaderContainer, Logo2 } from "./LoginHeader";
import styled from "styled-components";
import MintLineButton from "../Button/MintLineButton";
import MintButton from "../Button/MintButton";

export const BtnArea = styled.div`
  display: flex;
  text-align: center;
  column-gap: 12px;
  background-color: transparent;
  a {
    background-color: transparent;
  }
`;

export const AddStyle = styled.div`
  margin-left: 5px;
  background-color: transparent;
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
            <MintLineButton text="로그인" width="93px" height="30px" />
          </Link>
          <AddStyle>
            <Link to="/signup">
              <MintButton text="회원가입" width="93px" height="30px" />
            </Link>
          </AddStyle>
        </BtnArea>
      </HeaderContainer>
    </Box>
  );
};
