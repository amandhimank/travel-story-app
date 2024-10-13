import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API_URL } from "./constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const login = async (email, password, setError) => {
        // LOGIN API CALL
        try {
            const response = await axios.post(API_URL + "/user/login", { 
                email, password
            }, { withCredentials: true });

            // handle successful login response
            if (response.data && response.data.token) {
                setIsAuthenticated(true);
            }
        }
        catch(error) {
            console.log(error);
            setIsAuthenticated(false); 
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    const signup = async (name, email, password, setError) => {
        // LOGIN API CALL
        try {
            const response = await axios.post(API_URL + "/user/create-account", { 
                "fullname": name, 
                email, 
                password 
            }, { withCredentials: true });

            // handle successful signup response
            if (response.data && response.data.token) {
                setIsAuthenticated(true);
            }
        }
        catch(error) {
            console.log(error);
            setIsAuthenticated(false);
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
            }
            else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    const logout = async () => {
        const response = await axios.get(API_URL + "/user/logout", { withCredentials: true });
        console.log(response);
        if(response && response.data.success) {
            setIsAuthenticated(false);
        }
    }

    const checkAuth = async () => {
        try {
            const response = await axios.get(API_URL + "/user/check-auth", { withCredentials: true });
            setIsAuthenticated(true);       
        }
        catch (err) {
            setIsAuthenticated(false);
        }
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, signup, logout, checkAuth } }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)