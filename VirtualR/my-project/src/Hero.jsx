import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";
import ButtonCustom  from "./components/CustomButton";
import useButtonHoverEffect from "./components/ButtonHoverjs";
import { statistics,shoes } from "./constants";
import { useState } from "react";
import ShoeCard from "./components/ShoeCard";


function HeroSec() {
    useButtonHoverEffect();
    const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);
    

    return (
    <section id="home" className="w-full flex xl:flex-row flex-col justify-center max-w-[1440px] min-h-screen mx-auto px-3 lg:px-10 mb-40">
        <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:px-10 pt-20 my-10 lg:mt-20">
            <p className="tracking-tight text-[#f77162] font-medium text-lg">
                Our Summer Collection
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl mt-5 leading-tight font-bold relative z-10 ">
                <span className="lg:whitespace-nowrap bg-[#111111] px-2">The New Arrival</span>
                
                <br />
                <span className="bg-[#f77162] text-transparent bg-clip-text">
                    Nike
                </span>{" "}
                Shoes
            </h1>

            <p className="max-w-sm text-sm leading-7 mt-4 mb-8 text-gray-600 sm:max-w-sm">
                Discover stylish Nike arrivals, quality comfort, and innovation for
                your active life.
            </p>

            <ButtonCustom href="#" label="Shop Now" imgsrc={arrowRight} />

            <div className="flex justify-start items-start flex-wrap w-full gap-10 mt-20">
                {statistics.map((stat, index) => (
                    <div key={index} className="flex flex-col items-start">
                    <h4 className="text-3xl font-semibold">{stat.value}</h4>
                    <p className="tracking-tight leading-7 text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-center items-center xl:min-h-screen max-xl:py-40 bg-[url('../assets/images/collection-background.svg')] bg-cover bg-center ">
            <img src={bigShoeImg} alt="Nike Shoe" className=" object-contain relative z-10"/>
            <div className="flex justify-center items-center sm:gap-6 gap-4 absolute -bottom-[5%] max-sm:px-6 ">
                {shoes.map((image,index)=>(
                    <ShoeCard key={index} imgURL={image} changeBigShoeImage={(shoe) => setBigShoeImg(shoe)} bigShoeImg={bigShoeImg}/>
                ))}
            </div>
        </div>
    </section>
);}

export default HeroSec;
