// extracted add component logic

// DB insert func
import { createFullComponent } from "../../../api/supabase/component";

export const useComponentAdd = () => {
    const handleCreateFullComponent = async ({ userID, name, description, componentCatID, tags, codeVariants }) => {
        try {
            const component = await createFullComponent({
                userId: userID,
                name: name,
                description: description,
                componentCategoryId: componentCatID,
                tags: tags,
                codeVariants: codeVariants,
            })

            console.log("component created")
            console.log(component)

        } catch (err) {
            console.log(err)
        }
    }

    return { handleCreateFullComponent }
}


