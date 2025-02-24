import { products } from "./constants";
import PopProductCard from "./components/PopularProductCard";
import { useRef, useState, useEffect } from "react";
import {X} from "lucide-react"
import shiftPics from "./components/PicsShift";

function PopProducts() {
    const dialogRef = useRef(null);
    const imgRef = useRef(null);
    const [shoeImageDisplay, setShoeImageDisplay] = useState(null);

    function showImage(product) 
    {
        setShoeImageDisplay(product.imgURL);
        document.body.style.overflow = 'hidden';
    }
    function dialogClose()
    {
        setShoeImageDisplay(null);
        document.activeElement?.blur();
        document.body.style.overflow = '';

    }
    function checkOutClick(event)
    {
        if(imgRef.current && !imgRef.current.contains(event.target))
        {
            dialogClose();
        }
    }   
    function doShift(event)
    {
        if(!products)
        {
            dialogClose();
            return;
        }
        shiftPics(event,products,shoeImageDisplay,setShoeImageDisplay);
    }

    useEffect(() => 
    {
        if (!shoeImageDisplay) return;
        dialogRef.current?.showModal();

        dialogRef.current?.addEventListener("close", dialogClose);
        document.addEventListener("mousedown",checkOutClick);
        document.addEventListener("keydown",doShift)

        return () => {
            dialogRef.current?.removeEventListener("close",dialogClose);
            document.removeEventListener("mousedown",checkOutClick);
            document.removeEventListener("keydown",doShift)
        }
    }, [shoeImageDisplay]);

    return (
        <>
            {shoeImageDisplay &&
            <dialog ref={dialogRef} className="min-h-screen min-w-screen flex justify-center items-center m-auto bg-black/80 border-none">
                <div ref={imgRef} className="relative"
                    style={{aspectRatio: shoeImageDisplay && `${shoeImageDisplay.width}/${shoeImageDisplay.height}`}}
                    >
                    <img  src={shoeImageDisplay} alt="ShoeImage"/>
                    <X className="absolute  -right-2 -top-2 bg-[#f77162] rounded-full h-7 w-7 p-1" onClick={dialogClose}/>
                </div>
            </dialog>}

            <section id="products" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
                <div className="flex flex-col gap-5 max-lg:items-center">
                    <h2 className="text-4xl lg:text-5xl">
                        Our <span className="bg-[#f77162] text-transparent bg-clip-text">Popular</span> Product
                    </h2>
                    <p className="tracking-tight text-gray-400 max-w-[30rem]">
                        Experience top-notch quality and style with our sought-after selection. Discover a world of comfort, design, and value.
                    </p>
                    <div className="mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-15 mx-auto">
                        {products.map((product) => (
                            <div key={product.name}>
                                    <PopProductCard product={product} showImage={showImage} />
                            </div>  
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PopProducts;
