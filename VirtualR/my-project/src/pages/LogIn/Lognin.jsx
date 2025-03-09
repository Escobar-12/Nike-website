import { useState } from "react";
import SignIn from "./SingIn.jsx";
import SignUp from "./SingUp.jsx";

function LogIn() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <section className="flex flex-col justify-center items-center h-screen">
            {isSignIn ? <SignIn func={toggleForm} /> : <SignUp func={toggleForm} />}
        </section>
    );
}

export default LogIn;
