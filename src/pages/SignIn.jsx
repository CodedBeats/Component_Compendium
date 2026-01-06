// dependencies
import { useState, useEffect } from "react"
// auth hooks
import { useAuth } from "../auth/hooks/useAuth"
import { useMagicLink } from "../auth/hooks/useMagicLink"
// components
import { WebsiteTitle } from "../components/titles/WebsiteTitle"
import { AuthFormInput, AuthFormPasswordInput } from "../components/form-elements/Inputs"
// style
import styles from "./css/SignIn.module.css"


const SignIn = () => {
    // hooks
    const { session, user, handleLogout } = useAuth()
    const { error, magicLinkEmailSent, verifying, sendMagicLink, verifyMagicLink } = useMagicLink()
    // form stuff
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordInputVisible, setPassowordStateVisible] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)
    const [selectedLoginType, setSelectedLoginType] = useState({
        emailLink: false,
        password: true,
        github: false
    })
    // loading state
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        verifyMagicLink()
    }, [])


    // idk
    if (verifying) return <p>Verifying your link...</p>
    if (user) {
        return (
            <div>
                <h1>Welcome!</h1> 
                <p>You are logged in as: {session.user.email}</p> 
                <button onClick={handleLogout}> Sign Out </button>
            </div>
        )
    }

    // handle login type select
    const handleSelectLoginType = (type) => {
        // handle github login
        //

        // only show password field for asociated login type
        if (type === "password") {
            setPassowordStateVisible(true)
        } else {
            setPassowordStateVisible(false)
        }

        // set state: each line is evaluated if type matches setting true and false
        setSelectedLoginType({
            emailLink: type === "emailLink",
            password: type === "password",
            github: type === "github"
        })
    }

    // handle login for selected type
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        // handle selected
        if (selectedLoginType === "magic-link") {
            await sendMagicLink(email)
            setLoading(false)

        } else if (selectedLoginType === "github") {
            // do github login
            console.log("github login")
            setLoading(false)

        } else if (selectedLoginType === "email-password") {
            // do email and password login
            console.log("email and password login")
            setLoading(false)
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
                            value={email}
                            onChange={(val) => setEmail(val)}
                        />
                        {/* only show passowrd input for asociated login type */}
                        {passwordInputVisible && (
                            <AuthFormPasswordInput 
                                label={"Password"}
                                placeholder={"Enter your password"}
                                isHidden={passwordVisible}
                                value={password}
                                onChange={(val) => setPassword(val)}
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
                        <button 
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </button>
                    </form>

                    <p className={styles.loginOptionsBreak}>Or contine with</p>

                    <div className={styles.loginOptionsContainer}>
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.password ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("password")}
                        >
                            Password
                        </button>
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.emailLink ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("emailLink")}
                        >
                            Email Link
                        </button>
                        <button 
                            className={styles.loginOption}
                            style={{
                                border: selectedLoginType.github ? "2px solid #4f6c89ff" : "2px solid #283d52"
                            }}
                            onClick={() => handleSelectLoginType("github")}
                        >
                            Github
                        </button>
                    </div>

                    {/* idk, //TODO fix later */}
                    <div>
                        {magicLinkEmailSent && <p>Check your email!</p>}
                        {error && <p>Login Failed: {error}</p>}
                    </div>

                    {/* don't have an account */}
                    <div className={styles.signUpLinkContainer}>
                        <p className={styles.signUpLinkText}>Don't have an account?</p>
                        <button
                            type="button"
                            className={styles.signUpLink}
                            onClick={() => console.log("link to sign up page")}
                        >Sign up for free</button>
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
                    <div className={styles.artBlockContainer}>
                        <img 
                            className={styles.artBlock}
                            src="https://cdn-icons-png.flaticon.com/512/1049/1049443.png" 
                            alt="code-block"
                        />
                    </div>
                    <p className={styles.previewTitle}>Preview Live Code</p>
                    <p className={styles.previewText}>Instant rendering for React, Tailwind, HTML&CSS</p>
                </div>
            </div>
            
        </div>
    );
}

export default SignIn