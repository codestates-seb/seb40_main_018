import styled from "styled-components";
import { Card } from "../components/Main/Card";
import { MainTab } from "../components/Main/MainTab";
// import { useParams } from "react-router-dom";

// import { SET_TOKEN } from "../redux/store/Auth";

import { useState, useEffect } from "react";
import axios from "axios";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  background-color: #fbfbfb;
`;

const Container = styled.div``;
export default function MainPage() {
  // const id = useParams().id;
  // const user = useSelector(SET_TOKEN);
  // console.log("user", user.payload.userReducer.isLogin);
  // const accesstoken = useSelector(DELETE_TOKEN);
  // console.log("accesstoken", accesstoken);

  const [selected, setSelected] = useState("등록순");
  const [diaryList, setDiaryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [tag, setTag] = useState("");

  const fetchDiaryList = async (page) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}diary?size=12&page=${page}&tag=${tag}`);

    console.log(res.data);
    const diaries = res.data.data;
    const pagination = res.data.pageInfo;

    if (diaryList.length > 0) {
      const previousDiaries = diaryList;
      const newDiaries = diaries;

      setDiaryList([...previousDiaries, ...newDiaries]);
    } else {
      setDiaryList(diaries);
    }
    setPage(pagination.page + 1);
    setTotalPage(pagination.totalPages);
  };

  useEffect(() => {
    fetchDiaryList(page);
  }, []);

  const [result, setResult] = useState([]);

  return (
    <Main>
      <Container>
        <MainTab selected={selected} setSelected={setSelected} diaryList={diaryList} setTag={setTag} />
        <Card
          selected={selected}
          diaryList={diaryList}
          setDiaryList={setDiaryList}
          hasMore={page <= totalPage}
          // setHasMore={setHasMore}
          result={result}
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
          fetchDiaryList={fetchDiaryList}
          page={page}
        />
      </Container>
    </Main>
  );
}
