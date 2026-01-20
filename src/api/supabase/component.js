// supabase client
import { createClient } from "./client"
// types for jsdoc
import "../../types/component"


// ====================================================== //
// ======================= CREATE ======================= //
// ====================================================== //

//



// ====================================================== //
// ======================= READ ========================= //
// ====================================================== //

/**
 * get lightweight information about all components in a category (no FKs or code variants)
 * @param {number} userId - the ID of the db user
 * @param {*} categoryId - the ID of the category
 * @param {*} pageLength - how many components to get, decided get by page length
 * @returns {ComponentsByCategoryData} data object
 */
export const getComponentsByCategory = async ({ userId, categoryId, pageLength = 20 }) => {
    const supabase = createClient()

    const from = 0
    const to = from + pageLength - 1

    const { data, error } = await supabase
        .from("Component")
        .select("id, name, description, created_at")
        .eq("user_id", userId)
        .eq("component_category_id", categoryId)
        .order("created_at", { ascending: false })
        .range(from, to)

    return error ? [] : data
}


/**
 * get component by ID (no FK data)
 * @param {number} componentId - the ID of the component
 * @returns {ComponentSimpleData} data object
 */
export const getComponentById = async (componentId) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("Component")
        .select("*")
        .eq("id", componentId)
        .single()

    return error ? null : data
}


/**
 * get all code variants of a component
 * @param {number} componentId - the ID of the component
 * @returns {ComponentCodeVariantsData[]} an array of all code variant objects for the component
 */
export const getCodeVariantsByComponentId = async (componentId) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("CodeVariant")
        .select("id, variant_type, code")
        .eq("component_id", componentId)

    return error ? [] : data
}



// ====================================================== //
// ======================= UPDATE ======================= //
// ====================================================== //

//



// ====================================================== //
// ======================= DELETE ======================= //
// ====================================================== //

//
