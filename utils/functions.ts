import { Mtg, User } from "@/utils/types";

// 日時を2桁にする
function twoDigitFormatter(datetime: number): string {
  return ("0" + String(datetime)).slice(-2);
}
// YYYY/MM/DD hh:mmでフォーマット
export function startTimeFormatter(date: Date): string {
  const initDate = new Date(date);
  return `${initDate.getFullYear()}/${twoDigitFormatter(
    initDate.getMonth() + 1
  )}/${twoDigitFormatter(initDate.getDate())} ${twoDigitFormatter(
    initDate.getHours()
  )}:${twoDigitFormatter(initDate.getMinutes())}`;
}
// hh:mmでフォーマット
export function endTimeFormatter(date: Date): string {
  const initDate = new Date(date);
  return `${twoDigitFormatter(initDate.getHours())}:${twoDigitFormatter(
    initDate.getMinutes()
  )}`;
}
// 未来時間のミーティングを取得
export function getPlanedMeetings(mtgs: Mtg[]): Mtg[] {
  const nowTime = new Date();
  const planedMeetings: Mtg[] = mtgs.filter(
    (mtg) => new Date(mtg.startTime) >= nowTime
  );
  return planedMeetings;
}
// 過去時間のミーティングを取得
export function getPastMeetings(mtgs: Mtg[]): Mtg[] {
  const nowTime = new Date();
  const pastMeetings: Mtg[] = mtgs.filter(
    (mtg) => new Date(mtg.endTime) < nowTime
  );
  return pastMeetings;
}
// チームメンバーとの直近の予定のミーティングを取得
export function getNextMeetingSchedule(
  currentUser: User,
  teamMember: User
): string {
  const meetingsWithMember = currentUser.mtgs!.filter((mtg) => {
    const joinedMembersId = mtg.users.map((user) => user.id);
    return joinedMembersId.includes(teamMember.id);
  });
  const planedMeetingsWithMember = getPlanedMeetings(meetingsWithMember);
  if (planedMeetingsWithMember.length > 0) {
    const nextMeeting = planedMeetingsWithMember.reduce(
      (prev: Mtg, current: Mtg) => {
        return current.startTime < prev.startTime ? current : prev;
      }
    );
    return startTimeFormatter(nextMeeting.startTime);
  }
  return "-----";
}
// チームメンバーとの過去直近のミーティングを取得
export function getLastMeetingSchedule(
  currentUser: User,
  teamMember: User
): string {
  const meetingsWithMember = currentUser.mtgs!.filter((mtg) => {
    const joinedMembersId = mtg.users.map((user) => user.id);
    return joinedMembersId.includes(teamMember.id);
  });
  const pastMeetingsWithMember = getPastMeetings(meetingsWithMember);
  if (pastMeetingsWithMember.length > 0) {
    const lastMeeting = pastMeetingsWithMember.reduce(
      (prev: Mtg, current: Mtg) => {
        return current.startTime < prev.startTime ? current : prev;
      }
    );
    return startTimeFormatter(lastMeeting.startTime);
  }
  return "-----";
}
