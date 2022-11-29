import axios from "axios";
import { useState, useEffect } from "react";
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
  border-radius: 100px;
  height: 120px;
  width: 120px;
  margin: 0px 0px 0px 34px;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background-size: contain;
  background-repeat: none;
  background-color: transparent;
  display: flex;
  > .icon {
    cursor: pointer;
    background-color: transparent;
    height: 120px;
    width: 120px;
  }
`;

const ImgInput = styled.input`
  border: none;
`;

const UserInformation = styled.div`
  width: 564px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const EditImg = styled.img`
  border-radius: 100%;
  transform: translate(50, 50);
  object-fit: cover;
`;

const EditId = styled.input`
  background-color: white;
  font-size: 14px;
  margin: 26px 9px 0px 24px;
  padding: 5px;
  width: 200px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
  &:focus-within {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
  }
`;

const EditInformation = styled.input`
  background-color: white;
  font-size: 14px;
  margin: 22px 9px 0px 24px;
  padding: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid gray;
  &:focus-within {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    outline: none;
  }
`;

const Count = styled.div`
  background-color: white;
  font-size: 14px;
  margin: 22px 9px 0px 24px;
`;

const Id = styled.div`
  background-color: white;
  font-size: 14px;
  margin: 32px 9px 0px 24px;
`;

const Information = styled.div`
  background-color: white;
  font-size: 14px;
  margin: 22px 9px 0px 24px;
`;

const Block = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
`;

const SubmitBtn = styled.button`
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
`;

export const UserEditBox = () => {
  //상태를 만들어서 해주는거 어떨까요?
  const defaultImg = "https://cdn-icons-png.flaticon.com/512/666/666201.png";

  // const [userProfile, setUserProfile] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [userIntro, setUserIntro] = useState("");
  // const [diaryCount, setDiaryCount] = useState("1");
  const [isEdit, setIsEdit] = useState(false);
  const [img, setImg] = useState(defaultImg);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const userNameHandler = (e) => {
    setUserNickname(e.target.value);
  };

  const useInfoHandler = (e) => {
    setUserIntro(e.target.value);
  };

  const submitHandler = () => {
    setIsEdit(!isEdit);
    const editUserProfile = {
      userNickname: userNickname,
      userIntro: userIntro,
    };
    axios.patch("http://localhost:4000/userProfile/1", editUserProfile).then((res) => console.log(res.data));
  };

  const cancelHandler = () => {
    setIsEdit(!isEdit);
    window.location.reload();
  };

  const onChangeFile = (e) => {
    // console.log(e.target.files[0]);

    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setImg(resultImage);
    };
  };

  useEffect(() => {
    axios.get("http://localhost:4000/userProfile/1").then((res) => {
      console.log(res.data);
      // setUserProfile(res.data);
      setUserNickname(res.data.userNickname);
      setUserIntro(res.data.userIntro);
    });
  }, []);

  return (
    <Box>
      {isEdit ? (
        // 편집할때 나와야할 내용
        <>
          <UserImg>
            <EditImg className="icon" src={img} alt="img" />
            <ImgInput
              type="file"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => onChangeFile(e)}
            />
            <label htmlFor="file">
              <FaRegEdit className="icon"></FaRegEdit>{" "}
            </label>
          </UserImg>
          <Wrpper>
            <UserInformation>
              <EditId onChange={userNameHandler} value={userNickname} />
              <EditInformation onChange={useInfoHandler} value={userIntro} />
              <Count></Count>
            </UserInformation>
            <Block>
              <>
                <SubmitBtn type="button" onClick={submitHandler}>
                  저장하기
                </SubmitBtn>{" "}
                <SubmitBtn type="button" onClick={cancelHandler}>
                  취소하기
                </SubmitBtn>
              </>
            </Block>
          </Wrpper>
        </>
      ) : (
        <>
          {/* 편집 완료됬을때 나올 화면 */}
          <UserImg>
            <EditImg className="icon" src={img} alt="img" />
          </UserImg>
          <Wrpper>
            <UserInformation>
              <Id> {userNickname}</Id>
              <Information> {userIntro}</Information>
              <Count>게시글 1</Count>
            </UserInformation>
            <Block>
              <SubmitBtn type="button" onClick={editHandler}>
                프로필 편집
              </SubmitBtn>
            </Block>
          </Wrpper>
        </>
      )}
    </Box>
  );
};
