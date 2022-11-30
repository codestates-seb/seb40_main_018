// import styled from "styled-components";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useState } from "react";

// const Container = styled.div`
//   display: flex;
//   width: 1000px;
//   margin-top: 100px;
//   flex-direction: column;
// `;

// const SearchBox = styled.div`
//   width: 366px;
//   height: auto;
//   padding: 10px 20px;
//   border-radius: 35px;
//   box-shadow: 0 0 5px 2px #63aeae;
//   margin: 18px 0;
//   display: flex;
//   align-items: center;
//   background-color: #ffffff;
// `;

// const Input = styled.input`
//   width: 100%;
//   margin-left: 5px;
//   border: none;
//   outline: none;
//   font-size: 14px;
// `;

// //  cardList
// const MyPageSearch2 = ({ cardList }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [filtered, setFiltered] = useState("");

//   return (
//     <Container>
//       <SearchBox>
//         <AiOutlineSearch color="#63aeae" size="20" />
//         <Input
//           id="search"
//           type="text"
//           placeholder="지역을 입력해주세요."
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//       </SearchBox>
//       <div className="container">
//         {cardList
//           .filter((item) => item.toLocaleLowerCase().includes(filtered.toLocaleLowerCase()))
//           .map(({ city, year, month, day }, index) => (
//             <div className="animal-group" key={index}>
//               <h3>{city}</h3>
//               <h3>{year}</h3>
//               <h3>{month}</h3>
//               <h3>{day}</h3>
//             </div>
//           ))}
//       </div>

//       {/* 자동완성,결과 값 */}
//     </Container>
//   );
// };

// export default MyPageSearch2;
