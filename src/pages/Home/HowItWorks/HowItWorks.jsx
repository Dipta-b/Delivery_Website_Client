import React from "react";
import { FaBox, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
    const data = [
        {
            id: 1,
            title: "Booking Pick & Drop",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
            icon: <FaBox className="text-4xl text-primary mb-3" />,
        },
        {
            id: 2,
            title: "Cash On Delivery",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
            icon: <FaMoneyBillWave className="text-4xl text-primary mb-3" />,
        },
        {
            id: 3,
            title: "Delivery Hub",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
            icon: <FaWarehouse className="text-4xl text-primary mb-3" />,
        },
        {
            id: 4,
            title: "Booking SME & Corporate",
            description:
                "From personal packages to business shipments — we deliver on time, every time.",
            icon: <FaBuilding className="text-4xl text-primary mb-3" />,
        },
    ];

    return (
        <section className="py-12 bg-base-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-10">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="card bg-base-100 shadow-md hover:shadow-lg transition-transform hover:-translate-y-2 p-6 text-center"
                        >
                            <div className="flex flex-col items-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
