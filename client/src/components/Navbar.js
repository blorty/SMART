import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const Navbar = () => {
    const [NavbarBtnOpened, setNavbarBtnOpened] = useState(false);

    return (
        <>
            <button 
            onClick={() => setNavbarBtnOpened(!NavbarBtnOpened)}
            className="drop-shadow-md fixed top-12 right-12 p-3 text-2xl z-20 w-11 h-11 rounded-md bg-darkgreen">
                <div
                    className={`bg-white h-0.5 rounded-md w-full transition-all ${
                        NavbarBtnOpened ? "rotate-45 translate-y-0.5" : ""
                    }`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full my-1 ${
                        NavbarBtnOpened ? "hidden" : ""
                    }`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full transition-all ${
                        NavbarBtnOpened ? "-rotate-45" : ""
                    }`}
                />
            </button>
            <div
                className={`z-10 fixed top-0 right-0 bottom-0 bg-lightgreen
                            overflow-hidden transition-all flex flex-col
                ${NavbarBtnOpened ? "w-80" : "w-0"}`}
            >
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    <NavbarBtn label="About Us" to="aboutUsSection" />
                    <NavbarBtn label="Goals" to="goalsSection" />
                    <NavbarBtn label="Relaxation Techniques" to="relaxationTechniquesSection" />
                    <NavbarBtn label="Stress Management Activities" to="stressManagementActivitiesSection" />
                </div>
            </div>
        </>
    );
}

const NavbarBtn = ({ label, to }) => {
    return (
        <ScrollLink
            to={to}
            smooth={true}
            duration={500}
            className="drop-shadow-md opacity-85 text-lg md:text-xl lg:text-2xl text-mattecoal font-bold cursor-pointer hover:text-darkgreen transition-colors"
        >
            {label}
        </ScrollLink>
    );
}
