import { useRef, useEffect, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useButtonHoverEffect from "../../components/ButtonHoverjs";
import ButtonCustom  from "../../components/CustomButton";


import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Signup({func})
{
    useButtonHoverEffect();

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState();
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

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
    // Validate Pwd
    useEffect(()=>
    {
        const res = PWD_REGEX.test(pwd);
        console.log(res);
        console.log(pwd);
        setValidPwd(res);
        setValidMatch(pwd === matchPwd);
    },[pwd,matchPwd])

    useEffect(()=>
    {
        setErr('');
    },[user,pwd,matchPwd]); 

    const handleRegister = async (e)=>
    {
        e.preventDefault();
        // recheck submission 
        if( !USER_REGEX.test(user) || !PWD_REGEX.test(pwd) || !setValidMatch)
        {
            setErr("Invalid username or password.");
            return;
        }
        try{
            const res = await fetch('http://localhost:4000/singup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: user,
                    password: pwd
                })
            });

            if(!res.ok)
            {
                throw new Error("Login failed. Please check your credentials.");
            }

            setSuccess(true);
            setErr("");
        } catch (error) {
            setErr(error.message);
        }
    }

    return(
        <section className="flex justify-center items-center min-h-screen text-white">
            <div className="flex flex-col bg-neutral-800 shadow-lg sm:w-[60vw] w-full max-w-md border p-6 rounded-xl gap-6">
                {err && ( <p ref={errRef}  aria-live="assertive">
                    {err}
                </p>)}
                <h1 className="font-semibold text-3xl text-center ">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
                        className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 chars. <br/>
                        Must include upper and lower case letters, numbers and special symbols ! @ # $ %<br/>
                    </p>

                    <label htmlFor="confirm_pwd">Confirm Password:
                        <span className={validMatch && matchPwd ?  "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                        
                        <input type="password" className="w-full p-3 rounded-md border-2 bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#f77162]"
                        id="confirm_pwd" 
                        onChange={(e)=>setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false":"true"}
                        aria-describedby="confirmnote"
                        onFocus={()=>setMatchFocus(true)} 
                        onBlur={()=>setMatchFocus(false)}
                    />
                    </label>
                    
                    <p id="confirmnote"
                        className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Must match the first password input field.
                    </p>

                    <ButtonCustom label='Sing Up' textCenter={true} large={true} bold={true}/>
                    

                </form>

                <p className="text-center text-gray-400"> Already have an account? <br />
                    <span className="line">
                        
                        <Link className="text-[#f77162] hover:underline" onClick={func}> Sing In </Link>
                        
                    </span>
                </p>
            </div>
        </section>
    );
}
export default Signup;