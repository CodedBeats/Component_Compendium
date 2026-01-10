// dependencies
import { Navigate } from "react-router-dom"
// context
import { useAuth } from "../hooks/useAuth"

// wrapper for routes that require authentication
export const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth()

    if (loading) return null
    if (!isAuthenticated) return <Navigate to="/sign-in" replace />

    return children
}
