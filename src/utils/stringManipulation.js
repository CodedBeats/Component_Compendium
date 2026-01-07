/**
 * validate password is viable
 * @param {string} password - input password string
 * @returns {{errorType: string, isValid: boolean}} object containing error type and if password is viable
 */
export const validatePassword = (password) => {
    let passwordError = null
    let passwordIsValid = false
    
    // regex
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^\w\s]/.test(password);

    // password must be at least 6 chars
    if (password.length < 6) passwordError = "Password must be at least 6 characters"
    // password can't contain spaces
    else if (password.includes(" ")) passwordError = "Password can't include spaces"
    // password includes a number
    else if (!hasNumber) passwordError = "Password must include an number"
    // password includes a special character
    else if (!hasSpecial) passwordError = "Password must include a special character"
    // passed all checks
    else passwordIsValid = true

    return { passwordError, passwordIsValid }
}


/**
 * validate email
 * @param {string} email - input email string
 * @returns {boolean} whether it's valid' or not
 */
export const validateEmail = (email) => {
    // from geeksforgeeks, no idea for the specifics
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
}


/**
 * validate field isn't empty
 * @param {string} input - input string
 * @returns {boolean} whether it's valid' or not
 */
export const validateNonEmptyString = (input) => {
    const valid = input.trim() === "" ? false : true
    return valid
}


// cleanup input text (remove empty space)
/**
 * remove start and end blank spaces from string
 * @param {string} input - input string
 * @returns {string} cleaned up string
 */
export const removeBlankHeadAndTail = (input) => {
    return input.trim()
}


// validate 2 strings match
/**
 * check if input2 matches against input1
 * @param {string} input1 - input password string
 * @param {string} input2 - input password string
 * @returns {boolean} whether it matches or not
 */
export const checkStringsMatch = (input1, input2) => {
    let doesMatch = false
    input1 === input2 ? doesMatch = true : doesMatch = false 
    return doesMatch
}
