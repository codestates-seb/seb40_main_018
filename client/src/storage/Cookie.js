import { Cookies } from "react-cookie";

const cookies = new Cookies();

// Refresh Token을 Cookie에 저장하기 위한 함수
export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

// Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
export const getCookieToken = () => {
  return cookies.get("refresh_token");
};

// Cookie 삭제를 위한 함수. 로그아웃 시 사용할 예정이다.
export const removeCookieToken = () => {
  return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
};
