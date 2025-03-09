import { useEffect, useState } from "react";
import {headerLogo} from "../assets/images"
import {navLinks} from "./constants/index"
import { Menu, X } from "lucide-react";
import useButtonHoverEffect from "./components/ButtonHoverjs";
import { Link } from "react-router-dom";

function NavigationBar()
{
    const [mobileStackOpen,setMobileStackOpen] = useState(false);

    const toggleNavBar = () =>
    {
        setMobileStackOpen(!mobileStackOpen);
    }

    const checkToggle = (e)=>
    {
        const area = document.querySelector(".mobNavBar");
        if(area && !area.contains(e.target))setMobileStackOpen(false);
    }
    useEffect(()=>
    {
        if(mobileStackOpen) document.addEventListener("mousedown",checkToggle);
        else
        {
            document.removeEventListener("mousedown",checkToggle);
        }
    },[mobileStackOpen])
    
    useButtonHoverEffect();


    return(
        <nav className="px-10 py-4 sticky z-20 w-full max-w-[1440px] m-auto">
            <div className="flex justify-between items-center">
                <a href="#">
                    <img src={headerLogo} alt="NikeLogo" className="h-[30px] w-[140]"/>
                </a>
                <div>
                    <ul className=" hidden lg:flex justify-center items-center gap-5 ">
                        {navLinks.map((link,index)=>(
                            <li key={index} className="text-lg text-gray-500 leading-normal hover:text-[#f25a49]">
                                <a
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const targetSec = document.querySelector(link.href);
                                    targetSec?.scrollIntoView({ behavior: "smooth" });
                                }}>
                                {link.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:flex justify-center items-center gap-2 text-lg text-slate-200 ">
                    <Link to={"/login"} className="thisButton pButton font-bold px-2 py-1 m-1 bg-[#f25a49] rounded "><span className="relative z-10">Sign in</span></Link>
                    <a href="#home" className="thisButton sButton font-bold px-2 py-1 m-1 text-[#f25a49] rounded border-2"><span className="relative z-10">Explore now</span></a>
                </div>
                <div className="lg:hidden md:flex">
                    <button onClick={toggleNavBar}>
                        {mobileStackOpen ? <X/>:<Menu/>}
                    </button>
                </div>

                
                    {mobileStackOpen && (
                    <div className="mobNavBar absolute top-full left-0 lg:hidden pt-10 pb-5 w-full right-0 bg-neutral-900 flex flex-col justify-center items-center">
                            <ul className="space-y-5 text-center">
                            {navLinks.map((link,index)=>(
                                <li key={index} onClick={toggleNavBar} className=" text-lg text-slate-200 leading-normal hover:text-[#f25a49]">
                                    <a className="cursor-pointer" onClick={(e)=>{
                                        e.preventDefault();
                                        const targetSec = document.getElementById(link.href.replace("#",""));
                                        targetSec?.scrollIntoView({behavior:"smooth"})
                                    }} 
                                    >{link.label}</a>
                                </li>
                            ))}
                            </ul>
                            <div className="flex my-5 justify-center items-center gap-2 text-lg text-slate-200 ">
                                <Link to={"/login"} className="thisButton pButton font-bold px-2 py-1 m-1 bg-[#f25a49] rounded "><span className="relative z-10">Sign in</span></Link>
                                <a href="#home" className="thisButton sButton font-bold px-2 py-1 m-1 text-[#f25a49] rounded border-2"><span className="relative z-10">Explore now</span></a>
                            </div>
                    </div>
                    
                    )}
            </div>
        </nav>
    );
}
export default NavigationBar;