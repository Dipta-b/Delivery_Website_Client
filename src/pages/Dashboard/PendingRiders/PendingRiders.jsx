import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    // Fetch pending riders
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    if (isLoading) return <span className="loading loading-infinity loading-xl"></span>;

    const openModal = (rider) => setSelectedRider(rider);
    const closeModal = () => setSelectedRider(null);

    const approveRider = async (riderId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to approve this rider.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve",
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.patch(`/riders/${riderId}`, { status: "active" });
            if (res.data.modifiedCount > 0) {
                Swal.fire("Approved!", "Rider has been approved.", "success");
                queryClient.invalidateQueries(["pendingRiders"]);
                closeModal();
            }
        }
    };

    const rejectRider = async (riderId) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this rider.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject",
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/riders/${riderId}`);
            if (res.data.deletedCount > 0) {
                Swal.fire("Rejected!", "Rider application has been rejected.", "success");
                queryClient.invalidateQueries(["pendingRiders"]);
                closeModal();
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Riders</h2>
            <table className="table-auto w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Region</th>
                        <th className="px-4 py-2">District</th>
                        <th className="px-4 py-2">Bike Brand</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No pending riders.
                            </td>
                        </tr>
                    ) : (
                        riders.map((rider) => (
                            <tr key={rider._id} className="border-b">
                                <td className="px-4 py-2">{rider.name}</td>
                                <td className="px-4 py-2">{rider.email}</td>
                                <td className="px-4 py-2">{rider.region}</td>
                                <td className="px-4 py-2">{rider.district}</td>
                                <td className="px-4 py-2">{rider.bikeBrand}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => openModal(rider)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => approveRider(rider._id)}
                                        className="px-3 py-1 bg-green-500 text-white rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => rejectRider(rider._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
                        <h3 className="text-lg font-semibold mb-4">Rider Details</h3>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            X
                        </button>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegNo}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Additional Info:</strong> {selectedRider.additionalInfo}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
