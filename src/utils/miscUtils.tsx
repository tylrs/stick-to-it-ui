import { UserType } from "./types"

export const storeToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token))
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem("token") || "{}")
}

export const storeCurrentUser = (user: UserType) => {
    localStorage.setItem("currentUser", JSON.stringify(user))
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser") || "{}")
}

export const getLastSunday = () => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay())
    const dateString = date.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"})
    return dateString;
}

export const getToday = () => {
    const date = new Date();
    const dateString = date.toLocaleString("en-US", {month: "long", day: "numeric", year: "numeric"})
    return dateString;
}

export const checkLoginCredentials = (email:string, password:string) => {
    if (!email || !password) {
        throw Error
    }
}

export const checkFormSubmission = (formData:any) => {
    console.log(formData)
    Object.keys(formData).forEach(input => {
        if (!formData[input]) {
            throw Error
        }
    })
}