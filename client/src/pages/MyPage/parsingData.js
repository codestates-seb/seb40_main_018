const cityArr = [
  "서울특별시",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주특별자치도",
  "세종특별자치시",
];

const parsingData = (data) => {
  const cityObj = {};

  data.forEach((i) => {
    const cityName = i.cateCity;
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
      cityObj[i].color = "#3FE630";
    } else if (cityObj[i].posts.length > 1 && cityObj[i].posts.length <= 4) {
      cityObj[i].color = "#35BF28";
    } else if (cityObj[i].posts.length > 4 && cityObj[i].posts.length < 9) {
      cityObj[i].color = "#23801B";
    } else {
      cityObj[i].color = "#12400D";
    }
  });

  return cityObj;
};

export default parsingData;
