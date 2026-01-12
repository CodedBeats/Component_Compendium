// dependencies
import { Link } from "react-router-dom"
// components
import { Navbar } from "../components/nav/Navbar"
import { Breadcrumbs } from "../components/nav/Breadcrumbs"

// style
import styles from './css/Test.module.css'

export const Test = () => {
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div>
                <Breadcrumbs />
            </div>
            <div>
                <Link to="/dashboard">home</Link>
            </div>
        </div>
    );
};