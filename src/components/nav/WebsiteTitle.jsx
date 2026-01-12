// style
import styles from "./css/WebsiteTitle.module.css"
// icons
import { ComponentIcon } from "../../utils/iconHandler.js"

export const WebsiteTitle = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <ComponentIcon className={styles.websiteIcon} />
            </div>
            <h1 className={styles.websiteTitle}>Component Compendium</h1>
        </div>
    );
};

