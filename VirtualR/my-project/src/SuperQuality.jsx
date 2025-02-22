import { shoe8 } from "../assets/images";
import ButtonCustom from "./components/CustomButton"
import useButtonHoverEffect from "./components/ButtonHoverjs";

function SuperQuality()
{
    useButtonHoverEffect();

    return(
        <section id="about-us" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
            <div className="flex flex-1 flex-col lg:flex-row gap-x-5 gap-y-20 justify-center items-center">
                <div className="flex flex-col justify-start lg:w-1/2 gap-6 md:max-w-[80vw] sm:max-w-[70vw]">
                    <h2 className="text-4xl lg:text-5xl">We Provide You {" "}
                        <span className="bg-[#f77162] text-transparent bg-clip-text">Super Quality</span>
                    {" "}Shoes</h2>
                    <p className="">
                        Ensuring premium comfort and style, our meticulously crafted footwear is designed to elevate your experience, providing you with unmatched quality, innovation, and a touch of elegance.
                    </p>
                    <p>
                        Our dedication to details and excellence ensures your satisfaction
                    </p>
                    <div>
                        <ButtonCustom href="#" label="Shop Now" />
                    </div>

                </div>
                <div className="flex-1 flex justify-center items-center object-contain">
                    <img src={shoe8} alt="shoe" />
                </div>
            </div>
        </section>
    );
}

export default SuperQuality;