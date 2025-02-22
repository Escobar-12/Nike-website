const ButtonCustom = ({
        href= "#",
        label= "Click Me",
        imgsrc= null,
        large= true,}) =>
{
    return (
        <a href={href} className="thisButton inline-flex items-center gap-2 px-4 py-2 bg-[#f77162] text-white rounded-full">
            <span className={`${large?"text-xl":"text-md"}`}>{label}</span>
            {imgsrc && <img src={imgsrc} alt="icon" className=" z-20 w-5 h-5 border-2 rounded-full border-[#f77162]" />}

        </a>
    );
};

export default ButtonCustom;


