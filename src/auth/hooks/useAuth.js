// dependencies
import { useContext } from "react"
// context
import { AuthContext } from "../../context/AuthContext"

// use context as hook (haha see what I did there with "use"? lol)


/**
 * @typedef {Object} AuthContextValue
 * @property {?Object} user
 * @property {?Object} session
 * @property {?Object} userProfile
 * @property {boolean} loading
 * @property {boolean} isAuthenticated
 * @property {function(): Promise<void>|function(): void} signOut
 */

/**
 * auth hook that exposes authentication-related context.
 * @returns {AuthContextValue}
 */
export const useAuth = () => {
    return useContext(AuthContext)
}
