import { reviews } from "./constants";
import ReviewCard from "./components/ReviewCard";

const CustomerReview = () =>{
    return(
        <section id="about-us" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20 py-10 bg-neutral-900">
            <div className="flex flex-col justify-center items-center text-center gap-8">
                <div className="flex flex-col gap-3 max-w-120">
                    <h2 className="text-4xl lg:text-5xl">What Our {" "}
                        <span className="bg-[#f77162] text-transparent bg-clip-text">Customers</span>{" "} 
                    Say?</h2>
                    <p>
                        Hear genuine stories from our satisfied customers about their exceptional experience with us.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-20">
                    {reviews.map((review,index)=>(
                        <ReviewCard key={index} {...review}/>
                    ))}
                </div>

            </div>
        </section>
    );
}
export default CustomerReview