import { Link } from "react-router-dom";
import { Box, HeaderContainer } from "./LoginHeader";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../images/DanimLogo.svg";

export const BtnArea = styled.div`
  display: flex;
  text-align: center;
  padding-right: 12px;
  border: 1px solid blue;
`;

export const AddStyle = styled.div`
  margin-left: 5px;
`;

export const Logo2 = styled(Logo)`
  width: 120px;
  height: 120px;
  margin-left: -15px;
  margin-top: -45px;
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
