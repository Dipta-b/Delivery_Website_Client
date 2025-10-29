import React from "react";
import { Outlet, Link } from "react-router-dom";
import ProfastLogo from "../pages/shared/ProfastLogo/ProfastLogo";

import {
    FiPackage,
    FiCreditCard,
    FiSearch,
    FiUser,
    FiUsers,       // For Active Riders
    FiUserCheck    // For Pending Riders
} from "react-icons/fi";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full shadow-md">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>
                    <div className="flex flex-1 items-center px-2 text-lg font-semibold h-12">

                        <span className="leading-none " >Dashboard</span>
                    </div>


                </div>

                {/* Page content */}
                <div className="p-6 flex-1">
                    <Outlet /> {/* Renders child routes like MyParcels */}
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <ProfastLogo className="h-8 w-8 mr-2" />
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 text-base-content">
                    <li className="flex items-center space-x-2">
                        <FiPackage className="text-lg" />
                        <Link to="/dashboard/myParcels">My Parcels</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FiCreditCard className="text-lg" />
                        <Link to="/dashboard/paymentHistory">Payment History</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FiSearch className="text-lg" />
                        <Link to="/dashboard/track">Track a Package</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FiUser className="text-lg" />
                        <Link to="/dashboard/profile">Update Profile</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FiUsers className="text-lg" />
                        <Link to="/dashboard/active-riders">Active Riders</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FiUserCheck className="text-lg" />
                        <Link to="/dashboard/pending-riders">Pending Riders</Link>
                    </li>


                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
