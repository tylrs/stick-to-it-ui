import { urls } from "../dev-constants";
import { getToken, storeCurrentUser, storeToken } from "./miscUtils";
import { AccountType, HabitType } from "./types";

export const createUser = async (accountInfo: AccountType) => {
  const formData = new FormData();
  formData.append("name", accountInfo.name);
  formData.append("username", accountInfo.username);
  formData.append("email", accountInfo.email);
  formData.append("password", accountInfo.password);
  formData.append("password_confirmation", accountInfo.passwordConfirmation);
  const postInfo = {
    method: "POST",
    headers: {},
    body: formData,
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
  const formData = new FormData();
  formData.append("email", credentials.email);
  formData.append("password", credentials.password);
  const postInfo = {
    method: "POST",
    headers: {},
    body: formData,
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
  const startDate = habitInfo.startDate!.toString();
  const endDate = habitInfo.endDate!.toString();
  const formData = new FormData();
  formData.append("name", habitInfo.name);
  formData.append("description", habitInfo.description);
  formData.append("start_datetime", startDate);
  formData.append("end_datetime", endDate);
  const postInfo = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
        method: "GET",
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
      method: "GET",
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
