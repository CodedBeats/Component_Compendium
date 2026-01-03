import { useState, useEffect } from "react"
import { createClient } from "../../api/supabase/client"

export const useAuth = () => {
    const supabase = createClient()
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => { 
        await supabase.auth.signOut() 
        setSession(null) 
    }

    return {
        session,
        user: session?.user ?? null,
        loading,
        handleLogout
    }
}
