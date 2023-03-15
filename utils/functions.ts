// YYYY/MM/DD hh:mmでフォーマット
export function dateFormatter(date: Date): string {
  const initDate = new Date(date);
  return `${initDate.getFullYear()}/${initDate.getMonth()}/${initDate.getDate()} ${initDate.getHours()}:${initDate.getMinutes()}`;
}
