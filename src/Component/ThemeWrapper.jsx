import { useContext } from "react";

const ThemeContext = React.createContext();

export function useDarkTheme (){
    return useContext(ThemeContext)
}



export default ThemeContext;