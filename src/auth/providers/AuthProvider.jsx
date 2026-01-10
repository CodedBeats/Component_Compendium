// dependencies
import { useEffect, useState } from "react"
// context
import { AuthContext } from "./AuthContext"
// supabase
import { createClient } from "../api/supabase/client"
import { getUserRowByAuthId } from "../../api/supabase/user"


export const AuthProvider = ({ children }) => {
    const supabase = createClient()

    // suth statte
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    // user data state
    const [userProfile, setUserProfile] = useState(null)
    // other state
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

        // fetch user db data and store in state
        const fetchProfile = async (userId) => {
            const userData = getUserRowByAuthId(userId)
            setUserProfile(userData)
        }
        
        // listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            // and update auth state
            setSession(session)
            setUser(session?.user ?? null)

            // then data state
            if (session?.user) {
                fetchProfile(session.user.id)
            } else {
                setUser(null)
            }
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
                userProfile,
                loading,
                isAuthenticated: !!user,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
