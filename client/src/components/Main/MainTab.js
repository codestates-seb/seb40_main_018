import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import PriceFilter from "./PriceFilter";
const MainContainer = styled.div`
  background-color: #fbfbfb;
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 90px;
  flex-flow: wrap;
  @media screen and (max-width: 982px) {
    display: flex;
    row-gap: 12px;
  }
  > .input-search {
    display: flex;
    max-width: 200px;
    height: 100%;
    flex-grow: 1;
    position: relative;
    padding: 6px 6px;
    background-color: #ffffff;
    border: 1px solid #86c1c1;
    border-radius: 35px;
    box-sizing: inherit;
    margin-left: auto;
    margin-right: 20px;
    &:focus-within {
      box-shadow: 0px 0px 1px 1px #5da7a7;
      border: none;
      outline: 0;
    }
    > input {
      font-size: 12px;
      width: 100%;
      height: 30px;
      margin-left: 4px;
      align-items: center;
      border: none;
      :focus {
        outline: none;
      }
    }
  }
  > .sort {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 640px) {
      font-size: 14px;
      flex-direction: column !important;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;
    }
    > .question-sort {
      margin-bottom: 12px;
      border-bottom: solid 3px #c2c2c2;

      > button {
        font-size: 20px;
        border: none;
        padding: 8px 24px;
        color: #535353;
        background-color: #fbfbfb;
        @media screen and (max-width: 640px) {
          height: 36px;
          padding-left: 0.4em;
          padding-right: 0.4em;
          flex-direction: column-reverse;
          font-size: 18px;
        }
        cursor: pointer;
        :hover {
          background-color: #f3f3f3;
        }
        &.is-selected {
          height: 10px;
          background-color: #fbfbfb;
          border-bottom: #40d8d8 solid 15px;
          @media screen and (max-width: 640px) {
            border-top: #40d8d8 solid 15px;
            border-bottom: none;
            font-size: 18px;
            padding-bottom: none;
          }
        }
      }
    }
  }
`;

export const MainTab = ({ selected, setSelected }) => {
  // const tags = diaryList.map((el) => el.tags);
  // console.log("tags", tags);

  const sortClick = (e) => {
    // selected
    switch (e.target.value) {
      case "등록순":
        setSelected("등록순");
        // 실제 diary get 할 때 createdAt 있음
        // setSelected((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "조회순":
        setSelected("조회순");
        // ?
        // setSelected((a, b) => b.views - a.views);
        break;
      case "Like":
        setSelected("Like");
        // 실제 diary get 할 때 likesCount 있음
        // setSelected((a, b) => b.likesCount - a.likesCount);
        break;
      default:
        break;
    }
  };

  return (
    <MainContainer>
      <FilterContainer>
        <div className="sort">
          <div className="question-sort">
            <button onClick={sortClick} className={selected === "등록순" ? "is-selected" : ""} value={"등록순"}>
              등록순
            </button>
            <button onClick={sortClick} className={selected === "조회순" ? "is-selected" : ""} value={"조회순"}>
              조회순
            </button>
            <button onClick={sortClick} className={selected === "Like" ? "is-selected" : ""} value={"Like"}>
              LIKE!
              <FaHeart color="#DF4949" />
            </button>
          </div>
        </div>
        <div className="input-search">
          <AiOutlineSearch size={30} color="#86C1C1" />
          <input type="text" className="logo-search" placeholder="태그를 입력하세요" />
        </div>
        <PriceFilter />
      </FilterContainer>
    </MainContainer>
  );
};
