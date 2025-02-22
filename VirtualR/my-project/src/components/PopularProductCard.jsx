import { star } from "../../assets/icons";

function PopProductCard( {imgURL, name, price, rating} ) {
    return (
        <div className="flex-1 flex flex-col justify-start gap-1 w-full items-start p-4">
            <img src={imgURL} alt={name} className="w-[280px] h-[280px]" />
                <div className="flex items-center gap-2">
                    <img src={star} alt="rating" className="w-[24px] h-[24px] my-3"/>
                    <p className="text-gray-500">({rating})</p>
                </div>
                <h3 className="text-lg font-bold ">{name}</h3>
                <p className="text-[#f77162]">{price}</p>
        </div>
    );
}

export default PopProductCard;
