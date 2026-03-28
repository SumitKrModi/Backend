import {createContext} from "react"
import { useState } from "react"
const Postcontext = createContext()

export const PostProvider = ({children}) => {
    const [feed,setFeed] = useState([])
    const [loading,setLoading] = useState(false)
    const [post,setPost] = useState(null)
    return (
        <Postcontext.Provider value={{feed,loading,post,setFeed,setLoading,setPost}}>
            {children}
        </Postcontext.Provider>
    )
}
export default Postcontext