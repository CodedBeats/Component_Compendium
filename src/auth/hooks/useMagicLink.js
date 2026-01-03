// dependencies
import { useState } from "react"
// supabase client
import { createClient } from "../../api/supabase/client"

export const useMagicLink = () => {
    const supabase = createClient()
    const [error, setError] = useState(null)
    const [magicLinkEmailSent, setMagicLinkEmailSent] = useState(false)
    const [verifying, setVerifying] = useState(false)

    const sendMagicLink = async (email) => {
        setError(null)
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: window.location.origin },
        })

        if (error) setError(error.message)
        else setMagicLinkEmailSent(true)
    }

    const verifyMagicLink = async () => {
        const params = new URLSearchParams(window.location.search)
        const token_hash = params.get("token_hash")
        const type = params.get("type")

        if (!token_hash) return

        setVerifying(true)
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type || "email",
        })

        if (error) setError(error.message)
        else setMagicLinkEmailSent(true)

        window.history.replaceState({}, document.title, "/")
        setVerifying(false)
    }

    return {
        error,
        magicLinkEmailSent,
        verifying,
        sendMagicLink,
        verifyMagicLink,
    }
}
