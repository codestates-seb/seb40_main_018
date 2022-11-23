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
