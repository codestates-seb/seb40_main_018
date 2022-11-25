import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import LoginHeader from "../../components/Header/LoginHeader";
import MapIcon from "./MapIcon";
import MyPageSearch from "./MyPageSearch";
import MyPageCard from "./MyPageCard";
import { UserEditBox } from "../../components/UserEdit/UserEdit";

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  background-color: #fbfbfb;
  padding-top: 140px;
`;

const MyPage = () => {
  const [cardList, setCardList] = useState([]);

  // 무한스크롤 구현
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const preventRef = useRef(true); //중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.8 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (page !== 1) getPost();
  }, [page]);

  const obsHandler = (entries) => {
    // console.log("entries", entries[0]);
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getPost = useCallback(async () => {
    //글 불러오기

    setLoad(true); //로딩 시작

    // ---- Get Data Code ---
    const res = await axios({ method: "GET", url: `http://localhost:4000/diary` });
    if (res.data) {
      if (res.data.end) {
        //마지막 페이지일 경우
        endRef.current = true;
      }
      setCardList((prev) => [...prev, ...res.data]); //리스트 추가
      preventRef.current = true;
    } else {
      console.log(res); //error
    }

    setLoad(false); //로딩 종료
  }, [page]);

  // 이전 코드
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/diary`)
  //     .then((res) => {
  //       setCardList(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <LoginHeader />
      <MyPageContainer>
        <UserEditBox />
        <MapIcon />
        <MyPageSearch />
        <MyPageCard cardList={cardList} setCardList={setCardList} obsRef={obsRef} load={load} />
      </MyPageContainer>
    </>
  );
};

export default MyPage;
