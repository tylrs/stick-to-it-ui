export const storeToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token))
}

export const getToken = () => {
    return JSON.stringify(localStorage.getItem("token"))
}