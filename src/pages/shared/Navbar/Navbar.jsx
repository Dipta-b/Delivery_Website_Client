import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    const handleLogout = async () => {
        try {
            await logOut();
            console.log('Logged out successfully');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/sendParcel">Send a Parcel</NavLink></li>
            <li><NavLink to="/beARider">Be a Rider</NavLink></li>
            {user &&
                <>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                </>
            }
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <ProfastLogo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="navbar-end">
                {user === undefined ? (
                    <span>Loading...</span>
                ) : user ? (
                    <button
                        onClick={handleLogout}
                        className="btn btn-primary text-black"
                    >
                        Log Out
                    </button>
                ) : (
                    <Link to="/login" className="btn btn-primary text-black">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
