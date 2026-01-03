// dependencies
import { useState } from "react"
// auth hook
import { usePasswordAuth } from "../auth/hooks/usePasswordAuth"

const SignUp = () => {
    // hook
    const { signUpWithPassword, error, success } = usePasswordAuth()
    // state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedSignUpType, setSelectedSignUpType] = useState("email-password")


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setLoading(false)
        
        // handle selected
        if (selectedSignUpType === "email-password") {
            await signUpWithPassword(email, password)
            setLoading(false)

        } else if (selectedSignUpType === "github") {
            // do github sign up
            console.log("github login")
            setLoading(false)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="w-full max-w-sm p-4">
                <h1 className="text-xl font-medium mb-2">Create an account</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Sign up with email and password
                </p>

                <form onSubmit={handleSubmit} className="grid gap-3">
                    <input
                        className="w-full border rounded-lg p-2 text-sm"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full border rounded-lg p-2 text-sm"
                        type="password"
                        placeholder="Password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-black text-white rounded-lg p-2 text-sm disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <button onClick={() => setSelectedSignUpType("email-password")}>Login with Email and Password</button>
                <button onClick={() => setSelectedSignUpType("github")}>Login with Github</button>

                {success && (
                    <p className="text-green-600 text-sm mt-3">
                        Account created! Check your email to confirm.
                    </p>
                )}
                {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

                <p className="text-xs text-gray-400 mt-6">
                    Built for UI collectors who care about code
                </p>
            </div>
        </div>
    )
}

export default SignUp
