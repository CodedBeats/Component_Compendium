// dependencies
import { useState } from "react"
// components
import { SearchFormInput } from "./Inputs"

export const Search = () => {
    // state
    const [searchQuery, setSearchQuery] = useState("")

    // handle form submit (press enter)
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newQuery = searchQuery
        console.log(`run search query with "${newQuery}"`)
    }


    return (
        <form onSubmit={handleSubmit}>
            <SearchFormInput 
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
            />
        </form>
    );
};