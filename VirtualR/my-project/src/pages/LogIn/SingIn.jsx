import { useRef, useEffect, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useButtonHoverEffect from "../../components/ButtonHoverjs";
import ButtonCustom  from "../../components/CustomButton";

import { useAuth } from "../../Context/authContext";

import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Signin({ func })
{
    useButtonHoverEffect();

    const { login } = useAuth();

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [err,setErr] = useState('');
    const [success, setSuccess] = useState(false);

    // Focus on the username input at beg 
    useEffect(()=>
    {
        userRef.current.focus();
    },[]);
    // Validate username
    useEffect(()=>
    {
        const res = USER_REGEX.test(user);
        setValidName(res);
    },[user])
    useEffect(()=>
        {
            const res = PWD_REGEX.test(pwd);
            setValidPwd(res);
        },[pwd])


    useEffect(()=>
    {
        setErr('');
    },[user,pwd]); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
            setErr("Invalid username or password format.");
            return;
        }
    
        try {
            const res = await fetch('http://localhost:5000/login/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: user,
                    password: pwd
                })
            });
    
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message);
            }

            const data = await res.json(); 
            setSuccess(true);
            login();
            setErr("");

            navigate('/');

        } catch (error) {
            setErr(error.message);
        }
    };
    

    return(
        <section className="flex justify-center items-center min-h-screen text-white">
            <div className="flex flex-col bg-neutral-800 shadow-lg w-full max-w-md max-sm:max-w-[60vw]  border p-6 rounded-xl gap-6">
                {err && ( <p ref={errRef}  aria-live="assertive" className="text-red-500 text-center">
                    {err}
                </p>)}
                <h1 className="font-semibold text-3xl text-center ">Log In</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label htmlFor="username" className="text-sm font-medium">Username:
                        <span className={user && validName  ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validName || !user ? "hide" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                        <input type="text" className="w-full p-3 rounded-md border-2 bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#f77162]"
                        id="username" 
                        ref={userRef}
                        autoComplete="off" 
                        onChange={(e)=>setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false":"true"}
                        aria-describedby="uidnote"
                        onFocus={()=>setUserFocus(true)} 
                        onBlur={()=>setUserFocus(false)}
                    />
                    </label>
                    
                    <p id="uidnote"
                        className={` text-xs text-gray-400 ${userFocus && user && !validName ? "instructions" : "offscreen"}`}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 23 chars. <br/>
                        Must begin with a letter. <br/>
                        Letters, numbers, underscores, hyphens allo
                        wed  
                    </p>

                    
                    <label htmlFor="password" className="text-sm font-medium">Password:
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validPwd || !pwd ? "hide" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                        <input type="password" className="w-full p-3 rounded-md border-2 bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#f77162]"
                        id="password" 
                        onChange={(e)=>setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false":"true"}
                        aria-describedby="pwdnote"
                        onFocus={()=>setPwdFocus(true)} 
                        onBlur={()=>setPwdFocus(false)}
                    />
                    </label>
                    
                    <p id="pwdnote"
                        className={` text-lg text-gray-400 ${pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}`}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 chars. <br/>
                        Must include upper and lower case letters, numbers and special symbols ! @ # $ %<br/>
                    </p>

                    <ButtonCustom label='Log In' textCenter={true} large={true} bold={true} onClick={handleLogin}/>
                    

                </form>

                <p className="text-center text-gray-400"> Don't have an account? <br />
                    <span className="line">
                        
                        <Link onClick={func} className="text-[#f77162] hover:underline"> Register </Link>
                        
                    </span>
                </p>
            </div>
        </section>
    );
}
export default Signin;