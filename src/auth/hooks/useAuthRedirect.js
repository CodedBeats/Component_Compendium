// dependencies
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// context
import { useAuth } from "../context/useAuth"

// handler for auth flow decisions
export const useAuthRedirect = ({ whenAuthenticated, whenUnauthenticated }) => {
    const { loading, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return

        // can redirect to authenticated page if authenticated
        if (isAuthenticated && whenAuthenticated) {
            navigate(whenAuthenticated)
        }

        // redirect to unauthenticated page when unauthenticated
        if (!isAuthenticated && whenUnauthenticated) {
            navigate(whenUnauthenticated)
        }
    }, [loading, isAuthenticated])
}
