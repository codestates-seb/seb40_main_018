// import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import styled from "styled-components";

const Box = styled.div`
  background-color: white;
  border-radius: 35px;
  height: 194px;
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 12px;
`;

const Wrpper = styled.div`
  background-color: transparent;
  width: 730px;
  display: flex;
  flex-direction: column;
`;

const UserImg = styled.div`
  background-color: white;
  border: 1px solid red;
  border-radius: 100px;
  height: 120px;
  width: 120px;
  margin: 0px 0px 0px 34px;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  /* background-color: transparent; */
  > .userImg {
    background-color: transparent;
    display: flex;
  }
  > .icon {
    cursor: pointer;
    background-color: transparent;
    color: #dadada;
  }
`;

const UserInformation = styled.div`
  width: 564px;
  background-color: white;
  display: flex;
  flex-direction: column;
  > id {
    background-color: white;
    font-size: 14px;
    margin: 26px 9px 0px 24px;
  }
  > information {
    background-color: white;
    font-size: 14px;
    margin: 22px 9px 0px 24px;
  }
  > count {
    background-color: white;
    font-size: 14px;
    margin: 22px 9px 0px 24px;
  }
`;

const Block = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  > button {
    width: 104px;
    height: 30px;
    color: white;
    background-color: #a8a8a8;
    box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 12px;
    font-size: 14px;
    border: none;
    border-radius: 35px;
    margin: 0px 20px 14px 0px;
    &:active {
      background-color: #858585;
    }
  }
`;

export const UserEditBox = () => {
  return (
    <Box>
      <UserImg>
        <div></div>
        <FaRegEdit className="icon" />
      </UserImg>
      <Wrpper>
        <UserInformation>
          <id>youthmn</id>
          <information>
            24살 방혜민/ 프론트엔드 주니어 개발자 취준생24살 방혜민/ 프론트엔드 주니어 개발자 취준생24살 방혜민/
            프론트엔드 주니어 개발자 취준생24살 방혜민/ 프론트엔드 주니어 개발자 취준생
          </information>
          <count>게시글 1</count>
        </UserInformation>

        <Block>
          <button type="button">프로필 편집</button> <button type="button">수정하기</button> <button>취소하기</button>
        </Block>
      </Wrpper>
    </Box>
  );
};
