// dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// style
import "./theme/typography.css";

// route handlers
import { ProtectedRoute } from "./auth/routes/ProtectedRoute";
import { PublicOnlyRoute } from "./auth/routes/PublicOnlyRoute";
// pages
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


const App = () => {
    return (
        <Router>
            <Routes>
                {/* protected routes */}
                <Route path="/" element = {
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                {/* unauthenticated only routes | auth */}
                <Route path="/sign-in" element = {
                    <ProtectedRoute>
                        <SignIn />
                    </ProtectedRoute>
                } />
                <Route path="/sign-up" element = {
                    <ProtectedRoute>
                        <SignUp />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    )
}

export default App;
