import ButtonCustom from "./components/CustomButton";

const ContactUs = () => {
    return (
        <section id="contact-us" className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 mt-30 max-sm:mt-20 mb-20">
            <div className="flex flex-wrap justify-between items-center gap-6">
                <div className="flex justify-center items-center mx-auto max-w-2xl">
                    <h2 className="text-4xl lg:text-5xl font-semibold">
                        Sign Up for {" "}
                        <span className="bg-[#f77162] text-transparent bg-clip-text">Updates</span>{" "}
                        & Newsletter
                    </h2>
                </div>

                <div className="w-full flex-1 flex border-2 border-gray-300 rounded-full p-2 items-center">
                    <input type="email" placeholder="subscribe@nike.com" className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none"/>
                    <ButtonCustom label="Sign Up" large={false} />
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
