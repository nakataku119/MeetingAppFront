// YYYY/MM/DD hh:mmでフォーマット
export default function dateFormatter(date: Date): string {
  const initDate = new Date(date);
  return `${initDate.getFullYear()}/${initDate.getMonth()}/${initDate.getDate()} ${initDate.getHours()}:${initDate.getMinutes()}`;
}
