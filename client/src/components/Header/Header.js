import { Link } from "react-router-dom";
import { Box, HeaderContainer, Logo2 } from "./LoginHeader";
import styled from "styled-components";
import { MintButton2, MintLineButton2 } from "../Modal/CheckList/CheckList";

export const BtnArea = styled.div`
  display: flex;
  text-align: center;
  column-gap: 12px;
`;

export const AddStyle = styled.div``;

function Header() {
  return (
    <Box>
      <HeaderContainer>
        <Link to="/">
          <Logo2 />
        </Link>
        <BtnArea>
          <Link to="/login">
            <MintLineButton2 width="83px" height="30px">
              로그인
            </MintLineButton2>
          </Link>
          <AddStyle>
            <Link to="/signup">
              <MintButton2 width="83px" height="30px">
                회원가입
              </MintButton2>
            </Link>
          </AddStyle>
        </BtnArea>
      </HeaderContainer>
    </Box>
  );
}

export default Header;
