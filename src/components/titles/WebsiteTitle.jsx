// style
import styles from "./css/WebsiteTitle.module.css"
// icons
import { RxComponent1 } from "react-icons/rx";

export const WebsiteTitle = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <RxComponent1 className={styles.websiteIcon} />
            </div>
            <h1 className={styles.websiteTitle}>Component Compendium</h1>
        </div>
    );
};

