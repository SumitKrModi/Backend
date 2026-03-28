import { createContext, useState, useEffect } from "react"
import {api} from "./services/auth.api"
const Authcontext = createContext()

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/get-me');
                setUser(response.data.user || response.data);
            } catch (error) {
                console.log("No active session:", error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleRegister = async (username, password, email) => {
        setLoading(true)
        try {
          const response = await api.post("/register", {
            username,
            password,
            email
          })
          console.log(response.data)
          return { success: true, data: response.data }
        } catch (error) {
          console.log(error)
          setError(error.response?.data?.message || "Registration failed")
          return { success: false, error: error.response?.data?.message || "Registration failed" }
        } finally {
            setLoading(false)
        }
      }

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
          const response = await api.post("/login", {
            username,
            password,
          })
          console.log(response.data)
          setUser(response.data.user || response.data)
          return { success: true, data: response.data }
        } catch (error) {
          console.log(error)
          setError(error.response?.data?.message || "Login failed")
          return { success: false, error: error.response?.data?.message || "Login failed" }
        } finally {
            setLoading(false)
        }
      }
    return (
        <Authcontext.Provider value={{handleRegister,handleLogin,user,loading,error}}>
            {children}
        </Authcontext.Provider>
    )
}
export default Authcontext