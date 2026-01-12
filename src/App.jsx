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
                <Route path="/dashboard" element = {
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                {/* 
                    Planned routes
                    /components
                    /components/:componentID
                    /components/add
                    /components/edit/:componentID
                    /categories
                    /categories/:categoryID
                */}

                {/* unauthenticated only routes | auth */}
                <Route path="/sign-in" element = {
                    <PublicOnlyRoute>
                        <SignIn />
                    </PublicOnlyRoute>
                } />
                <Route path="/sign-up" element = {
                    <PublicOnlyRoute>
                        <SignUp />
                    </PublicOnlyRoute>
                } />
            </Routes>
        </Router>
    )
}

export default App;
