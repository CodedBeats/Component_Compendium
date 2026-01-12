// incons
import { EeyeSlashIcon, EyeIcon, SearchIcon } from "../../utils/iconHandler"
// style
import styles from "./css/Inputs.module.css"

export const AuthFormInput = ({label, type, value, placeholder, onChange}) => {
    return (
        <div className={styles.authLabelInputContainer}>
            <p className={styles.authLabel}>{label}</p>
            <input
                className={styles.authInput}
                required={true}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};


export const AuthFormPasswordInput = ({label, value, placeholder, isHidden, onChange, onToggleHidden}) => {
    return (
        <div className={styles.authLabelInputContainer}>
            <p className={styles.authLabel}>{label}</p>
            <div className={styles.passwordInputContainer}>
                <input
                    className={styles.passwordAuthInput}
                    required={true}
                    type={isHidden ? "password" : "text"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    type="button"
                    className={styles.toggleHiddenBtn}
                    onClick={onToggleHidden}
                >
                    { isHidden ? (
                        <EeyeSlashIcon className={styles.hideIcon} />
                    ) : (
                        <EyeIcon className={styles.hideIcon} />
                    )}
                </button>
            </div>
        </div>
    );
};


export const SearchFormInput = ({value, onChange}) => {
    return (
        <div className={styles.searchInputContainer}>
            <div className={styles.searchIconContainer}>
                <SearchIcon className={styles.searchIcon} />
            </div>
            <div className={styles.inputContainer}>
                <input 
                    className={styles.searchInput}
                    required={true}
                    placeholder={"Search components..."}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    )
}
