import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  /* height: 1000px; */
  width: 1000px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 47px;
  margin-left: 20px;
`;

const CardArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 45px 38px 0;
  width: 155px;
  height: 155px;
  border-radius: 35px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 35px;
  filter: blur(2px) brightness(0.9);
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 36px;
`;

const City = styled.div`
  font-size: 20px;
  color: #fbfbfb;
  font-weight: bold;
  text-shadow: 2px 2px 4px gray;
`;
const DateInfo = styled.div`
  font-size: 16px;
  color: #fbfbfb;
  text-shadow: 2px 2px 4px gray;
`;

/* 링크연결 - 각 다이어리 상세페이지로 */
// 확인용

const MyPageCard = ({ cardList, hasMore, fetchDiaryList, page2 }) => {
  // yerin
  // 스크롤 시에 데이터를 추가적으로 받아오는 함수
  // const fetchMoreData = () => {
  //   if (cardList.length >= 50) {
  //     setHasMore(!hasMore);
  //     return;
  //   }
  // a fake async api call like which sends
  // 20 more records in .5 secs
  // 가장 유력한 수정 후보
  //   setTimeout(() => {
  //     // setItems(items.concat(Array.from({ length: 10 })));
  //     setCardList(cardList.concat(result.slice(0, 10))); // 10개씩 커팅하기로 결정 -> 10개씩 slice
  //     setResult(result.slice(10)); // 호출하여 10개씩 커팅할때마다 원본 데이터인 result 또한 10개씩 줄여줌

  //     // setDiaryList(diaryList.concat(diaryList.slice(0, 10)));
  //   }, 1500);
  // };
  return (
    <>
      <InfiniteScroll
        dataLength={cardList.length}
        next={() => fetchDiaryList(page2)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* 리스트 */}
        <CardContainer>
          {cardList && (
            <>
              {cardList.map((item, index) => (
                <>
                  <Link to={`/detail/${item.diaryId}`}>
                    <CardArea key={index}>
                      <CardImg
                        src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg"
                        alt="이미지"
                      />
                      <TextArea>
                        <City>{item.city}</City>
                        <DateInfo>
                          {item.year}.{item.month}.{item.day}
                        </DateInfo>
                      </TextArea>
                    </CardArea>
                  </Link>
                </>
              ))}
            </>
          )}
        </CardContainer>
      </InfiniteScroll>
    </>
  );
};

export default MyPageCard;
