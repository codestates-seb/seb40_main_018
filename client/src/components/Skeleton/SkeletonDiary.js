import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

export const Box = styled.div`
  width: 1000px;

  .list {
    display: flex;
    flex-direction: row;
    column-gap: 45px;
  }
`;

export const Card = styled.div`
  width: 155px;
  height: 155px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;

  .location {
    display: flex;
    flex-direction: column;
    width: 50px;
  }
  .date {
    display: flex;
    flex-direction: column;
    width: 80px;
  }
`;

const SkeletonDiary = () => {
  return (
    <Box>
      <ul className="list">
        {Array(5)
          .fill()
          .map((item, index) => (
            <Card key={index}>
              <div className="location">
                <Skeleton height={20} />
              </div>
              <div className="date">
                <Skeleton height={20} />
              </div>
            </Card>
          ))}
      </ul>
    </Box>
  );
};

export default SkeletonDiary;
