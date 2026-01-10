// dependencies
import { Navigate } from "react-router-dom"
// hook
import { useAuth } from "../hooks/useAuth"

export const PublicOnlyRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth()

    if (loading) return null
    if (isAuthenticated) return <Navigate to="/" replace />

    return children
}
