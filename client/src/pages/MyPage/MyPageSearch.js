// import styled from "styled-components";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useState } from "react";

// const Container = styled.div`
//   display: flex;
//   width: 1000px;
//   margin-top: 100px;
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
// const MyPageSearch = () => {
//   const [data, setData] = useState("");
//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState("");

//   let filtered = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

//   const onInput = (e) => {
//     setSearch({ [e.target.id]: e.target.value });
//   };

//   const onFocus = (e) => {
//     console.log(e);
//   };

//   const onBlur = (e) => {
//     console.log(e);
//   };

//   const onClickItem = (item) =>
//     setData({
//       search: "",
//       color: item,
//     });
//   // 검색구현하기
//   return (
//     <Container>
//       <SearchBox>
//         <AiOutlineSearch color="#63aeae" size="20" />
//         <Input
//           id="search"
//           type="search"
//           value={search}
//           placeholder="지역을 입력해주세요."
//           onChange={onInput}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           autoComplete="off"
//         />
//         {search.length > 1 && filtered.length > 0 && (
//           <ul className="list">
//             {filtered.map((item, idx) => (
//               // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
//               <li key={idx} onClick={() => onClickItem(item)}>
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         )}
//         {color && (
//           <p className="result">
//             <b>Color:</b>
//             {color.name}
//             <span className="box" style={{ backgroundColor: color.hexString }} />
//             {color.hexString}
//           </p>
//         )}
//       </SearchBox>
//     </Container>
//   );
// };

// export default MyPageSearch;
