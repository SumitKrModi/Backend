import axios from "axios"
export const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const login = async (username, password) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

export const register = async (username, password, email) => {
    try {
      const response = await api.post("/register", {
        username,
        password,
        email
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

export const getMe = async () => {
    try {
      const response = await api.get("/get-me")
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  