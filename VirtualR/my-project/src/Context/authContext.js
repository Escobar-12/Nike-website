import React, { useContext , useState} from 'react'


const AuthContext = React.createContext();

export const AuthProvider = ({children}) =>
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
{
    useContext(AuthContext);
}
