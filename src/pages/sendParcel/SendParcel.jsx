import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import serviceCenters from "../../../public/seviceCenter.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const regions = Array.from(
    new Set(serviceCenters.map((sc) => sc.region))
).map((region, index) => ({ id: index + 1, name: region }));

const SendParcelForm = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cost, setCost] = useState(null);

    const parcelType = watch("type");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    const filteredSenderCenters = serviceCenters.filter(
        (sc) => sc.region === senderRegion
    );
    const filteredReceiverCenters = serviceCenters.filter(
        (sc) => sc.region === receiverRegion
    );

    const onSubmit = (data) => {
        const senderDistrictName = filteredSenderCenters.find(
            (c) => c.city === data.senderServiceCenter
        )?.district;
        const receiverDistrictName = filteredReceiverCenters.find(
            (c) => c.city === data.receiverServiceCenter
        )?.district;

        const isWithinDistrict = senderDistrictName && receiverDistrictName
            ? senderDistrictName === receiverDistrictName
            : false;

        let baseCost = 0;
        let extraCost = 0;
        let breakdownText = "";

        if (data.type === "document") {
            baseCost = isWithinDistrict ? 60 : 80;
            breakdownText = `Parcel Type: Document
District: ${isWithinDistrict ? "Within District" : "Outside District"}
Base Cost: ৳${baseCost}`;
        } else {
            const weight = Number(data.weight || 0);
            if (weight <= 3) {
                baseCost = isWithinDistrict ? 110 : 150;
                breakdownText = `Parcel Type: Non-Document
Weight: ${weight}kg
District: ${isWithinDistrict ? "Within District" : "Outside District"}
Base Cost: ৳${baseCost}`;
            } else {
                baseCost = isWithinDistrict ? 110 : 150;
                extraCost = (weight - 3) * 40 + (!isWithinDistrict ? 40 : 0);
                breakdownText = `Parcel Type: Non-Document
Weight: ${weight}kg
District: ${isWithinDistrict ? "Within District" : "Outside District"}
Base Cost: ৳${baseCost}
Extra Cost: ৳${extraCost}`;
            }
        }

        const totalCost = baseCost + extraCost;
        setCost(totalCost);

        Swal.fire({
            title: "Estimated Delivery Cost",
            html: `<pre style="text-align:left;">${breakdownText}\n\n<strong>Total: ৳${totalCost}</strong></pre>`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Edit",
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: "font-semibold text-lg",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    createdBy: user?.email || "anonymous",
                    createdAt: new Date().toISOString(),
                    cost: totalCost,
                    status: "pending",
                    trackingNumber: `PARCEL-${Date.now()}`,
                };
                handleConfirm(parcelData);
            }
        });
    };

    const handleConfirm = async (parcelData) => {
        try {
            const res = await axiosSecure.post("/parcels", parcelData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Your parcel has been registered successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                reset();
                setCost(null);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to submit parcel.",
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-lg p-8 my-10">
            <h2 className="text-3xl font-bold mb-2 text-center">Send Your Parcel</h2>
            <p className="text-center mb-6 text-gray-500">
                As this is a door-to-door service, please provide both pickup and delivery locations.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <div className="border p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>
                    <div className="flex flex-col gap-4">
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Describe your parcel"
                            className="input input-bordered w-full"
                        />
                        {errors.title && <p className="text-red-500 text-sm">Parcel title is required</p>}

                        <select
                            {...register("type", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Type</option>
                            <option value="document">Document</option>
                            <option value="non-document">Non-Document</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">Parcel type is required</p>}

                        <input
                            {...register("weight")}
                            type="number"
                            step="0.1"
                            placeholder="Weight (kg)"
                            className={`input input-bordered w-full ${parcelType === "document" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            disabled={parcelType === "document"}
                        />
                    </div>
                </div>

                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sender Info */}
                    <div className="border p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
                        <div className="flex flex-col gap-4">
                            <input {...register("senderName", { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
                            <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />

                            <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region.id} value={region.name}>{region.name}</option>
                                ))}
                            </select>

                            <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {filteredSenderCenters.map((center) => (
                                    <option key={center.city} value={center.city}>{center.city} ({center.district})</option>
                                ))}
                            </select>

                            <input {...register("senderAddress", { required: true })} placeholder="Pickup Address" className="input input-bordered w-full" />
                            <textarea {...register("pickupInstruction")} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="border p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>
                        <div className="flex flex-col gap-4">
                            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                            <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />

                            <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region.id} value={region.name}>{region.name}</option>
                                ))}
                            </select>

                            <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {filteredReceiverCenters.map((center) => (
                                    <option key={center.city} value={center.city}>{center.city} ({center.district})</option>
                                ))}
                            </select>

                            <input {...register("receiverAddress", { required: true })} placeholder="Delivery Address" className="input input-bordered w-full" />
                            <textarea {...register("deliveryInstruction")} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary text-black px-10">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcelForm;
