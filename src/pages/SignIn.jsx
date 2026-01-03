// dependencies
import { useState, useEffect } from "react"
// auth hooks
import { useAuth } from "../auth/hooks/useAuth"
import { useMagicLink } from "../auth/hooks/useMagicLink"


const SignIn = () => {
    // hooks
    const { session, user, handleLogout } = useAuth()
    const { error, magicLinkEmailSent, verifying, sendMagicLink, verifyMagicLink } = useMagicLink()
    // state
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedLoginType, setSelectedLoginType] = useState("magic-link")

    useEffect(() => {
        verifyMagicLink()
    }, [])


    // idk
    if (verifying) return <p>Verifying your link...</p>
    if (user) {
        return (
            <div>
                <h1>Welcome!</h1> 
                <p>You are logged in as: {session.user.email}</p> 
                <button onClick={handleLogout}> Sign Out </button>
            </div>
        )
    }


    // handle login for selected type
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        // handle selected
        if (selectedLoginType === "magic-link") {
            await sendMagicLink(email)
            setLoading(false)

        } else if (selectedLoginType === "github") {
            // do github login
            console.log("github login")
            setLoading(false)

        } else if (selectedLoginType === "email-password") {
            // do email and password login
            console.log("email and password login")
            setLoading(false)
        }
    }


    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button disabled={loading}>
                    {loading ? "Sending..." : "Send magic link"}
                </button>
            </form>
            <button onClick={() => setSelectedLoginType("magic-link")}>Login with Magic Link</button>
            <button onClick={() => setSelectedLoginType("github")}>Login with Github</button>
            <button onClick={() => setSelectedLoginType("email-password")}>Login with Email and Password</button>
            {magicLinkEmailSent && <p>Check your email!</p>}
            {error && <p>Login Failed: {error}</p>}
        </div>
    );
}

export default SignIn