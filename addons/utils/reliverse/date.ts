import dayjs from "dayjs";

export function formatDate(date: Date | number | string) {
  return dayjs(date).format("MMMM D, YYYY");
}

// export function getHumanDate(createdAt: null | string) {
//   const date = new Date(createdAt || "");

//   return date.toLocaleString();
// }
