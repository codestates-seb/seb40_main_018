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
  /* overflow: hidden; */
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
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
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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

const MyPageCard = ({ cardList, hasMore, fetchDiaryList, page2 }) => {
  return (
    <>
      <InfiniteScroll
        dataLength={cardList.length}
        next={() => fetchDiaryList(page2)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
            <b>마지막 페이지입니다 : )</b>
          </p>
        }
      >
        {/* 리스트 */}
        <CardContainer>
          {cardList && (
            <>
              {cardList.map((item, index) => (
                <div key={index}>
                  <Link to={`/detail/${item.diaryId}`}>
                    <CardArea>
                      <CardImg src={item.imageUrl} alt="이미지" />
                      <TextArea>
                        <City>{item.city}</City>
                        <DateInfo>
                          {item.year}.{item.month}.{item.day}
                        </DateInfo>
                      </TextArea>
                    </CardArea>
                  </Link>
                </div>
              ))}
            </>
          )}
        </CardContainer>
      </InfiniteScroll>
    </>
  );
};

export default MyPageCard;
