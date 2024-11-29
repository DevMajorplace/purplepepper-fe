export default function formatDate(date: string) {
  const newDate = new Date(date);
  const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  console.log("toLocaleDateString ", kr_curr.toLocaleDateString());
  console.log("toLocaleTimeString ", kr_curr.toLocaleTimeString());
  console.log("toString ", kr_curr.toString());
  console.log("toTimeString ", kr_curr.toTimeString());
  console.log("toLocaleString ", kr_curr.toLocaleString());
  //console.log("toLocaleDateString ", kr_curr.toTimeString().split(" ")[0]);
  const format = `${kr_curr.toLocaleString()} ${kr_curr.toTimeString().split(" ")[0]}`;

  return format;
}
