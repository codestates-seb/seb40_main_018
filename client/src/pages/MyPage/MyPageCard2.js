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

const MyPageCard2 = ({ cardList, options, handleDropDownClick }) => {
  console.log("cardList", cardList);
  return (
    <CardContainer>
      <>
        {options.map((option, index) => (
          <CardArea key={index} onClick={() => handleDropDownClick(option)}>
            <CardImg src="https://cdn.pixabay.com/photo/2022/11/11/13/00/clouds-7584944_960_720.jpg" alt="이미지" />
            <TextArea>
              <City>{option}</City>
            </TextArea>
            <TextArea>
              {cardList && (
                <>
                  {cardList.map((item, index) => (
                    <DateInfo key={index}>
                      {item.year}.{item.month}.{item.day}
                    </DateInfo>
                  ))}
                </>
              )}
            </TextArea>
          </CardArea>
        ))}
      </>
    </CardContainer>
  );
};

export default MyPageCard2;
