import useUserPreferences from "../hooks/useUserPreferences"
import { PreferencesContext } from "./preferencesContext";

const PreferencesProvider = ({ children }) =>{
    const preferencesState = useUserPreferences();

    return(
        <PreferencesContext.Provider value={preferencesState}>
            {children}
        </PreferencesContext.Provider>
    );
};

export default PreferencesProvider;