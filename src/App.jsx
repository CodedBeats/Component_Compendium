import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)


function App() {
    const [count, setCount] = useState(0);
    const [testDataList, setTestDataList] = useState([])

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
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            {testDataList.map((item) => (
                <li key={item.title}>{item.text}</li>
            ))}
        </>
    );
}

export default App;
