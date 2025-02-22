import {products} from "./constants"
import PopProductCard from "./components/PopularProductCard"

function PopProducts()
{
    return (
        <section id="products" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
            <div className="flex flex-col gap-5 max-lg:items-center">
                <h2 className="text-4xl lg:text-5xl">Our {" "}
                    <span className="bg-[#f77162] text-transparent bg-clip-text">Popular</span>
                {" "}Product</h2>
                <p className="tracking-tight text-gray-400 max-w-[30rem]">
                    Experience top-notch quality and style with our sought-after selection. Discover a world of comfort, design, and value  
                </p>
                <div className="mt-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-15 mx-auto">
                    {products.map((product)=>(
                        <PopProductCard key={product.name} {...product}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PopProducts;