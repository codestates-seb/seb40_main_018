import { useState, useRef, useEffect } from "react";

// dot icon
//import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Stack, Button, Divider, Paper } from "@mui/material";

import { Box } from "@mui/system";

// markdown, toast editor
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import { timeForToday, Item } from "../../components/Comment/CommentTool";
import Markdown from "../../components/Comment/Markdown";
import axios from "axios";

const Comment = ({ user }) => {
  const [comment, setComment] = useState([]);
  // console.log(comment);

  const [display, setDisplay] = useState(false);
  const editorRef = useRef();
  const date = new Date(); // 작성 시간

  const [openEditor, setOpenEditor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/comments").then((result) => {
      setComment(result.data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // 마크다운 변환(4줄)
    // 값 가져오기
    const editorInstance = editorRef.current.getInstance();
    // 마크다운 텍스트를 추출해주는 내장 메서드 getMarkdown() 이용
    const getContent = editorInstance.getMarkdown();
    setDisplay(!display);

    // 데이터 저장
    // const data = {
    //   content: getContent,
    //   writer: user,
    //   postId: "123123",
    //   responseTo: "root",
    //   commentId: uuid(),
    //   created_at: `${date}`,
    //   exist: true,
    // };
    // dispatch(addComment(data));
    setComment([
      ...comment,
      {
        content: getContent,
        writer: user,
        postId: "123123",
        created_at: `${date}`,
        responseTo: "root",
        exist: true,
      },
    ]);

    const addComment = {
      content: getContent,
      writer: user,
      postId: "123123",
      created_at: `${date}`,
      responseTo: "root",
      exist: true,
    };
    axios
      .post("http://localhost:4000/comments", addComment)
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));
  };

  // Edit comment
  const onEdit = ({ id, commentId }) => {
    const editorInstance = editorRef.current.getInstance();
    const getContent = editorInstance.getMarkdown();

    if (comment.find((item) => item.commentId === commentId)) {
      setComment(comment.map((item) => (item.id === id ? (item.content = getContent) : item)));
    }

    console.log("comment", comment);

    setComment([
      ...comment,
      {
        content: getContent,
        writer: user,
        postId: "123123",
        created_at: `${date}`,
        responseTo: "root",
        exist: true,
      },
    ]);
    console.log("comment2", comment);

    const editComment = {
      content: getContent,
      writer: user,
      postId: "123123",
      created_at: `${date}`,
      responseTo: "root",
      exist: true,
    };
    axios
      .patch(`http://localhost:4000/comments/` + id, editComment)
      .then(() => setComment(comment))
      .then((err) => console.log(err));
  };

  // Remove comment
  const onRemove = ({ id, commentId }) => {
    // console.log("removeCId", commentId);
    if (comment.find((item) => item.commentId === commentId)) {
      setComment(comment.filter((item) => item.id !== id));
    }
    axios
      .delete(`http://localhost:4000/comments/` + id)
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };

  // useEffect(() => {
  //   localStorage.setItem("reply", JSON.stringify(comments));
  //   setLocal(comments.filter((comment) => comment.responseTo === "root"));
  //   // console.log(local);
  // }, [comments]);

  return (
    <Paper sx={{ mt: 1, mb: 10, width: 690, color: "#535353", bgcolor: "#fbfbfb", boxShadow: 0 }}>
      <Button
        onClick={() => {
          setDisplay(!display);
        }}
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

      {comment.map((comment, index) => (
        <Box sx={{ mb: 2, p: 2, bgcolor: "#f1f1f1", borderRadius: 3 }} key={comment.id}>
          {/* writer 정보, 작성 시간 */}
          <Stack direction="row" spacing={2}>
            {/* <ProfileIcon>
              {check_kor.test(comment.writer) ? comment.writer.slice(0, 1) : comment.writer.slice(0, 2)}
            </ProfileIcon> */}
            <Item>{comment.writer}</Item>

            <Item>{timeForToday(comment.created_at)}</Item>
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
          {comment.exist && user === comment.writer && (
            <>
              {openEditor === comment.id && <Editor initialValue={comment.content} ref={editorRef} />}
              <Button
                sx={{ color: "#afafaf", fontSize: 12 }}
                onClick={() => {
                  if (comment.id === openEditor) {
                    onEdit(comment);
                    setOpenEditor("");
                  } else {
                    setOpenEditor(comment.id);
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
  );
};

export default Comment;
