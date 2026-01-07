// incons
import { EeyeSlashIcon, EyeIcon } from "../../utils/iconHandler";
// style
import styles from "./css/Inputs.module.css"

export const AuthFormInput = ({label, type, value, placeholder, onChange}) => {
    return (
        <div className={styles.authLabelInputContainer}>
            <p className={styles.authLabel}>{label}</p>
            <input
                className={styles.authInput}
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