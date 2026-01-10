// dependencies
import { useState, useEffect } from "react"
// auth context
import { useAuth } from "../auth/hooks/useAuth"


const Dashboard = () => {
    // auth
    const { userProfile, signOut } = useAuth()

    return (
        <div>
            <div>
                Username: {userProfile?.username}
            </div>
            <div>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Dashboard