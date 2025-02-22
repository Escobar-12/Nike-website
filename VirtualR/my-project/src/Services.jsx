import { services } from "./constants";

const ServicesSec = () => {
    return (
        <section id="services" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
            <div className="flex flex-wrap justify-center gap-9">
                {services.map((service, index) => (
                    <div key={index} 
                        className="flex flex-col items-center lg:items-start max-lg:text-center gap-4 max-w-sm  rounded-2xl shadow-2xl p-8 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
                        
                        <div className="w-11 h-11 bg-[#f77162] rounded-full flex items-center justify-center ">
                            <img src={service.imgURL} alt="Service Icon" className="w-8 h-8 object-contain" />
                        </div>
                        
                        <h4 className="text-2xl font-semibold">{service.label}</h4>

                        <p className="text-sm text-gray-400 break-words">{service.subtext}</p>
                    </div>  
                ))}
            </div>
        </section>
    );
};

export default ServicesSec;
