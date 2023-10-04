import React, { useState, useContext, useEffect, useRef } from 'react';
import Modal from './Modal';
import Register from './Register';
import Login from './Login';
import { AppContext } from '../AppContext';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const [NavbarBtnOpened, setNavbarBtnOpened] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false); 

    const { isLoggedIn, user, logout, updateAvatar } = useContext(AppContext);
    console.log("Navbar isLoggedIn state:", isLoggedIn);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isLoggedIn) {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(false);
        }
    }, [isLoggedIn]);

    const navigate = useNavigate();

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && user) {
            updateAvatar(user.username, file)
                .then(response => {
                    // Handle success if needed
                })
                .catch(error => {
                    console.error("Failed to update avatar:", error);
                });
        }
    };

    const handleLogout = () => {
        logout(navigate);
    };

    const toggleRegisterModal = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
    };

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };


    return (
        <>
            <button 
                onClick={() => setNavbarBtnOpened(!NavbarBtnOpened)}
                className="drop-shadow-md fixed top-12 right-12 p-3 text-2xl z-20 w-11 h-11 rounded-md bg-darkgreen">
                <div
                    className={`bg-white h-0.5 rounded-md w-full transition-all ${NavbarBtnOpened ? "rotate-45 translate-y-0.5" : ""}`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full my-1 ${NavbarBtnOpened ? "hidden" : ""}`}
                />
                <div
                    className={`bg-white h-0.5 rounded-md w-full transition-all ${NavbarBtnOpened ? "-rotate-45" : ""}`}
                />
            </button>
    
            <div
                className={`z-10 fixed top-0 right-0 bottom-0 bg-lightgreen overflow-hidden transition-all flex flex-col ${NavbarBtnOpened ? "w-80" : "w-0"}`}
            >
            {isLoggedIn && user && (
                <motion.div
                    className="flex flex-col items-center justify-center gap-1 p-4 mt-8 relative"  
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: { opacity: 0, y: "-100vh" },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
                        exit: { opacity: 0, y: "100vh", transition: { duration: 0.3, ease: "easeInOut" } },
                    }}
                >
                    {/* Avatar rendering */}
                    <div 
                        className="pt-12 relative w-40 h-40 cursor-pointer"
                        onMouseEnter={() => setIsAvatarHovered(true)}
                        onMouseLeave={() => setIsAvatarHovered(false)}
                        onClick={handleAvatarClick}
                    >
                        <div 
                            className="absolute inset-0 flex items-center justify-center transition-opacity" 
                        >
                            {isAvatarHovered && <span className="text-white text-xs">Update Avatar</span>}
                        </div>
                        
                        {user.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt="User Avatar" 
                                className={`rounded-full w-full h-full object-cover ${isAvatarHovered ? "opacity-50" : ""}`}
                            />
                        ) : (
                            <div className={`svg-icon rounded-full w-full h-full flex items-center justify-center p-2 ${isAvatarHovered ? "opacity-50" : ""}`}>
                            <svg 
                            className="svg-icon" 
                            viewBox="0 0 20 20"
                            style={{ opacity: isAvatarHovered ? 0.5 : 1 }} 
                            onMouseEnter={() => setIsAvatarHovered(true)}
                            onMouseLeave={() => setIsAvatarHovered(false)}
                            onClick={handleAvatarClick}
                        >
                                <path 
                                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                                ></path>
                            </svg>
                            </div>
                        )}
                    </div>

                    <span className="font-medium text-center w-full">{user.username}</span>
                </motion.div>
            )}
                
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                    {!isLoggedIn ? (
                        <>
                            <NavbarBtn label="Register" onClick={toggleRegisterModal} /> 
                            <NavbarBtn label="Login" onClick={toggleLoginModal} />
                        </>
                    ) : (
                        <NavbarBtn label="Logout" onClick={handleLogout} />
                    )}
                    <NavbarBtn label="About Us" to="aboutUsSection" />
                    <NavbarBtn label="Goals" to="goalsSection" />
                    <NavbarBtn label="Relaxation Techniques" to="relaxationTechniquesSection" />
                    <NavbarBtn label="Stress Management Activities" to="stressManagementActivitiesSection" />
                </div>
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
            />

            <Modal isOpen={isRegisterModalOpen} close={toggleRegisterModal}>
                <Register />
            </Modal>
            
            <Modal isOpen={isLoginModalOpen} close={toggleLoginModal}>
                <Login />
            </Modal>
        </>
    );
}

const NavbarBtn = ({ label, to, onClick }) => {
    if (onClick) {
        return (
            <button onClick={onClick} className="drop-shadow-md opacity-85 text-lg md:text-xl lg:text-2xl text-mattecoal font-bold cursor-pointer hover:text-darkgreen transition-colors">
                {label}
            </button>
        );
    }

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

export default Navbar;