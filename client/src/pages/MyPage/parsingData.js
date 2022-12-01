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

const parsingData = (data) => {
  console.log("data", data);
  const cityObj = {};

  data.forEach((i) => {
    const cityName = i.selected;
    console.log("cityName", cityName);
    if (!cityObj[cityName]) {
      cityObj[cityName] = { posts: [], color: "" };
      cityObj[cityName].posts.push(i);
    } else if (cityObj[cityName]) {
      cityObj[cityName].posts.push(i);
    }
  });

  const notInData = cityArr.filter((i) => !Object.keys(cityObj).includes(i));

  notInData.forEach((i) => (cityObj[i] = { posts: [], color: "" }));

  Object.keys(cityObj).forEach((i) => {
    if (cityObj[i].posts.length === 0) {
      cityObj[i].color = "#ccc";
    } else if (cityObj[i].posts.length === 1) {
      cityObj[i].color = "#D8F3DC";
    } else if (cityObj[i].posts.length === 2) {
      cityObj[i].color = "#B7E4C7";
    } else if (cityObj[i].posts.length === 3) {
      cityObj[i].color = "#95D5B2";
    } else if (cityObj[i].posts.length === 4) {
      cityObj[i].color = "#74C69D";
    } else if (cityObj[i].posts.length === 5) {
      cityObj[i].color = "#52B788";
    } else if (cityObj[i].posts.length === 6) {
      cityObj[i].color = "#40916C";
    } else if (cityObj[i].posts.length === 7) {
      cityObj[i].color = "#2D6A4F";
    } else if (cityObj[i].posts.length === 8) {
      cityObj[i].color = "#1B4332";
    } else if (cityObj[i].posts.length === 9) {
      cityObj[i].color = "#081C15";
    } else {
      cityObj[i].color = "#000";
    }
  });
  console.log("cityObj", cityObj);
  return cityObj;
};

export default parsingData;
