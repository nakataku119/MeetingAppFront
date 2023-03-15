import { Mtg, User } from "@/utils/types";
import { Place } from "@mui/icons-material";

// YYYY/MM/DD hh:mmでフォーマット
export function dateFormatter(date: Date): string {
  const initDate = new Date(date);
  return `${initDate.getFullYear()}/${initDate.getMonth()}/${initDate.getDate()} ${initDate.getHours()}:${initDate.getMinutes()}`;
}
// 未来時間のミーティングを取得
export function getPlanedMeetings(mtgs: Mtg[]): Mtg[] {
  const nowTime = new Date();
  const planedMeetings: Mtg[] = mtgs.filter(
    (mtg) => new Date(mtg.schedule) >= nowTime
  );
  return planedMeetings;
}
// 過去時間のミーティングを取得
export function getPastMeetings(mtgs: Mtg[]): Mtg[] {
  const nowTime = new Date();
  const pastMeetings: Mtg[] = mtgs.filter(
    (mtg) => new Date(mtg.schedule) < nowTime
  );
  return pastMeetings;
}
// チームメンバーとの直近の予定のミーティングを取得
export function getNextMeetingSchedule(
  currentUser: User,
  teamMember: User
): string {
  const meetingsWithMember = currentUser.mtgs.filter((mtg) => {
    const joinedMembersId = mtg.users.map((user) => user.id);
    return joinedMembersId.includes(teamMember.id);
  });
  const planedMeetingsWithMember = getPlanedMeetings(meetingsWithMember);
  if (planedMeetingsWithMember.length > 0) {
    const nextMeeting = planedMeetingsWithMember.reduce(
      (prev: Mtg, current: Mtg) => {
        return current.schedule < prev.schedule ? current : prev;
      }
    );
    return dateFormatter(nextMeeting.schedule);
  }
  return "-----";
}
// チームメンバーとの過去直近のミーティングを取得
export function getLastMeetingSchedule(
  currentUser: User,
  teamMember: User
): string {
  const meetingsWithMember = currentUser.mtgs.filter((mtg) => {
    const joinedMembersId = mtg.users.map((user) => user.id);
    return joinedMembersId.includes(teamMember.id);
  });
  const pastMeetingsWithMember = getPastMeetings(meetingsWithMember);
  if (pastMeetingsWithMember.length > 0) {
    const lastMeeting = pastMeetingsWithMember.reduce(
      (prev: Mtg, current: Mtg) => {
        return current.schedule < prev.schedule ? current : prev;
      }
    );
    return dateFormatter(lastMeeting.schedule);
  }
  return "-----";
}
