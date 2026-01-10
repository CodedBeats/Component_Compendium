// supabase client
import { createClient } from "./client"

/**
 * Create a row in the User table in supabase DB
 * @param {string} username - one or multiple words
 * @param {string} email - varified email address
 * @param {string} authUserId - the UID of the newly created auth user
 * @returns 
 */
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


/**
 * Fetch a row from the User table in supabase DB
 * @param {string} authUserId - the UID of the auth user
 * @returns user row data, or null if there was an error
 */
export const getUserRowByAuthId = async (authUserId) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("auth_user_id", authUserId)
        .single()

    return error ? null : data
};

