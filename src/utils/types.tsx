export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface AccountType {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface HabitType {
  id?: number;
  userId?: number;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface HabitLogType {
  id: number;
  habit_plan_id: number;
  scheduled_at: string;
  completed_at: string | null;
}

export interface HabitsType {
  id?: number;
  userId?: number;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  habit_logs: Array<HabitLogType>;
}

export interface HabitPlanType {
  id?: number;
  habit_id: number;
  userId?: number;
  habit: { name: string; description: string };
  startDate: Date;
  endDate: Date;
  habit_logs: Array<HabitLogType>;
}

export interface HabitProps {
  habitInfo: HabitPlanType;
  habitLogsInfo: HabitLogType[];
  handleDelete?: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface HabitPlanProps {
  habitPlanInfo: HabitPlanType;
  habitLogsInfo: HabitLogType[];
  handleDelete: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface HabitLogListProps {
  habitPlanInfo: HabitPlanType;
  habitLogsInfo: HabitLogType[];
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
