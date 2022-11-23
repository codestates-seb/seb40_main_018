import { Cookies } from "react-cookie";

export const refreshToken = async (refreshToken) => {
  const cookies = new Cookies();

  const getCookie = (name) => {
    return cookies.get(name);
  };

  const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
  };

  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   "ngrok-skip-browser-warning": "skip",
      Authorization: `Bearer ${getCookie("myToken")}`,
      Refresh: setCookie("myToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: new Date(expireDate),
      }),
    },
  };
  const res = await fetch("/token", options);
  console.log(res);
  console.log("토큰 재발급 완료");
  // cookies.set("accessToken", res.headers.get("authorization"));
  // cookies.set("refreshToken", res.headers.get("refresh"));
};
