export default function formatDate(date: string) {
  const newDate = new Date(date);
  const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  console.log(kr_curr.toLocaleString());
  console.log(kr_curr.toTimeString());
  console.log(kr_curr.toTimeString().split(" ")[0]);
  const format = `${kr_curr.toLocaleString()} ${kr_curr.toTimeString().split(" ")[0]}`;

  return format;
}
