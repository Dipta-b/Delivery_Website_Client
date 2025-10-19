// src/sections/ServicesCection.jsx
import React from "react";
import ServiceCard from "../ServicesCection/ServiceCard.jsx";

// ✅ Corrected imports
import {
    FaTruckFast,
    FaMoneyBillWave,
    FaBuilding,
    FaBoxOpen,
} from "react-icons/fa6";
import { FaGlobe, FaUndoAlt } from "react-icons/fa"; // ✅ moved UndoAlt + Globe to fa

const servicesData = [
    {
        icon: FaTruckFast,
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
        icon: FaGlobe,
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
        icon: FaBoxOpen,
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        icon: FaMoneyBillWave,
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        icon: FaBuilding,
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        icon: FaUndoAlt, // ✅ replaced FaUndo
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
];

const Services = () => {
    return (
        <section className="py-16 px-6 md:px-12 bg-base-200">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 not-even:">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {servicesData.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
};

export default Services;
