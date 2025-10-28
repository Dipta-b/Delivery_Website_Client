import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const {
        data: parcels = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["my-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <p>Loading your parcels...</p>;
    if (isError) return <p>Failed to load parcels. Please try again later.</p>;

    const handleView = (parcel) => {
        Swal.fire({
            title: `<strong>${parcel.title}</strong>`,
            html: `
                <p><strong>Type:</strong> ${parcel.type}</p>
                <p><strong>Created At:</strong> ${new Date(parcel.createdAt).toLocaleString()}</p>
                <p><strong>Cost:</strong> ৳${parcel.cost}</p>
                <p><strong>Status:</strong> ${parcel.status}</p>
            `,
            icon: "info",
        });
    };


    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    const handleDelete = (parcel) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete parcel "${parcel.title}" permanently?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Parcel has been deleted.", "success");
                        refetch(); // refresh data
                    } else {
                        Swal.fire("Error!", "Parcel not found.", "error");
                    }
                } catch (err) {
                    Swal.fire("Error!", "Failed to delete parcel.", "error");
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto p-6">
            <h2 className="text-xl font-semibold mb-4">My Parcels ({parcels.length})</h2>
            <table className="table table-zebra w-full border border-gray-200">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No parcels found.
                            </td>
                        </tr>
                    ) : (
                        parcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td>{parcel.title}</td>
                                <td>{parcel.type}</td>
                                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                                <td>৳{parcel.cost}</td>
                                <td>
                                    {parcel.status === "paid" ? (
                                        <span className="badge badge-success">Paid</span>
                                    ) : (
                                        <span className="badge badge-warning">Unpaid</span>
                                    )}
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-info"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handlePay(parcel._id)}
                                        className="btn btn-xs btn-success"
                                        disabled={parcel.status === "paid"}
                                    >
                                        Pay
                                    </button>
                                    <button
                                        onClick={() => handleDelete(parcel)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
