import { Cookies } from "react-cookie";
import { refreshToken } from "./refreshToken";

const useFetch = (method, url, fetchData) => {
  const cookies = new Cookies();

  const getCookie = (name) => {
    return cookies.get(name);
  };

  // 기본 옵션
  const defaultOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      //   "ngrok-skip-browser-warning": "skip",
      Authorization: `Bearer ${getCookie("myToken")}`,
      // Authorization: `Bearer ${getCookie(
      //   "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZXVuc2VvNjg3OEBnbWFpbC5jb20iLCJzdWIiOiI4IiwiaWF0IjoxNjY5ODcyMDA4LCJleHAiOjE2Njk4NzM4MDh9.6WD1XoVbdbDei819Hk1ndCvN7s2QV9PZqXh6dfXoUSOFkn0eRNatquYKHHM7YlsT",
      // )}`,
    },
    body: JSON.stringify(fetchData),
  };

  return fetch(url, defaultOptions).then(async (res) => {
    if (!res.ok) {
      return res.status;
      // throw Error('에러발생');

      // 토큰이 있는 경우 (로그인)
    } else if (res.headers.get("authorization")) {
      // 쿠키에 Refresh Token, store에 Access Token 저장
      refreshToken(res.json.refresh_token);
      // dispatch(SET_TOKEN(res.json.access_token));
      return res;
    }

    return res.json();
  });
};

export default useFetch;
