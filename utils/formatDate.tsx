export default function formatDate(date: string) {
  const newDate = new Date(date);
  const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  const format = `${kr_curr.toDateString()} ${kr_curr.toTimeString().split(" ")[1]}`;

  return format;
}
