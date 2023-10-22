

export const isUserLoggedIn = () => typeof window !== 'undefined' ? localStorage.getItem("userInfo") : null 
export const getUserData = () => typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userInfo")) : null 
export const getUserToken = () => typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null 
