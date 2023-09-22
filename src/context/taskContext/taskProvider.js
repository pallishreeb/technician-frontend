import React, { createContext, useReducer, useContext } from "react";
import taskReducer from "./taskReducer";
const initialState = {
    tasks: [],
    duplicateTasks: [],
    technicians: [],
    apartments: [],
};
export const TaskContext = createContext(initialState);

export const TaskApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

// create a custom hook to access the state and dispatch
export const useTaskApi = () => useContext(TaskContext);