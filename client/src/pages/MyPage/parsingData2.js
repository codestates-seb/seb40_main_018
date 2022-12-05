const cityArr = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "세종특별자치시",
];

const parsingData2 = (data) => {
  // console.log("data", data);

  const notInData = cityArr.filter((i) => !Object.keys(data).includes(i));

  notInData.forEach((i) => (data[i] = { posts: 0, color: "" }));

  Object.keys(data).forEach((i) => {
    if (data[i].posts === 0) {
      data[i].color = "#ccc";
    } else if (data[i].posts === 1) {
      data[i].color = "#D8F3DC";
    } else if (data[i].posts === 2) {
      data[i].color = "#B7E4C7";
    } else if (data[i].posts === 3) {
      data[i].color = "#95D5B2";
    } else if (data[i].posts === 4) {
      data[i].color = "#74C69D";
    } else if (data[i].posts === 5) {
      data[i].color = "#52B788";
    } else if (data[i].posts === 6) {
      data[i].color = "#40916C";
    } else if (data[i].posts === 7) {
      data[i].color = "#2D6A4F";
    } else if (data[i].posts === 8) {
      data[i].color = "#1B4332";
    } else if (data[i].posts === 9) {
      data[i].color = "#081C15";
    } else {
      data[i].color = "#000";
    }
  });
  // console.log("cityObj2", data);
  return data;
};

export default parsingData2;
