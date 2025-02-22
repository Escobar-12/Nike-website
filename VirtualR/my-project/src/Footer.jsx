import { footerLogo } from "../assets/images";
import {socialMedia } from "./constants"
import { footerLinks } from "./constants";


const Footer = ()=>
{
    return (
        <footer id="footer" className="w-full mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 bg-black min-h-screen">
            <div className="flex max-w-[1440px] mx-auto flex-col justify-center items-start py-15 gap-10">
                <div className="flex flex-col gap-4">
                    <img src={footerLogo} alt="" className="w-[130px]"/>
                    <p className="max-w-xs text-sm text-gray-400 tracking-tight">Get shoes ready for the new term at your nearest Nike store. Find Your perfect Size in Store. Get Rewards</p>
                    <div className="flex gap-4 items-center">
                        {socialMedia.map((item,index)=>(
                            <div key={index}>
                                <img src={item.src} alt={item.alt} className="w-10 rounded-full p-2 bg-white"/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {footerLinks.map((Flink,index)=>(
                        <div key={index} className="flex flex-col gap-4">
                            <p className="text-lg">{Flink.title}</p>
                            <div className="flex flex-col gap-2 ">
                                {Flink.links.map((link,index)=>(
                                    <a key={index} className="text-sm text-gray-400 tracking-tight hover:text-white" href={link.link}>{link.name}</a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-8">
                    <p>© Copyright. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;