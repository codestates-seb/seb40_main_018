import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

export const StyledSummary = styled.div`
  display: flex;
  width: 900px;
  > .image {
    padding: 0 30px 0 30px;
  }

  > .stats {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    row-gap: 10px;
  }
`;

export const User = styled.div`
  margin: -10px 0 0 720px;
`;

const SkeletonUser = () => {
  return (
    <>
      <StyledSummary>
        <div className="image">
          <Skeleton circle={true} height={120} width={120} />
        </div>
        <div className="stats">
          <Skeleton width={"500px"} height={"20px"} />
          <Skeleton width={"500px"} height={"20px"} />
          <Skeleton width={"500px"} height={"20px"} />
        </div>
      </StyledSummary>
      <User>
        <Skeleton width={"100px"} />
      </User>
    </>
  );
};

export default SkeletonUser;
