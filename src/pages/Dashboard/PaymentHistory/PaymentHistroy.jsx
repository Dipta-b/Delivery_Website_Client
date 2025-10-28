import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const PaymentHistroy = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?emai=${user.email}`)
            return res.data;
        }
    })

    if (isPending) {
        return <span className="loading loading-infinity loading-xl"></span>
    }

    return (
        <div className="overflow-x-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <table className="table-auto w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Parcel ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Transaction ID</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No payments found.
                            </td>
                        </tr>
                    ) : (
                        payments.map((payment) => (
                            <tr key={payment._id} className="border-b">
                                <td className="px-4 py-2">{payment.parcelId}</td>
                                <td className="px-4 py-2">{payment.email}</td>
                                <td className="px-4 py-2">৳{payment.amount}</td>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                                <td className="px-4 py-2">
                                    {payment.payment_status === "paid" ? (
                                        <span className="text-green-600 font-semibold">Paid</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Unpaid</span>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(payment.paid_at_string).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentHistroy