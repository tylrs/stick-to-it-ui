import { storeToken } from "./miscUtils";

const data = {
    name: "john smith",
    username: "tayjohnlorsmith12",
    email: "taylorsmith66@example.com",
    password: "123456",
    password_confirmation: "123456"
}
export const createUser = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    const postInfo = {
        method: "POST",
        headers: {},
        body: formData
    }
    try {
        const response = await fetch("https://stick-to-it-api.herokuapp.com/users", postInfo)
        const data = await response.json()
        console.log(data)
    } catch (err){
        console.log(err)
    }
}

export const login = async () => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const postInfo = {
        method: "POST",
        headers: {},
        body: formData
    }
    try {
        const response = await fetch("https://stick-to-it-api.herokuapp.com/auth/login", postInfo)
        const data = await response.json()
        console.log(data)
        storeToken(data.token)
    } catch (err){
        console.log(err)
    }
}