// hooks
import { useAuth } from "../hooks/useAuth"

// use to wrap the app so when auth is loading you have visual responsivity
export const AuthBoundry = ({ children }) => {
    const { loading } = useAuth()

    if (loading) return <div>I'm Loading, check back later</div>

    return children
}
