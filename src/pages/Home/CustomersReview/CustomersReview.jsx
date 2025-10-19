import React, { useEffect, useRef } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import customerimg from '../../../assets/customer-top.png'
const CustomersReview = () => {
    const flickingRef = useRef(null);

    const reviews = [
        {
            id: 1,
            description:
                "The delivery was quick and my package arrived in perfect condition. Excellent service and very professional team!",
            name: "Sarah Johnson",
            designation: "E-commerce Seller",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 2,
            description:
                "Impressive experience! The booking process was simple and the customer support was very responsive.",
            name: "Michael Brown",
            designation: "Small Business Owner",
            image: "https://randomuser.me/api/portraits/men/33.jpg",
        },
        {
            id: 3,
            description:
                "Consistent, reliable, and easy to use! I’ve been using their service for months and they never disappoint.",
            name: "Ariana Patel",
            designation: "Online Retailer",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
            id: 4,
            description:
                "The best logistics partner we’ve worked with. Great tracking, fast delivery, and affordable pricing.",
            name: "David Kim",
            designation: "Corporate Client",
            image: "https://randomuser.me/api/portraits/men/27.jpg",
        },
        {
            id: 5,
            description:
                "Fantastic service! The cash-on-delivery option helped grow my online store sales significantly.",
            name: "Emily Carter",
            designation: "Shop Owner",
            image: "https://randomuser.me/api/portraits/women/56.jpg",
        },
        {
            id: 6,
            description:
                "Always on time and always reliable. The drivers are polite and the whole experience feels professional.",
            name: "James Lee",
            designation: "Freelancer",
            image: "https://randomuser.me/api/portraits/men/41.jpg",
        },
        {
            id: 7,
            description:
                "I love how simple the booking process is. The mobile experience is smooth and delivery updates are accurate.",
            name: "Olivia Smith",
            designation: "Customer",
            image: "https://randomuser.me/api/portraits/women/25.jpg",
        },
    ];

    // Auto slide every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (flickingRef.current) {
                flickingRef.current.next(500).catch(() => {
                    flickingRef.current.moveTo(0, 500);
                });
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div>
            <div className="flex items-center flex-col mt-16"><img src={customerimg} alt="" />
                <h2 className="text-3xl font-semibold text-center mb-10">
                    What our customers are sayings
                </h2>
                <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p></div>
            <div><section className="py-12 bg-base-200">
                <div className="container mx-auto px-4">


                    <div className="relative">
                        {/* Flicking Carousel */}
                        <Flicking
                            ref={flickingRef}
                            align="center"
                            circular={true}
                            moveType="snap"
                            duration={500}
                            className="overflow-hidden"
                        >
                            {reviews.map((item) => (
                                <div
                                    key={item.id}
                                    className="panel bg-base-100 shadow-md p-6 mx-3 rounded-2xl w-80 sm:w-96 flex flex-col justify-between"
                                >
                                    <p className="text-gray-700 text-center mb-4">
                                        {item.description}
                                    </p>

                                    <div className="border-t border-dotted border-gray-400 my-4"></div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-500">{item.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <ViewportSlot>
                                {/* Left Arrow */}
                                <button
                                    onClick={() => flickingRef.current.prev()}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-focus transition"
                                >
                                    <FaArrowLeft />
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={() => flickingRef.current.next()}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-focus transition"
                                >
                                    <FaArrowRight />
                                </button>
                            </ViewportSlot>
                        </Flicking>
                    </div>
                </div>
            </section></div>
        </div>

    );
};

export default CustomersReview;
