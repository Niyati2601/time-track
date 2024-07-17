import { createContext, useEffect, useReducer } from "react";
import themeReducer from "./ThemeReducer";

const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const ThemeContext = createContext(INITIAL_STATE);

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
