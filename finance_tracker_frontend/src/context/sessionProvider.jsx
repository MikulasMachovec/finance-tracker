import { createContext, useContext, useEffect, useState} from 'react'
import { loginRequest, registerRequest } from '../api/authApi';
import { getToken, removeToken, setToken } from '../utils/tokenStorage';
import { getCurrentUser } from '../api/userApi';

const SessionContext = createContext({
    session: 
    {user: null, status: 'loading'}, 
    login: async () => {},
    logout: () => {},
    register: async () => {},
    refreshSession: async () => {}
    
});

export function useSession() {
    return useContext(SessionContext);
}

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState({ 
        user: null, 
        status: 'loading'
    })

    const refreshSession = async () => {
        const token = getToken();

            if(!token){
                setSession({
                    user: null,
                    status: "unauthenticated",
                });
                return false;
            }

            try {
                const user = await getCurrentUser();
                
                setSession({
                    user,
                    status:"authenticated"
                });

                return true;
                
            } catch (error) {
                removeToken();

                setSession({
                    user: null,
                    status: "unauthenticated",
                });

                return false;
            }
        };
    

    const login = async (data) =>{
        const result = await loginRequest(data)

        setToken(result.accessToken)

        await refreshSession();         

        return result
    };

    const logout = () => {
        removeToken();
        setSession({
            user: null,
            status: "unauthenticated",
          });
    };

    const register = async (data) => {
        return await registerRequest(data);
    }

    useEffect(() => {
        refreshSession();
    }, []);

    return(
        <SessionContext.Provider
            value={{
                session,
                login,
                logout,
                refreshSession,
                register
            }}
        >
            {children}
        </SessionContext.Provider>
    )

}


