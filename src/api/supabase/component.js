// supabase client
import { createClient } from "./client"
// types for jsdoc
import "../../types/component"


// ====================================================== //
// ======================= CREATE ======================= //
// ====================================================== //

/**
 * 
 * @param {number} userId - ID of the db user
 * @param {string} name - inputted name
 * @param {string} description - inputted description
 * @param {number} componentCategoryId - ID of the category
 * @param {text[]} tags - array of tags
 * @returns {NewlyCreatedComponentData}
 */
const createComponent = async ({ userId, name, description, componentCategoryId, tags }) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("Component")
        .insert({
            user_id: userId,
            name,
            description,
            component_category_id: componentCategoryId,
            tags,
        })
        .select()
        .single()

    if (error) {
        throw error
    }

    // return newly created component table row
    return data
}


/**
 * bulk insert all code variants for a component
 * @param {number} componentId - the ID of the newly created component
 * @param {Array<Object>} codeVariants - array of code variants {variant_type, code}
 * @returns no idea yet, figure out in use
 */
const createCodeVariants = async ({ componentId, codeVariants }) => {
    const supabase = createClient()

    if (!codeVariants?.length) return []

    const payload = codeVariants.map((variant) => ({
        component_id: componentId,
        variant_type: variant.variant_type,
        code: variant.code,
    }))

    const { data, error } = await supabase
        .from("CodeVariant")
        .insert(payload)
        .select()

    if (error) {
        throw error
    }

    return data
}


/**
 * create component row and it's code variant rows
 * @param {number} userId - ID of the db user
 * @param {string} name - inputted name
 * @param {string} description - inputted description
 * @param {number} componentCategoryId - ID of the category
 * @param {text[]} tags - array of tags
 * @param {Array<Object>} codeVariants - array of code variant objects: {variant_type, code}
 * @returns {NewlyCreatedComponentData}
 */
export const createFullComponent = async ({ userId, name, description, componentCategoryId, tags, codeVariants }) => {
    // first create the component
    const component = await createComponent({
        userId,
        name,
        description,
        componentCategoryId,
        tags,
    })

    // then create code variants for the newly created component
    await createCodeVariants({
        componentId: component.id,
        codeVariants,
    })

    return component
}





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
