import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { createClient } from "../api/supabase/client"

export const AuthProvider = ({ children }) => {
    const supabase = createClient()

    // statte
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)


    // update on init and changes in auth
    useEffect(() => {
        const init = async () => {
            // get existing session on first load
            const { data: { session } } = await supabase.auth.getSession()
            // set session data in state
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        init()

        
        // listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            // and update state
            setSession(session)
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    
    // sign out func
    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setSession(null)
    }


    // attatch values to context to import
    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                isAuthenticated: !!user,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
