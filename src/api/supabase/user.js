// supabase client
import { createClient } from "./client"
// types for jsdoc
import "../../types/user"

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




/**
 * get all the user's favoutite categories
 * @param {number} userId - the ID of the db user
 * @returns {UserFabouriteCategoriesWithCountsData}
 */
export const getUserFavouriteCategories = async (userId) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("user_favourite_category_counts")
        .select("*")
        .eq("user_id", userId)
        .order("category_name")

    return error ? [] : data
}


/**
 * toggle a category being a favourite of the user
 * @param {number} userId - the ID of the db user
 * @param {number} categoryId - the ID of the category
 * @param {boolean} isFavourite - whether the category IS or IS NOT favoutited
 */
export const toggleFavouriteCategory = async (userId, categoryId, isFavourite) => {
    const supabase = createClient()

    if (isFavourite) {
        return supabase
            .from("UserFavouriteCategories")
            .delete()
            .eq("user_id", userId)
            .eq("component_category_id", categoryId)
    }

    return supabase.from("UserFavouriteCategories").insert({
        user_id: userId,
        component_category_id: categoryId,
    })
}



/**
 * get all categories that the user has components in
 * @param {number} userId - the ID of the db user
 * @returns {UserAllCategoriesWithCountsData}
 */
export const getUserCategoriesWithCounts = async (userId) => {
  const supabase = createClient()

  const { data, error } = await supabase
      .from("user_category_counts")
      .select("*")
      .eq("user_id", userId)
      .order("category_name")

  return error ? [] : data
}




