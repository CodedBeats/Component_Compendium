// supabase client
import { createClient } from "./client"

export const createUserRow = async ({ username, email, authUserId }) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("User")
        .insert([
            {
                username,
                email,
                auth_user_id: authUserId,
            },
        ])
        .select() // return inserted row

    if (error) {
        console.error("Error creating user row:", error)
        return { error }
    }

    return { data }
}

export const getUserRowByAuthId = async (authUserId) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("auth_user_id", authUserId)
        .single()

    return error ? null : data
};

