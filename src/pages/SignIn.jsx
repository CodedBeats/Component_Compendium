// dependencies
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// auth hooks
import { useMagicLink } from "../auth/hooks/useMagicLink"
import { usePasswordAuth } from "../auth/hooks/usePasswordAuth"
import { useAuthRedirect } from "../auth/hooks/useAuthRedirect"
// components
import { WebsiteTitle } from "../components/nav/WebsiteTitle"
import { AuthFormInput, AuthFormPasswordInput } from "../components/form-elements/Inputs"
import { FormSubmitBtn } from "../components/buttons/FormSubmitBtn"
// utils
import { 
    validatePassword, 
    validateEmail
} from "../utils/stringManipulation"
// style
import styles from "./css/SignIn.module.css"
// assets
import CodeBlock from "../assets/code-blocks/CodeBlock1.png"
// icons
import { PasswordLockIcon, EmailTickIcon, GithubIcon } from "../utils/iconHandler"



const SignIn = () => {
    // navigate
    const navigate = useNavigate()
    // auth hooks
    const { error: magicLinkError, magicLinkEmailSent, verifying, sendMagicLink, verifyMagicLink } = useMagicLink()
    const { signInWithPassword, error: passwordError, success: passwordSuccess } = usePasswordAuth()
    // form stuff
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordInputVisible, setPassowordInputVisible] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)
    const [formFieldsValid, setFormFieldsValid] = useState(false)
    const [selectedLoginType, setSelectedLoginType] = useState({
        emailLink: false,
        password: true,
        github: false
    })
    // loading state
    const [loading, setLoading] = useState(false)
    // error state stuff
    const [formError, setFormError] = useState("")

    // redirect to dashboard when sign in successful (and user becomes authenticated)
    useAuthRedirect({
        whenAuthenticated: "/",
    })

    useEffect(() => {
        verifyMagicLink()
    }, [])


    // handle update form data 
    const updateFormData = (field, value) => {
        // update formData
        const newData = { ...formData, [field]: value }
        setFormData(newData)

        // make validation checks against newData
        const emailIsValid = validateEmail(newData.email)
        const { passwordError, passwordIsValid } = validatePassword(newData.password)
        
        // base check all fields valid
        let allValid = emailIsValid 

        if (selectedLoginType.password) {
            // check password if login type asociated
            allValid = allValid && passwordIsValid
            // set error
            if (!emailIsValid) setFormError("Email is invalid")
            else if (!passwordIsValid) setFormError(passwordError)
            else setFormError("")

        } else {
            // set error
            if (!emailIsValid) setFormError("Email is invalid")
            else setFormError("")
        }
        // update state
        setFormFieldsValid(allValid)
    }


    // handle login type select
    const handleSelectLoginType = (type) => {
        // only show password field for asociated login type
        if (type === "password") {
            setPassowordInputVisible(true)
        } else {
            setPassowordInputVisible(false)
        }

        // set state: each line is evaluated if type matches setting true and false
        setSelectedLoginType({
            emailLink: type === "emailLink",
            password: type === "password",
            github: type === "github"
        })

        // reset form error
        setFormError("")
    }

    // handle login for selected type
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        // handle selected
        if (selectedLoginType.emailLink) {
            // email link login
            await sendMagicLink(formData.email)
            setLoading(false)

        } else if (selectedLoginType.github) {
            // github login
            console.log("github login")
            setLoading(false)

        } else if (selectedLoginType.password) {
            // email and password login
            await signInWithPassword(formData.email, formData.password)
            setLoading(false)
            if (passwordSuccess) console.log("password login successful...now what?")
        }
    }


    return (
        <div className={styles.pageContainer}>
            {/* sign in content + form container */}
            <div className={styles.contentContainer}>
                {/* website title */}
                <div className={styles.websiteTitleContainer}>
                    <WebsiteTitle />
                </div>

                {/* block container */}
                <div className={styles.blockContainer}>
                    <h1 className={styles.welcomeBack}>Welcome Back</h1>
                    <p className={styles.formInstructions}>
                        Enter your details to access your component library.
                    </p>

                    {/* form container */}
                    <form 
                        className={styles.formContainer}
                        onSubmit={handleSubmit}
                    >
                        <AuthFormInput 
                            label={"Email"}
                            type={"email"}
                            placeholder={"name@example.com"}
                            value={formData.email}
                            onChange={(val) => updateFormData("email", val)}
                        />
                        {/* only show passowrd input for asociated login type */}
                        {passwordInputVisible && (
                            <AuthFormPasswordInput 
                                label={"Password"}
                                placeholder={"Enter your password"}
                                isHidden={passwordVisible}
                                value={formData.password}
                                onChange={(val) => updateFormData("password", val)}
                                onToggleHidden={() => setPasswordVisible(v => !v)}
                            />
                        )}

                        {/* remember me and forgot password */}
                        <div className={styles.extra}>
                            <div className={styles.rememberMeContainer}>
                                <input 
                                    className={styles.rememberMeCheckbox}
                                    type="checkbox" 
                                    checked={rememberMe} 
                                    onChange={() => setRememberMe(c => !c)} 
                                />
                                <button 
                                    type="button"
                                    className={styles.rememberMeText}
                                    onClick={() => setRememberMe(c => !c)}
                                >Remember me</button>
                            </div>
                            <button 
                                type="button" 
                                className={styles.forgotPasswordBtn}
                                onClick={() => console.log("implement forgot password")}
                            >Forgot password?</button>
                        </div>
                        <FormSubmitBtn 
                            loading={loading} 
                            formFieldsValid={formFieldsValid} 
                            submitMsg={"Sign In"}
                        />
                    </form>
                    {/* form fields error */}
                    <div className={styles.formError}>
                        { formError !== "" ? formError : "" }
                    </div>
                    <div className={styles.formSubmissionResponse}>
                        { verifying ? "Email Sent" : "" }
                    </div>
                    
                    <div className={styles.divider}>
                        <span>Or contine with</span>
                    </div>

                    {/* login options */}
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
                        {/* email link */}
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.emailLink ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("emailLink")}
                        >
                            <EmailTickIcon className={styles.loginOptionIcon} />
                            <p className={styles.loginOptionText}>Email Link</p>
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

                    {/* sign in error (or tell you to check your email */}
                    <div className={styles.loginError}>
                        {magicLinkEmailSent && <p>Check your email!</p>}
                        {magicLinkError && <p>Magic Link Login Failed: {magicLinkError}</p>}
                        {passwordError && <p>Email-Password Login Failed: {passwordError}</p>}
                    </div>

                    {/* don't have an account */}
                    <div className={styles.signUpLinkContainer}>
                        <p className={styles.signUpLinkText}>Don't have an account?</p>
                        <button
                            type="button"
                            className={styles.signUpLink}
                            onClick={() => navigate("/sign-up")}
                        >
                            Sign up for free
                        </button>
                    </div>
                </div>
            </div>

            {/* code block art container */}
            <div className={styles.artContainer}>
                <div className={styles.gradientContainer}>
                    <div className={styles.blueGradient}></div>
                    <div className={styles.pinkGradient}></div>
                </div>
                <div className={styles.artBlockOverlay}>
                    <img 
                        className={styles.artBlock}
                        src={CodeBlock} 
                        alt="code-block"
                    />
                    <p className={styles.previewTitle}>Preview Live Code</p>
                    <p className={styles.previewText}>Instant rendering for React, Tailwind, HTML&CSS</p>
                </div>
            </div>
            
        </div>
    );
}

export default SignIn
