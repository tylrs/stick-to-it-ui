import { urls } from "../dev-constants";
import { getToken, storeCurrentUser, storeToken } from "./miscUtils";
import { sampleUser } from "../dev-constants";
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
        const response = await fetch(`${urls.localUsers}`, postInfo)
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
    const formData = new FormData();
    formData.append("name", habitInfo.name);
    formData.append("description", habitInfo.description);
    formData.append("start_datetime", habitInfo.startDate);
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
        if (data.length) {
            console.log("Should be habits", data)
            return data
        }
    } catch (err){
        console.log(err)
    }
}