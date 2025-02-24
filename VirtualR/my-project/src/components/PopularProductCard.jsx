import { star } from "../../assets/icons";

function PopProductCard( {product,showImage} ) {
    return (
        <div className="flex-1 flex flex-col justify-start gap-1 w-full items-start p-4">
            <img src={product.imgURL} alt={product.name} className="w-[280px] h-[280px]" onClick={() => showImage(product)}/>
                <div className="flex items-center gap-2">
                    <img src={star} alt="rating" className="w-[24px] h-[24px] my-3"/>
                    <p className="text-gray-500">({product.rating})</p>
                </div>
                <h3 className="text-lg font-bold ">{product.name}</h3>
                <p className="text-[#f77162]">{product.price}</p>
        </div>
    );
}

export default PopProductCard;
