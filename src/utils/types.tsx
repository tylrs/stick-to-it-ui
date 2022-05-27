import React from "react";

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
  password_confirmation?: string;
}

export interface HabitType {
  id?: number;
  userId?: number;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  start_datetime?: string;
  end_datetime?: string;
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
  user_id: number;
  user: { name: string };
  habit: { name: string; description: string };
  start_datetime: Date;
  end_datetime: Date;
  habit_logs: Array<HabitLogType>;
}

export interface InvitationType {
  id: number;
  recipient_email: string;
  habit_plan_id: number;
  status: "accepted" | "pending" | "declined";
  sender: { name: "string"; username: "string" };
  habit_plan: {
    start_datetime: Date;
    end_datetime: Date;
    habit: { name: string; description: string };
  };
}

export interface HabitProps {
  userId: number;
  habitInfo: { name: string; description: string };
  habitPlans: HabitPlanType[];
  handleDelete?: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface HabitPlanProps {
  userId: number;
  habitPlanInfo: HabitPlanType;
  habitLogsInfo: HabitLogType[];
  handleDelete: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface InviteModalProps {
  habitPlanInfo: HabitPlanType;
  userId: number;
  showInviteModal: boolean;
  setShowInviteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface NotificationModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
}

export interface HabitLogListProps {
  habitPlanInfo: HabitPlanType;
  habitLogsInfo: HabitLogType[];
  belongsToPartner: boolean;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface InvitationProps {
  type: "received" | "sent";
  invitationInfo: InvitationType;
}
