// import { Cookies } from "react-cookie";
// axios.defaults.withCredentials = true;
// const dispatch = useDispatch();
// const isLogin = useSelector((state) => state.userReducer.isLogin);
// const cookies = new Cookies();

// const getCookie = (name) => {
//   return cookies.get(name);
// };

// const removeCookieToken = () => {
//   return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
// };

// 내 정보 가져오기
// const userLoad = async () => {
//   // 본인 회원 정보 조회 api가 따로 있음
//   const myInfo = await useFetch("GET", "http://localhost:3000/users");
//   dispatch(getmyInfo(myInfo));
//   console.log("myInfo res", myInfo);
// };

// useEffect(() => {
//   if (isLogin) {
//     userLoad();
//   }

// token을 동적으로 저장해서 로그인 keep
//  dispatch(SET_TOKEN(response.json.access_token));
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxhc3RAZmlyc3QuY29tIiwiaWF0IjoxNjY5MTE3Mjc1LCJleHAiOjE2NjkxMjA4NzUsInN1YiI6IjgifQ.UaeT0Y_g915WhFN-gTYRI_-_KhmO-k9sxigyy4PD5ZA";
// 원래 token 자리
//   if (userLoad) {
//     try {
//       const { exp } = jwt_decode("token");
//       console.log("exp", exp);
//       console.log("Date", Date.now() >= exp * 1000);
//       // 토큰 만료
//       if (Date.now() >= exp * 1000) {
//         // localStorage.removeItem("accessToken");
//         removeCookieToken();
//         dispatch(getLoginStatus({ isLogin: false }));
//         window.reload();

//         // 토큰 만료 전 로그인 연장 필요
//       } else if (Date.now() >= exp * 1000 - 100000) {
//         dispatch(getLoginStatus({ isLogin: true }));
//         refreshToken();
//         // 토큰 유효
//       } else {
//         dispatch(getLoginStatus({ isLogin: true }));
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }, [isLogin]);
