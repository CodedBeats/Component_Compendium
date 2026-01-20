// dependencies
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// components
import { Navbar } from "../components/nav/Navbar"
import { Breadcrumbs } from "../components/nav/Breadcrumbs"
// auth context
import { useAuth } from "../auth/hooks/useAuth"
// style
import styles from "./css/Dashboard.module.css"


const Dashboard = () => {
    // auth
    const { userProfile } = useAuth()

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentContainer}>
                {/* breadcrumbs */}
                <div>
                    <Breadcrumbs />
                    <Link to="/dashboard/testPage/exampleComponent">test breadcrumbs</Link>
                </div>

                {/* welcome and component count | new component btn */}
                <div className={styles.header}>
                    <div>
                        <div className={styles.welcomeText}>
                            Welcome Back o/ {userProfile?.username}
                        </div>
                        <div className={styles.componentCountText}>
                            Your have <CompCatLink to="/components" count="42" text="components" />
                            across <CompCatLink to="/categories" count="6" text="categories" />
                        </div>
                    </div>
                    <div className={styles.btnContainer}>
                        <Link to="/components/add">
                            <button className={styles.newComponentBtn}>
                                + New Component
                            </button>
                        </Link>
                    </div>
                </div>

                {/* favourite categories redner */}

            </div>
        </div>
    )
}

export default Dashboard

// simple extraction cause I don't like cluttered span code lol
const CompCatLink = ({ to, count, text}) => {
    return (
        <Link className={styles.compCatLink} to={to}>
            {count} {text}
        </Link>
    )
}
