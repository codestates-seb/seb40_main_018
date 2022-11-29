import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

export const StyledSummary = styled.div`
  /* display: flex; */
  width: 690px;

  > .stats {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    row-gap: 10px;
    padding-top: 20px;
    padding-left: 30px;

    > .name-time {
      display: flex;
      flex-direction: row;
      column-gap: 15px;
    }
  }
`;

const SkeletonComment = () => {
  return (
    <>
      <StyledSummary>
        <div className="stats">
          {/* <div className="name-time">
            <Skeleton width={"50px"} height={"20px"} />
            <Skeleton width={"50px"} height={"20px"} />
          </div> */}
          <Skeleton width={"100px"} height={"20px"} />
          <Skeleton width={"500px"} height={"20px"} />
          <Skeleton width={"100px"} height={"20px"} />
        </div>
      </StyledSummary>
    </>
  );
};

export default SkeletonComment;
