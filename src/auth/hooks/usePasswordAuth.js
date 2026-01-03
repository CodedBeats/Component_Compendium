// dependencies
import { useState } from "react"
// supabase client
import { createClient } from "../../api/supabase/client"

export const usePasswordAuth = () => {
    const supabase = createClient()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const signUpWithPassword = async (email, password) => {
        setError(null)
        setSuccess(false)

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) setError(error.message)
        else setSuccess(true)
    }

    return { signUpWithPassword, error, success }
}
