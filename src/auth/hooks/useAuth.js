// dependencies
import { useContext } from "react"
import { AuthContext } from "./AuthContext"

// use context as hook (haha see what I did there with "use"? lol)
export const useAuth = () => {
    return useContext(AuthContext)
}
