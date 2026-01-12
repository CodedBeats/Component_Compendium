// style
import styles from './css/FormOptionBtn.module.css'

export const FormOptionBtn = ({ selectedLoginType, handleSelect, icon }) => {
    return (
        <button 
            className={styles.loginOption}
            style={{
                border: selectedLoginType ? "2px solid #4f6c89ff" : "2px solid #283d52"
            }}
            onClick={handleSelect}
        >
            {icon}
            <p className={styles.loginOptionText}>Password</p>
        </button>
    );
};