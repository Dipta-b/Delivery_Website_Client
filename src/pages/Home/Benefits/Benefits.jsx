import parcelImage from "../../../assets/safe-delivery.png";
import liveTrackingImage from "../../../assets/live-tracking.png";

const benefits = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: liveTrackingImage,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: parcelImage,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: parcelImage,
    },
];

const Benefits = () => {
    return (
        <div className="py-16 px-6 md:px-12 bg-base-100">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Benefits
            </h2>

            <div className="flex flex-col gap-8">
                {benefits.map((benefit) => (
                    <div
                        key={benefit.id}
                        className="card bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition flex flex-col md:flex-row items-center w-full"
                    >
                        {/* Left image + dotted vertical line */}
                        <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6 relative">
                            <figure>
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="w-24 h-24 object-contain"
                                />
                            </figure>

                            {/* Vertical dashed line slightly right of image */}
                            <div className="hidden md:block w-0 border-r-2 border-dashed border-gray-300 h-full absolute right-[-12px] top-0"></div>
                        </div>

                        {/* Right side: title and description */}
                        <div className="flex-1 pl-4">
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
