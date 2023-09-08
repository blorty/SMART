import React, { useState } from 'react';

export const Navbar = (props) => {
    const { onSectionChange } = props;
    const [NavbarBtnOpened, setNavbarBtnOpened] = useState(false);

    return (
        <>
            <button 
            onClick={() => setNavbarBtnOpened(!NavbarBtnOpened)}
            className="drop-shadow-md fixed top-12 right-12 p-3 text-2xl z-20 w-11 h-11 rounded-md bg-orange-600">
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
                className={`z-10 fixed top-0 right-0 bottom-0 bg-green-600
                            overflow-hidden transition-all flex flex-col
                ${NavbarBtnOpened ? "w-80" : "w-0"}`}
            >
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    <NavbarBtnBtn label="About Us" onClick={() => onSectionChange(0)} />
                    <NavbarBtnBtn label="Goals" onClick={() => onSectionChange(1)} />
                    <NavbarBtnBtn label="Relaxation Techniques" onClick={() => onSectionChange(2)} />
                    <NavbarBtnBtn label="Stress Management Activities" onClick={() => onSectionChange(3)} />
                </div>
            </div>
        </>
    );
}

const NavbarBtnBtn = (props) => {
    const { label, onClick } = props;

    return (
        <button
            onClick={onClick}
            className="drop-shadow-md opacity-85 text-orange-600 text-2xl font-bold cursor-pointer hover:text-white transition-colors"
        >
            {label}
        </button>
    );
}
