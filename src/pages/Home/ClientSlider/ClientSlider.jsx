import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/casio.png";
import logo3 from "../../../assets/brands/amazon_vector.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start.png";
import logo7 from "../../../assets/brands/start-people 1.png"; // no spaces

const ClientSlider = () => {
    const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

    return (
        <div className="py-10 bg-gray-50">
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
                We've helped thousands of sales teams
            </h2>

            <Marquee pauseOnHover={true} gradient={false} speed={40} direction="left">
                {logos.map((logo, index) => (
                    <div key={index} className="mx-[100px] flex items-center justify-center">
                        <img
                            src={logo}
                            alt={`Client ${index + 1}`}
                            className="w-32 h-24 object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default ClientSlider;
