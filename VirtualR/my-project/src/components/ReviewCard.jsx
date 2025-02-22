import { reviews } from "../constants";
import { star } from "../../assets/icons";


const ReviewCard =({imgURL,customerName,rating,feedback})=>{
    return(
        <div className="flex flex-col justify-center items-center gap-1">
            <img src={imgURL} alt="ProfileImage" className="rounded-full object-contain w-[120px] h-[120px]"/>
            <p className="text-sm tracking-tight text-gray-200 max-w-sm">{feedback}</p>
            <div className="flex gap-1 text-md text-gray-400">
                <img src={star} alt="" className="h-5 w-5"/>
                <p>({rating})</p>
            </div>
            <p className="text-lg font-bold leading-normal">{customerName}</p>

        </div>
    );
}
export default ReviewCard;