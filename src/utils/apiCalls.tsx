import { urls } from "../dev-constants";
import { getToken, storeCurrentUser, storeToken } from "./miscUtils";
import { sampleUser } from "../dev-constants";

export const createUser = async (accountInfo) => {
    const formData = new FormData();
    formData.append("name", sampleUser.name);
    formData.append("username", sampleUser.username);
    formData.append("email", sampleUser.email);
    formData.append("password", sampleUser.password);
    formData.append("password_confirmation", sampleUser.password_confirmation);
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
        storeToken(data.token)
        storeCurrentUser(data.user)
        return data.user
    } catch (err){
        console.log(err)
    }
}