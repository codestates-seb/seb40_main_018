import { Link } from "react-router-dom";
import logo from "../../images/DanimLogo.PNG";
import { Box, HeaderContainer } from "./LoginHeader";
import styled from "styled-components";

export const BtnArea = styled.div`
  display: flex;
  text-align: center;
  padding-right: 12px;
`;

const AddStyle = styled.div`
  margin-left: 5px;
`;

export const Header = () => {
  return (
    <Box>
      <HeaderContainer>
        <Link to="/">
          <img className="logo" alt="logo" src={logo} />
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
