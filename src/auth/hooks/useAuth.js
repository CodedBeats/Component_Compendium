// dependencies
import { useContext } from "react"
// context
import { AuthContext } from "../../context/AuthContext"

// use context as hook (haha see what I did there with "use"? lol)
export const useAuth = () => {
    return useContext(AuthContext)
}
