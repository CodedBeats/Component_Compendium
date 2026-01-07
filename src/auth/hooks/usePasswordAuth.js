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

        const { error } = await supabase.auth.signUp({ email, password })

        if (error) {
            setError(error.message)
            return false
        }
        setSuccess(true)
        return true
    }

    const signInWithPassword = async (email, password) => {
        setError(null)
        setSuccess(false)

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            return false
        }
        setSuccess(true)
        return true
    }

    return { signUpWithPassword, signInWithPassword, error, success }
}