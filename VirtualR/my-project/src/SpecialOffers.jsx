import { offer } from "../assets/images";
import ButtonCustom from "./components/CustomButton";
import { arrowRight } from "../assets/icons";


const SpecialOffer = ()=>{
    return(
        <section id="SpecialOffer" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
            <div className="flex flex-wrap flex-col justify-center items-center lg:flex-row-reverse gap-10">
                <div className="lg:w-1/2 ">
                    <h2 className="text-4xl lg:text-5xl">
                        <span className="bg-[#f77162] text-transparent bg-clip-text">Special</span>{" "}
                    Offer</h2>
                    <p className='mt-4 text-sm max-w-3xl'>
                        Embark on a shopping journey that redefines your experience with unbeatable deals. From premier selections to incredible savings, we offer unparalleled value that sets us apart.
                    </p>
                    <p className='mt-6 text-sm max-w-3xl'>
                        Navigate a realm of possibilities designed to fulfill your unique desires, surpassing the loftiest expectations. Your journey with us is nothing short of exceptional.
                    </p>
                    <div className="flex gap-3 mt-10">
                        <ButtonCustom href="#" label="Shop Now" imgsrc={arrowRight}/>
                        <a href="#" className="border-2 rounded-full px-4 py-2 text-lg">Learn more</a>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center ">
                    <img src={offer} alt="OurOffer" className="object-contain w-[773] h-[687]"/>
                </div>
            </div>
        </section>
    );
}

export default SpecialOffer;