import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 사용중
export const timeForToday2 = (time) => {
  // console.log("time", time);
  const year = time[0];
  const month = time[1];
  const day = time[2];
  const hour = time[3];
  const minute = time[4];
  const second = time[5];

  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  dayjs.extend(utc);
  dayjs.extend(timezone);
  // 작성일자 시간객체로
  const parsedDate = dayjs(`${year}-${month}-${day} ${hour}:${minute}:${second}`, "YYYY-MM-DD HH:mm:ss").add(
    9,
    "hours",
  );
  return parsedDate.fromNow();
};

// export function timeForToday(time) {
//   console.log("time", time);
//   const now = new Date();
//   console.log("now", now.getTime());
//   const createdAt = new Date(time);
//   console.log("createdAt", createdAt);

//   // 작성 시간-현재 시간 => 지나간 시간

//   const minute = Math.floor((now.getTime() - createdAt.getTime()) / 1000 / 60);
//   if (minute < 1) return "방금전";
//   if (minute < 60) {
//     return `${minute}분전`;
//   }

//   const hour = Math.floor(minute / 60);
//   if (hour < 24) {
//     return `${hour}시간전`;
//   }

//   const day = Math.floor(minute / 60 / 24);
//   if (day < 365) {
//     return `${day}일전`;
//   }

//   return `${Math.floor(day / 365)}년전`;
// }

// style

export const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: "center",
  color: "#40d8d8",
  fontSize: "12px",
  lineHeight: "1rem",
  marginLeft: 20,
}));

export const ProfileIcon = styled(Avatar)(() => ({
  // backgroundColor: "#40d8d8",
  // width: "2rem",
  // height: "2rem",
}));
