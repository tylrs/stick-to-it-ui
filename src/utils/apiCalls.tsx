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
        body: formData
    }
    try {
        const response = await fetch(`${urls.productionUsers}`, postInfo)
        const data = await response.json()
        console.log(data)
    } catch (err){
        console.log(err)
    }
}

export const login = async (credentials: { email: string; password: string; }) => {
    const formData = new FormData();
    console.log("Credentials", credentials)
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    const postInfo = {
        method: "POST",
        headers: {},
        body: formData
    }
    try {
        const response = await fetch(`${urls.localLogin}`, postInfo)
        const data = await response.json()
        console.log("Should be user", data)
        if (!("error" in data)) {
            storeToken(data.token)
            storeCurrentUser(data.user)
            return data.user
        } else {
            throw Error(data.error)
        }
    } catch (err){
        console.log(err)
    }
}

export const createHabit = async (habitInfo: HabitType) => {
    const token = getToken()
    const startDate = habitInfo.startDate!.toString()
    const endDate = habitInfo.endDate!.toString()
    const formData = new FormData();
    formData.append("name", habitInfo.name);
    formData.append("description", habitInfo.description);
    formData.append("start_datetime", startDate);
    formData.append("end_datetime", endDate);
    const postInfo = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    }
    try {
        const response = await fetch(`${urls.localUsers}/${habitInfo.userId}/habits`, postInfo)
        const data = await response.json()
        console.log(data)
    } catch (err){
        console.log(err)
    }
}

export const getAllHabits = async (userId: number) => {
    const token = getToken()
    try {
        const response = await fetch(`${urls.localUsers}/${userId}/habits`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (err){
        console.log(err)
    }
}

export const deleteHabit = async (userId: number, habitId: number | undefined) => {
    const token = getToken()
    try {
        const response = await fetch(`${urls.localUsers}/${userId}/habits/${habitId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        console.log(response)
    } catch (err){
        console.log(err)
    }
}

export const updateHabitLog = async (userId: number | undefined, habitId: number | undefined, habitLogId: number | undefined) => {
    const token = getToken()
    try {
        const response = await fetch(`${urls.localUsers}/${userId}/habits/${habitId}/habit_logs/${habitLogId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (err){
        console.log(err)
    }
}

export const getTodayHabits = async (userId: number | undefined) => {
    const token = getToken()
    try {
        const response = await fetch(`${urls.localUsers}/${userId}/habits/today`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (err){
        console.log(err)
    }
}