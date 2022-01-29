export const storeToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token))
}

export const getToken = () => {
    return JSON.stringify(localStorage.getItem("token"))
}

export const storeCurrentUser = (user: any) => {
    localStorage.setItem("currentUser", JSON.stringify(user))
}

export const getCurrentUser = () => {
    return JSON.stringify(localStorage.getItem("currentUser"))
}