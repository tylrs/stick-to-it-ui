import HabitLog from "../components/HabitLog/HabitLog";
import { HabitLogListProps, HabitProps, UserType } from "./types";

export const storeToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token") || "{}");
};

export const storeCurrentUser = (user: UserType) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser") || "{}");
};

export const getLastSunday = () => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  const dateString = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return dateString;
};

export const getToday = () => {
  const date = new Date();
  const dateString = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return dateString;
};

export const checkLoginCredentials = (email: string, password: string) => {
  if (!email || !password) {
    throw Error;
  }
};

export const getDayOfWeek = (logTimestamp: string) => {
  return new Date(logTimestamp.replaceAll("-", "/").slice(0, 10)).getDay();
};

export const generateHabitLogList = ({
  habitPlanInfo,
  habitLogsInfo,
  listType,
  setMessage,
}: HabitLogListProps) => {
  const componentsOfWeek = [...Array(7)].map((item, index) => (
    <HabitLog
      habitLogInfo={null}
      userId={0}
      dayNum={index}
      key={index}
      listType={listType}
      setMessage={setMessage}
    />
  ));
  return habitLogsInfo.reduce((acc, currentLog) => {
    const dayNum = getDayOfWeek(currentLog.scheduled_at);
    acc[dayNum] = (
      <HabitLog
        habitLogInfo={currentLog}
        userId={habitPlanInfo.userId}
        dayNum={dayNum}
        key={dayNum}
        listType={listType}
        setMessage={setMessage}
      />
    );
    return acc;
  }, componentsOfWeek);
};
