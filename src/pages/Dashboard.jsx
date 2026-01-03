// dependencies
import { useState, useEffect } from "react"
// supabase client
import { createClient } from "../api/supabase/client"


const Dashboard = () => {
    // test data state
    const [testDataList, setTestDataList] = useState([])
    // supabase client init
    const supabase = createClient()

    // get test data from supabase db
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("TestTable").select()

            console.log(data)
            if (!error) setTestDataList(data)
            else console.error(error)
        }

        fetchData()        
    }, [])


    return (
        <div>
            {testDataList.map((item) => (
                <li key={item.title}>{item.text}</li>
            ))}
        </div>
    )
}

export default Dashboard