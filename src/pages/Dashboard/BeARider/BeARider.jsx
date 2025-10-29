import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import serviceCenters from "../../../../public/seviceCenter.json";

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, watch } = useForm();
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);

    const selectedRegion = watch("region");

    useEffect(() => {
        const uniqueRegions = [...new Set(serviceCenters.map((item) => item.region))];
        setRegions(uniqueRegions);
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            const filteredDistricts = serviceCenters
                .filter((center) => center.region === selectedRegion)
                .map((center) => center.district);
            setDistricts(filteredDistricts);
        } else {
            setDistricts([]);
        }
    }, [selectedRegion]);

    const onSubmit = (data) => {
        const riderInfo = {
            name: user?.displayName || "",
            email: user?.email || "",
            age: data.age,
            nid: data.nid,
            bikeBrand: data.bikeBrand,
            bikeRegNo: data.bikeRegNo,
            additionalInfo: data.additionalInfo || "",
            region: data.region,
            district: data.district,
            createdAt: new Date(),
        };

        axiosSecure.post("/riders", riderInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted",
                        text: "Your Be A Rider request has been submitted successfully!",
                    });
                    reset();
                } else if (res.data.message === "User already exists") {
                    Swal.fire({
                        icon: "info",
                        title: "Already Registered",
                        text: "You have already applied to be a rider.",
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "Something went wrong. Please try again later.",
                });
            });
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md mt-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Be A Rider</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-black">
                        {user?.displayName || "N/A"}
                    </p>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                        {user?.email || "N/A"}
                    </p>
                </div>

                {/* Age */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                        type="number"
                        {...register("age", { required: true, min: 18 })}
                        placeholder="Enter your age"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* National ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">National ID Card Number</label>
                    <input
                        type="text"
                        {...register("nid", { required: true })}
                        placeholder="Enter your NID number"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Bike Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bike Brand</label>
                    <input
                        type="text"
                        {...register("bikeBrand", { required: true })}
                        placeholder="e.g., Yamaha, Honda, Suzuki"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Bike Registration Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register("bikeRegNo", { required: true })}
                        placeholder="Enter your bike registration number"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Region */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                        {...register("region", { required: true })}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Select Region</option>
                        {regions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <select
                        {...register("district", { required: true })}
                        className="w-full border rounded-lg px-3 py-2"
                        disabled={!selectedRegion}
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                {/* Additional Information */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                        {...register("additionalInfo")}
                        placeholder="Write any additional details..."
                        className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-black py-2 rounded-lg mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BeARider;
