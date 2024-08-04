import dayjs from "dayjs";

export function formatDate(date: Date | number | string) {
  return dayjs(date).format("MMMM D, YYYY");
}
