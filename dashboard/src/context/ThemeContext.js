import { createContext, useReducer } from "react"
import themeReducer from "./ThemeReducer";

const INITIAL_STATE = {
    darkMode: false
}

export const ThemeContext = createContext(INITIAL_STATE);
export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);
    
    return (
        <ThemeContext.Provider value={{darkMode: state.darkMode, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}