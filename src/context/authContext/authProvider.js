import React, { createContext, useReducer, useContext, useEffect } from "react";
import authReducer from "./authReducer";
// create the initial state for auth context
const initialState = {
    user: null,
    token:null
};

// create the context for the state and the dispatch
export const AuthContext = createContext(initialState);

// create the provider component that will hold the state and dispatch
export const AuthApiProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = JSON.parse(localStorage.getItem("token"))
  
    useEffect(() => {
        dispatch({ type: "LOAD_USER_SUCCESS", payload: {user,token}});
    }, [])

    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// create a custom hook to access the state and dispatch
export const useAuthApi = () => useContext(AuthContext);