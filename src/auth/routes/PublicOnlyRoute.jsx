// dependencies
import { Navigate } from "react-router-dom"
// context
import { useAuth } from "../../context/AuthContext"

export const PublicOnlyRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth()

    if (loading) return null
    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    return children
}
