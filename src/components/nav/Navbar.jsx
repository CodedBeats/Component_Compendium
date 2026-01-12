// dependencies
import { useState } from "react"
// icons
import { ComponentIcon, LogoutIcon } from "../../utils/iconHandler.js"
// auth context
import { useAuth } from "../../auth/hooks/useAuth.js"
// assets
import femaleAvatar from "../../assets/avatar/female_avatar.png"
// style
import styles from "./css/Navbar.module.css"


export const Navbar = () => {
    // auth
    const { userProfile, signOut } = useAuth()
    // dropdown state
    const [isOpen, setIsOpen] = useState(false)


    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className={styles.navbarContainer}>
            {/* website logo, title and version */}
            <div className={styles.homeContainer}>
                <div className={styles.logoContainer}>
                    <ComponentIcon className={styles.websiteIcon} />
                </div>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>Component Compendium</div>
                    <div className={styles.version}><span className={styles.versionLetter}>v</span>0.1.0</div>
                </div>
            </div>

            {/* search your components */}
            <div className={styles.searchContainer}>
                Search box go brrrrrrrrrrrrrrrrrrr
            </div>

            {/* user img, name, dropdown settings */}
            <div className={styles.userContainer}>
                <div className={styles.username}>{userProfile?.username}</div>

                {/* avatar img and dropdown */}
                <div className={styles.dropdownAndBtnContainer}>
                    <button 
                        className={styles.dropdownBtn}
                        onClick={toggleDropdown}
                    >
                        <img className={styles.avatarImg} src={femaleAvatar} alt="female_avatar" />
                        <svg className={styles.downArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    { isOpen && (
                        <div className={styles.dropdownContainer}>
                            <button 
                                className={styles.signOutBtn}
                                onClick={signOut}
                            >
                                Sign Out
                                <LogoutIcon className={styles.signOutIcon} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

