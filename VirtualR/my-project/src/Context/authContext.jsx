import { createContext, useContext , useState, useEffect} from 'react'


const AuthContext = createContext();

export const AuthProvider = ({children}) => 
{
    const [isLoggedIn, setIsLoggedIn] = useState(()=>
    {
        return localStorage.getItem("isLoggedIn")==="true" ;
    });
    
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const login = () =>
        {
            console.log("logged in");
            setIsLoggedIn(true);
        }
    const logout = async () => {
        console.log("logged out");
        try {
            const res = await fetch("http://localhost:5000/logout");
            if (!res.ok) {
                console.log("Error logging out");
            } else {
                console.log("Successfully logged out");
            }
        } catch (err) {
            console.log("Logout error:", err);
        }
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
            {children};
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
