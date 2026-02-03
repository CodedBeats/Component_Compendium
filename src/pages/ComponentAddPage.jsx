// dependencies

// hook from feature
import { useComponentAdd } from '../features/components/ComponentAdd/useComponentAdd';
// auth context
import { useAuth } from "../auth/hooks/useAuth"

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
    const { handleCreateFullComponent } = useComponentAdd()
    // auth
    const { userProfile } = useAuth()

    const testComponent = {
        name: "Form1",
        description: "this is test form1 component",
        componentCategoryId: 3,
        tags: ["form", "simple", "test"],
        codeVariants: [
        {
            variantType: "React+CSS",
            code: `
            const TestForm = () => {
                return (
                    <div>
                        <form>
                            <input 
                                className={styles.searchInput}
                                required={true}
                                placeholder={"Search components..."}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </form>
                    </div>
                )
            }

            /* CSS */
            .searchInput {
                padding: 8px 12px;
                background-color: "yellow";
            }
            `,
        },
        {
            variantType: "HTML+CSS",
            code: `
            <div>
                <form>
                    <input 
                        class="search-input"
                        required={true}
                        placeholder="Search components..."
                        onChange={(e) => console.log(e.target.value)}
                    />
                </form>
            </div>

            /* CSS */
            .search-input {
                padding: 8px 12px;
                background-color: "yellow";
            }
            `,
        },
        ],
    }

    return (
        <div className={styles.pageContainer}>
            <button
                className={styles.testInsertBtn}
                onClick={ () =>
                    handleCreateFullComponent({
                        userID: userProfile.id,
                        name: testComponent.name,
                        description: testComponent.description,
                        componentCatID: testComponent.componentCategoryId,
                        tags: testComponent.tags,
                        codeVariants: testComponent.codeVariants.map(v => ({
                            variant_type: v.variantType,
                            code: v.code,
                        })),
                    })
                }
            >Insert Test Component</button>
        </div>
    );
};