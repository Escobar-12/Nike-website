import { Link } from "react-router-dom";

const ButtonCustom = ({
    href = "/",
    label = "Click Me",
    imgsrc = null,
    large = true,
    textCenter=false,
    bold = false,
    roundedFull = true,
}) =>
{
    return (
        <button  className={`thisButton inline-flex items-center gap-2 px-4 py-2 bg-[#f77162] text-white ${roundedFull?"rounded-full":"rounded"} ${textCenter?"justify-center" : ""}`}>
            <span className={`${large?"text-xl":"text-md"} ${bold?"font-semibold":""}`}>{label}</span>
            {imgsrc && <img src={imgsrc} alt="icon" className=" z-20 w-5 h-5 border-2 rounded-full border-[#f77162]" />}

        </button>
    );
};

export default ButtonCustom;


