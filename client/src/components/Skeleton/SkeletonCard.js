import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

export const Box = styled.div`
  height: 100vh;
`;
const List = styled.div`
  padding: 20px;
  display: grid;
  gap: 80px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media screen and (max-width: 1260px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  > .card {
    width: 280px;
  }
`;

const SkeletonCard = () => {
  return (
    <Box>
      <List>
        {Array(4)
          .fill()
          .map((item, index) => (
            <li className="card" key={index}>
              <Skeleton height={180} />
              <h4 className="card-title">
                <Skeleton height={18} width={`40%`} />
              </h4>
              <p className="card-channel">
                <Skeleton width={`90%`} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`60%`} />
              </div>
              <div className="card-metrics">
                <Skeleton width={`90%`} />
              </div>
            </li>
          ))}
      </List>
    </Box>
  );
};

export default SkeletonCard;
