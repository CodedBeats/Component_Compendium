// dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

// pages
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                {/* auth */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    )
}

export default App;
