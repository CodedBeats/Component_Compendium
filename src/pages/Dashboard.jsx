// dependencies
import { useState, useEffect } from "react"
// auth context
import { useAuth } from "../auth/hooks/useAuth"
// components
import { Navbar } from "../components/nav/Navbar"
// style
import styles from "./css/Dashboard.module.css"


const Dashboard = () => {

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div>
            </div>
        </div>
    )
}

export default Dashboard