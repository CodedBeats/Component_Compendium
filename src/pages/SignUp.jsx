// dependencies
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// supabase client
import { createClient } from "../api/supabase/client"
// supabase db api 
import { createUserRow } from "../api/supabase/user"
// hooks
import { useAuthRedirect } from "../auth/hooks/useAuthRedirect"
// components
import { WebsiteTitle } from "../components/titles/WebsiteTitle"
import { AuthFormInput, AuthFormPasswordInput } from "../components/form-elements/Inputs"
// utils
import { 
    validatePassword, 
    validateEmail, 
    validateNonEmptyString, 
    removeBlankHeadAndTail, 
    checkStringsMatch 
} from "../utils/stringManipulation"
// style
import styles from "./css/SignUp.module.css"
// assets
import CodeBlock from "../assets/code-blocks/CodeBlock2.png"
// icons
import { PasswordLockIcon, EmailTickIcon, GithubIcon } from "../utils/iconHandler"



const SignUp = () => {
    // supabase
    const supabase = createClient()
    // navigate
    const navigate = useNavigate()
    // auth hooks
    // const { signUpWithPassword, error: passwordError, success: passwordSuccess } = usePasswordAuth()
    // form stuff
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordInputVisible, setPassowordStateVisible] = useState(true)
    const [formFieldsValid, setFormFieldsValid] = useState(false)
    const [selectedLoginType, setSelectedLoginType] = useState({
        password: true,
        github: false
    })
    // loading state
    const [loading, setLoading] = useState(false)
    // error state stuff
    const [formError, setFormError] = useState("")

    
    // redirect when sign in successful (and user becomes authenticated)
    useAuthRedirect({
        whenAuthenticated: "/dashboard",
    })


    // handle update form data 
    const updateFormData = (field, value) => {
        // update formData
        const newData = { ...formData, [field]: value }
        setFormData(newData)

        // make validation checks against newData
        const validUsername = validateNonEmptyString(newData.username)
        const emailIsValid = validateEmail(newData.email)
        const { passwordError, passwordIsValid } = validatePassword(newData.password)
        const passwordMatch = checkStringsMatch(newData.password, newData.confirmPassword)

        // check all fields valid
        const allValid = 
            validUsername && 
            emailIsValid &&
            passwordIsValid &&
            passwordMatch


        if (!validUsername) setFormError("Username can't be empty")
        else if (!emailIsValid) setFormError("Email is invalid")
        else if (!passwordIsValid) setFormError(passwordError)
        else if (!passwordMatch) setFormError("Passwords don't match")
        else setFormError("")

        // update state
        setFormFieldsValid(allValid)
    }


    // handle sign up type select
    const handleSelectLoginType = (type) => {
        // only show password field for asociated login type
        if (type === "password") {
            setPassowordStateVisible(true)
        } else {
            setPassowordStateVisible(false)
        }

        // set state: each line is evaluated if type matches setting true and false
        setSelectedLoginType({
            password: type === "password",
            github: type === "github"
        })
    }


    // handle sign up for selected type
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        // init iminant succes and auth user id
        let ok = false
        let authUserId = null
                
        // sign up with selected option
        if (selectedLoginType.github) {
            // github sign up
            console.log("github login")

        } else if (selectedLoginType.password) {
            // email and password sign up
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password
            })

            if (!error) {
                ok = true
                // newly created auth user ID
                authUserId = data.user?.id
            }
        }

        // insert (sign up with password) user row
        if (ok && authUserId && selectedLoginType.password) {
            const newUserData = {
                username: removeBlankHeadAndTail(formData.username),
                email: formData.email
            }

            const { data, error } = await createUserRow({
                ...newUserData,
                authUserId
            })

            if (!error) {
                console.log("User row created:", data)
            }
        }

        // loading done
        setLoading(false)
    }


    return (
        <div className={styles.pageContainer}>
            {/* code block art container */}
            <div className={styles.artContainer}>
                <div className={styles.gradientContainer}>
                    <div className={styles.blueGradient}></div>
                    <div className={styles.pinkGradient}></div>
                </div>
                <div className={styles.artBlockOverlay}>
                    <div className={styles.artBlockContainer}>
                        <img 
                            className={styles.artBlock}
                            src={CodeBlock} 
                            alt="code-block"
                        />
                        <div className={styles.codeBtnContainer}>
                            <button className={styles.coolBtn}>
                                Launch
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* sign in content + form container */}
            <div className={styles.contentContainer}>
                {/* website title */}
                <div className={styles.websiteTitleContainer}>
                    <WebsiteTitle />
                </div>

                {/* block container */}
                <div className={styles.blockContainer}>
                    <h1 className={styles.welcomeBack}>Start Building</h1>
                    <p className={styles.formInstructions}>
                        Join developers curating the best of the frontend.
                    </p>

                    {/* form container */}
                    <form 
                        className={styles.formContainer}
                        onSubmit={handleSubmit}
                    >
                        <AuthFormInput 
                            label={"Username"}
                            type={"text"}
                            placeholder={"Anonymouse"}
                            value={formData.username}
                            onChange={(val) => updateFormData("username", val)}
                        />
                        <AuthFormInput 
                            label={"Email"}
                            type={"email"}
                            placeholder={"name@example.com"}
                            value={formData.email}
                            onChange={(val) => updateFormData("email", val)}
                        />
                        {/* only show passowrd input for asociated login type */}
                        {passwordInputVisible && (
                            <>
                            <AuthFormPasswordInput 
                                label={"Password"}
                                placeholder={"Enter your password"}
                                isHidden={passwordVisible}
                                value={formData.password}
                                onChange={(val) => updateFormData("password", val)}
                                onToggleHidden={() => setPasswordVisible(v => !v)}
                            />
                            <AuthFormPasswordInput 
                                label={"Confirm Password"}
                                placeholder={"e.g. •••••••••"}
                                isHidden={passwordVisible}
                                value={formData.confirmPassword}
                                onChange={(val) => updateFormData("confirmPassword", val)}
                                onToggleHidden={() => setPasswordVisible(v => !v)}
                            />
                            </>
                        )}

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
                                : "Create Account"
                            }
                        </button>
                    </form>
                    {/* form fields error */}
                    <div className={styles.formError}>
                        { formError !== "" ? formError : "" }
                    </div>

                    <div className={styles.divider}>
                        <span>Or contine with</span>
                    </div>

                    {/* sign up options */}
                    <div className={styles.loginOptionsContainer}>
                        {/* password */}
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.password ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("password")}
                        >
                            <PasswordLockIcon className={styles.loginOptionIcon} />
                            <p className={styles.loginOptionText}>Password</p>
                        </button>
                        {/* github */}
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.github ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("github")}
                        >
                            <GithubIcon className={styles.loginOptionIcon} />
                            <p className={styles.loginOptionText}>Github</p>
                        </button>
                    </div>

                    {/* don't have an account */}
                    <div className={styles.signUpLinkContainer}>
                        <p className={styles.signUpLinkText}>Already have an account?</p>
                        <button
                            type="button"
                            className={styles.signUpLink}
                            onClick={() => navigate("/sign-in")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp
