import { useContext, useState } from "react";
import { createContext } from "react";
import SignIn from "./SingIn.jsx";
import SignUp from "./SingUp.jsx";

const registerContext = createContext();
function LogIn() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <registerContext.Provider value={{toggleForm}}>
            <section className="flex flex-col justify-center items-center h-screen">
                {isSignIn ? <SignIn func={toggleForm} reSetter={setIsSignIn}/> : <SignUp func={toggleForm} reSetter={setIsSignIn}/>}
            </section>
        </registerContext.Provider>
    );
}
export const useRegister = () => {
    const context = useContext(registerContext);
    return context;
}
export default LogIn;
