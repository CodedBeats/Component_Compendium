// style
import styles from "./css/FormSubmitBtn.module.css"

export const FormSubmitBtn = ({ loading, formFieldsValid, submitMsg}) => {
    return (
        <button 
            className={styles.submitBtn}
            disabled={loading || !formFieldsValid}
            style={{
                backgroundColor: formFieldsValid ? "#2b8ced" : "#022b53ff",
                cursor: formFieldsValid ? "pointer" : "default"
            }}
        >
            { !formFieldsValid
                ? "Fill Out Form"
                : loading
                ? "Loading..."
                : {submitMsg}
            }
        </button>
    );
};