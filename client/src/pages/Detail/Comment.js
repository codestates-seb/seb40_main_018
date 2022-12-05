import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export const Block = styled.div`
  /* flex-direction: row;
  @media screen and (max-width: 900px) {
    margin: 30px;
  } */
`;

// dot icon
//import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Stack, Button, Divider, Paper } from "@mui/material";

import { Box } from "@mui/system";

// markdown, toast editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import { Item } from "../../components/Comment/CommentTool";
import Markdown from "../../components/Comment/Markdown";
import axios from "axios";
import SkeletonComment from "../../components/Skeleton/SkeletonComment";
import { useNavigate, useParams } from "react-router-dom";

const Comment = () => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const date = new Date(); // 작성 시간

  const [openEditor, setOpenEditor] = useState("");
  const id = useParams().id;

  const [user, setUser] = useState("");

  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}reply/` + id).then((result) => {
      const timer = setTimeout(() => {
        setComment(result.data.data);
        setUser(result.data.data.nickname); //pass
        console.log("user", user);
        console.log("get", result.data.data);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    });
  }, []);

  //  댓글 작성 버튼을 눌렀을 때 로그인하지 않은 사용자는 로그인페이지로 이동

  const onSubmit = async (e) => {
    e.preventDefault();

    // 마크다운 변환(4줄)
    // 값 가져오기
    const editorInstance = editorRef.current.getInstance();
    // 마크다운 텍스트를 추출해주는 내장 메서드 getMarkdown() 이용
    const getContent = editorInstance.getMarkdown();
    setDisplay(!display);

    setComment([
      ...comment,
      {
        replyContent: getContent,
        replyId: id,
        memberId: memberId,
        nickname: user,
        createdAt: `${date}`,
        modifiedAt: `${date}`,
        responseTo: "root",
        exist: true,
      },
    ]);

    const accessToken = localStorage.getItem("accessToken");

    const addComment = {
      replyContent: getContent,
      replyId: id,
      memberId: memberId,
      nickname: user,
      createdAt: `${date}`,
      modifiedAt: `${date}`,
      responseTo: "root",
      exist: true,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}reply/` + id, addComment, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => console.log("post", res.data))
      .catch((err) => {
        console.log(err);
      });

    await axios.get(`${process.env.REACT_APP_API_URL}reply/` + id).then((result) => {
      setComment(result.data.data);
    });
  };

  // Edit comment
  const onEdit = async ({ replyId }) => {
    // pass
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();

    // if (comment.find((item) => item.replyId === replyId)) {
    //   setComment(comment.map((item) => (item.replyId === replyId ? (item.replyContent = getContent) : item)));
    // }

    setComment([
      {
        replyContent: getContent,
        replyId: id,
        memberId: memberId,
        nickname: user,
        createdAt: `${date}`,
        modifiedAt: `${date}`,
        responseTo: "root",
        exist: false,
      },
    ]);

    // ==================

    const editComment = {
      replyContent: getContent,
      replyId: id,
      memberId: memberId,
      nickname: user,
      createdAt: `${date}`,
      modifiedAt: `${date}`,
      responseTo: "root",
      exist: false,
    };
    // ui는 잘 됨,
    await axios
      .patch(`${process.env.REACT_APP_API_URL}reply/` + replyId, editComment)
      .then(() => {
        setComment(comment);
      })
      .catch((err) => console.log(err));

    // pass
    await axios.get(`${process.env.REACT_APP_API_URL}reply/` + id).then((result) => {
      setComment(result.data.data);
    });
  };

  // Remove comment
  const onRemove = async ({ replyId }) => {
    // if (comment.find((item) => item.replyId === replyId)) {
    //   console.log("replyId", replyId);
    //   setComment(
    //     comment.filter((item) => {
    //       console.log("replyId", replyId);
    //       item.replyId !== replyId;
    //     }),
    //   );
    // }
    // comment.find((item) => item.replyId === replyId);
    // 통신 삭제 잘 됨
    await axios
      .delete(`${process.env.REACT_APP_API_URL}reply/` + replyId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    await axios.get(`${process.env.REACT_APP_API_URL}reply/` + id).then((result) => {
      setComment(result.data.data);
    });
  };

  // useEffect(() => {
  //   localStorage.setItem("reply", JSON.stringify(comments));
  //   setLocal(comments.filter((comment) => comment.responseTo === "root"));
  //   // console.log(local);
  // }, [comments]);

  // createdAt: `${date}`,
  // modifiedAt: `${date}`,
  // replyContent: getContent,
  // replyId: "123123",
  // responseTo: "root",
  // exist: true,
  // if (question.createAt) {
  //   var date = `${question.createAt.slice(0, 10)} ${question.createAt.slice(
  //     11,
  //     19
  //   )}`;
  // }

  // if (comment.createAt) {
  //   let date2 = `${comment.createAt.slice(0, 3)} ${comment.createAt.slice(3)}`;
  //   return date2;
  // }

  const accessToken = localStorage.getItem("accessToken");

  //  사용자 닉네임 나밖에 못 가져옴
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}member/me`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log("userNickname", res.data.data);
        setMemberId(res.data.data.memberId);
      });
  }, []);

  const navigate = useNavigate();

  const onclickHandler = () => {
    if (memberId) {
      setDisplay(!display);
    } else if (!memberId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  //  댓글 작성 버튼을 눌렀을 때 로그인하지 않은 사용자는 로그인페이지로 이동
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   // 만약에 유저닉네임 === null이면?
  //   if (userNickname === null) {
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }
  //   setDisplay(!display);
  // };

  return (
    <Block>
      {loading && <SkeletonComment />}
      {!loading && (
        <Paper sx={{ mt: 1, mb: 10, width: 690, color: "#535353", bgcolor: "#fbfbfb", boxShadow: 0 }}>
          <Button
            onClick={() => onclickHandler()}
            sx={{
              width: "5.5rem",
              fontSize: 12,
              color: "#fbfbfb",
              bgcolor: "#86c1c1",
              boxShadow: 2,
              borderRadius: 1,
              mt: -10,
              ml: 74,
              mb: 1,
            }}
          >
            댓글 작성
          </Button>
          {display && (
            <>
              <Editor ref={editorRef} />
              <div>
                <Button sx={{ color: "#afafaf" }} onClick={onSubmit}>
                  저장
                </Button>
              </div>
            </>
          )}
          {comment.length > 0 &&
            comment.map((comment, index) => (
              <Box sx={{ mb: 2, p: 2, bgcolor: "#f1f1f1", borderRadius: 3 }} key={index}>
                {/* writer 정보, 작성 시간 */}
                <Stack direction="row" spacing={2}>
                  {/* <ProfileIcon>
              {check_kor.test(comment.writer) ? comment.writer.slice(0, 1) : comment.writer.slice(0, 2)}
            </ProfileIcon> */}
                  {/* writer 데이터 받으면 수정 */}
                  {/* <Item>{comment.replyId}</Item> */}
                  <Item>{comment.nickname}</Item>
                  {/* <Item>Jisoo</Item> */}
                  {/* <Item>{timeForToday({ date })}</Item> */}
                  {/* <Item>{comment.date2}</Item> */}
                  {/* <Item>
                    {`${comment.createAt.slice(0, 3)} ${comment.createAt.slice(3)}`}
                    {/* ${comment.createAt.slice(11, 19)} */}
                  {/* </Item> */}
                </Stack>

                {/* comment 글 내용 */}
                <Box
                  key={index}
                  sx={{ padding: "5px 20px", color: comment.exist || "#535353", fontSize: 12 }}
                  // exist는 초기값으로 true를 가지며, removeComment를 통해 false로 변경된다.
                >
                  <Markdown comment={comment} />
                </Box>
                {/* comment 수정 */}
                {/* writer 데이터 받으면 수정 */}
                {/* {user === comment.writer && ( */}
                {comment.memberId === memberId && (
                  <>
                    {openEditor === comment.replyId && <Editor value={comment.replyContent} ref={editorRef} />}
                    <Button
                      sx={{ color: "#afafaf", fontSize: 12 }}
                      onClick={() => {
                        if (comment.replyId === openEditor) {
                          onEdit(comment);
                          setOpenEditor("");
                        } else {
                          setOpenEditor(comment.replyId);
                        }
                      }}
                    >
                      수정
                    </Button>

                    {/* comment 삭제 */}
                    <Button
                      sx={{ color: "#afafaf", fontSize: 12 }}
                      onClick={() => {
                        onRemove(comment);
                      }}
                    >
                      삭제
                    </Button>
                  </>
                )}
                <Divider variant="middle" />
              </Box>
            ))}
        </Paper>
      )}
    </Block>
  );
};

export default Comment;
