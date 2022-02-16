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
  habit_id: number;
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

export interface HabitProps {
  habitInfo: HabitType;
  habitLogsInfo: HabitLogType[];
  handleDelete?: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
