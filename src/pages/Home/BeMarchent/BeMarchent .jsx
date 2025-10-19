import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMarchent = () => {
    return (
        <div data-aos="flip-left" className="hero bg-[#33929D] p-10 md:p-20 rounded-3xl">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                {/* Image with white background and shadow */}
                <div className="bg-white p-4 rounded-lg shadow-2xl flex justify-center items-center">
                    <img
                        src={location}
                        alt="Merchant Location"
                        className="max-w-sm object-contain"
                    />
                </div>

                {/* Text Content */}
                <div className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>
                    <p className="py-4 text-white text-lg md:text-xl">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn btn-primary rounded-full text-black">Become a Merchant</button>
                    <button className="btn btn-primary btn-outline ms-4 rounded-full text-black">Become a Merchant</button>
                </div>
            </div>
        </div>
    );
};

export default BeMarchent;
