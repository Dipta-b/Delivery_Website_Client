// src/components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service }) => {
    const { title, description, icon: Icon } = service;
    return (
        <div className=" card bg-base-100 shadow-md rounded-xl p-6 text-center
        transition-all duration-300
        hover:bg-[#CAEB66] hover:shadow-lg hover:scale-[1.02]">
            <div className="flex justify-center mb-4 text-primary text-4xl">
                <Icon />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

export default ServiceCard;
