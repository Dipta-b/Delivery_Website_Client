import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useAuth from '../../../../hooks/useAuth'
import Swal from 'sweetalert2'

const PaymentFrom = () => {
    const navigate = useNavigate()
    const { parcelId } = useParams()
    const { user } = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()

    const [error, setError] = useState('')

    // Fetch parcel info
    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if (isPending) {
        return <span className="loading loading-infinity loading-xl"></span>
    }

    const amount = parcelInfo.cost || 0
    const amounInCents = amount * 100

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!stripe || !elements) return

        const card = elements.getElement(CardElement)
        if (!card) return

        try {
            // 1. Create payment method
            const { error: paymentMethodError, paymentMethod } =
                await stripe.createPaymentMethod({
                    type: 'card',
                    card
                })

            if (paymentMethodError) {
                setError(paymentMethodError.message)
                return
            }

            // 2. Create payment intent
            const { data: paymentIntentData } = await axiosSecure.post(
                '/create-payment-intent',
                { amounInCents }
            )

            const clientSecret = paymentIntentData.clientSecret

            // 3. Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'unknown'
                    }
                }
            })

            if (result.error) {
                setError(result.error.message)
                return
            }

            if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id

                // 4. Mark parcel paid + save payment record in backend
                const paymentData = {
                    parcelId,
                    email: user?.email,
                    amount,
                    transactionId,
                    date: new Date(),
                    paymentMethod: result.paymentIntent.payment_method_types[0],
                    status: 'completed'
                }

                const paymentRes = await axiosSecure.post('/payments', paymentData)
                console.log('Payment response:', paymentRes.data)

                if (paymentRes.data.insertPayment?.insertedId) {
                    // 5. Show SweetAlert2 modal
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        html: `
                            <p><strong>Parcel:</strong> ${parcelInfo.title}</p>
                            <p><strong>Amount:</strong> ৳${amount}</p>
                            <p><strong>Transaction ID:</strong> ${transactionId}</p>
                        `,
                        confirmButtonText: 'Go to My Parcels'
                    })

                    // 6. Redirect after confirmation
                    navigate('/dashboard/myParcels')
                } else {
                    setError('Payment was successful but could not record in database.')
                }
            }
        } catch (err) {
            console.error('Payment error:', err)
            setError('Something went wrong during payment. Please try again.')
        }
    }

    return (
        <div className="p-6">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 mx-auto"
            >
                <CardElement className="p-2 border rounded" />
                <button
                    type="submit"
                    className="btn btn-primary w-full text-black"
                    disabled={!stripe || amount <= 0}
                >
                    Pay ৳{amount}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}

export default PaymentFrom
