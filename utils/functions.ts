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
    (mtg) => new Date(mtg.schedule) > nowTime
  );
  return planedMeetings;
}
// チームメンバーとの直近のミーティングを取得
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
