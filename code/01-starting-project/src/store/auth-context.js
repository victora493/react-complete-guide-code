import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    // '!!' converts truthy or falsy values to actual booleans
    const isLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    }

    const logoutHandler = () => {
        setToken(null)
    }

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