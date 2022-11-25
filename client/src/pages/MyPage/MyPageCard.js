import styled from "styled-components";

const CardContainer = styled.div`
  /* height: 1000px; */
  width: 1000px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 47px;
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

const MyPageCard = ({ cardList, obsRef, load }) => {
  return (
    <CardContainer>
      {cardList && (
        <>
          {cardList.map((item, index) => (
            <CardArea key={index}>
              <CardImg src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg" alt="이미지" />
              <TextArea>
                <City>{item.city}</City>
                <DateInfo>
                  {item.year}.{item.month}.{item.day}
                </DateInfo>
              </TextArea>
            </CardArea>
          ))}
        </>
      )}
      <div ref={obsRef} />

      {load ? <div>로딩 중</div> : <></>}
    </CardContainer>
  );
};

export default MyPageCard;
{
  /* <>
  <div className="wrap min-h-[100vh]">
    {cardList && (
      <>
        {cardList.map((li) => (
          <img
            key={li.id}
            className="opacity-100 mx-auto mb-6"
            src={li.url}
            alt={li.dke}
            width={"500px"}
            height={"300px"}
          />
        ))}
      </>
    )}


    {load ? <div className="py-3 bg-blue-500 text-center">로딩 중</div> : <></>}
    <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">
      옵저버 Element
    </div>
  </div>
</>; */
}

{
  /* <>
        <ul className="postList">
          {
            cardList &&
            <>
            {
              cardList.map((post, idx) =>
                <li key={idx}>post.title<li/>
              )
            }
            </>            
          }
          {
            load ?
            <li className="spinner">
				로딩 스피너
            </li>
            :
            <></>
          }
          <li className='' ref={obsRef}>
          	옵저버
          </li>
    </> */
}
