import React, { useState, useEffect, useCallback } from 'react'

let logoutTimer

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
})

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingDuration = calcRemainingTime(storedExpirationDate)

    if(remainingDuration <= 60000) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }

    return {
        token: storedToken,
        duration: remainingDuration
    }

}

const calcRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adjExpirationDate = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationDate - currentTime

    return remainingDuration
}

export const AuthContextProvider = ({ children }) => {
    const tokenData = retrieveStoredToken()
    let initialToken

    if(tokenData) initialToken = tokenData.token

    const [token, setToken] = useState(initialToken)

    // '!!' converts truthy or falsy values to actual booleans
    const isLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        setToken(null)

        if(logoutTimer) clearTimeout(logoutTimer)
    }, [])

    const loginHandler = (token, expirationTime) => {
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime)
        setToken(token)

        const remainingTime = calcRemainingTime(expirationTime)

        logoutTimer = setTimeout(loginHandler, remainingTime)
    }

    useEffect(() => {
        if(!tokenData) return

        logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }, [tokenData, logoutHandler])

    const contextValue = {
        token,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}> 
            { children } 
        </AuthContext.Provider>
    )
} 

export default AuthContext