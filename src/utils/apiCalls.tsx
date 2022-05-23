import { urls } from "../dev-constants";
import { getToken, storeCurrentUser, storeToken } from "./miscUtils";
import { AccountType, HabitType } from "./types";

export const createUser = async (accountInfo: AccountType) => {
  accountInfo["password_confirmation"] = accountInfo.passwordConfirmation;
  const postInfo = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(accountInfo),
  };
  try {
    const response = await fetch(`${urls.localUsers}`, postInfo);
    if (!response.ok) throw await response.json();
  } catch (err: any) {
    throw err;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const postInfo = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  try {
    const response = await fetch(`${urls.localLogin}`, postInfo);
    if (!response.ok) throw await response.json();
    const data = await response.json();
    storeToken(data.token);
    storeCurrentUser(data.user);
    return data.user;
  } catch (err: any) {
    throw err;
  }
};

export const createHabit = async (habitInfo: HabitType) => {
  const token = getToken();
  habitInfo.start_datetime = habitInfo.startDate!.toString();
  habitInfo.end_datetime = habitInfo.endDate!.toString();
  const postInfo = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(habitInfo),
  };
  try {
    const response = await fetch(
      `${urls.localUsers}/${habitInfo.userId}/habits`,
      postInfo
    );
    if (!response.ok) throw response.statusText;
  } catch (err: any) {
    throw err;
  }
};

export const getAllHabits = async (userId: number) => {
  const token = getToken();
  try {
    const response = await fetch(`${urls.localUsers}/${userId}/habits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const getWeekHabitAndPartnerPlans = async (userId: number) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${urls.localUsers}/${userId}/habit_plans/week`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteHabitPlan = async (
  userId: number,
  habitPlanId: number | undefined
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${urls.localUsers}/${userId}/habit_plans/${habitPlanId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw await response.json();
  } catch (err: any) {
    throw err;
  }
};

export const updateHabitLog = async (
  userId: number | undefined,
  habitPlanId: number | undefined,
  habitLogId: number | undefined
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${urls.localUsers}/${userId}/habit_plans/${habitPlanId}/habit_logs/${habitLogId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data.habit_log;
  } catch (err: any) {
    throw err;
  }
};

export const getTodayHabitPlans = async (userId: number | undefined) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${urls.localUsers}/${userId}/habit_plans/today`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const getUserByEmail = async (email: string) => {
  const token = getToken();
  try {
    const response = await fetch(`${urls.localUsers}/email?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw await response.json();
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const createInvitation = async (
  recipientInfo: {
    recipient_name: string;
    recipient_email: string;
  },
  userId: number,
  habitPlanId: number
) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${urls.localUsers}/${userId}/habit_plans/${habitPlanId}/invitations/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(recipientInfo),
      }
    );
    if (!response.ok) throw await response.json();
    const data = response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
