// dependencies

// style
import styles from './css/ComponentAddPage.module.css'


// first create Component, then create CodeVariants
// planned object data to pass for supabase db api calls:
/* 
{
    name: string
    description: string
    componentCategoryId: number
    tags: string[]                  // max length per tag enforced in UI
    codeVariants: Array<{
        variant_type: string
        code: string
    }>
}
*/

export const ComponentAddPage = () => {
    return (
        <div className={styles.pageContainer}>
            
        </div>
    );
};