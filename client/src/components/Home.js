import React from 'react';
import { useContext } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

// import Carousel from './Carousel';
// import 'react-multi-carousel/lib/styles.css'

import CardSection from './CardSection';


const Section = (props) => {
    const {children, id} = props;
    
    const { isLoggedIn } = useContext(AppContext);
    console.log("Home isLoggedIn state:", isLoggedIn);
    
    return (
        <motion.section 
            id={id}
            className="h-screen w-full p-4 md:p-6 lg:p-8 flex flex-col items-start justify-center bg-mattebrown scroll-snap-align start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.25 } }}
        >
            {children}
        </motion.section>
    )
}

const AboutUs = () => {
    return (
        <Section id="aboutUsSection">
            <h1 className="text-6xl md:text-6xl sm:text-5xl font-extrabold leading-snug">
                About Us
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.2 } }}
            >
                Your description about "About Us" goes here. 
            </motion.p>
        </Section>
    )
}

const Goals = () => {
    return (
        <Section id="goalsSection">
            <h1 className="text-6xl md:text-6xl sm:text-5xl font-extrabold leading-snug">
                Our Goals
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.2 } }}
            >
                Your description about "Goals" goes here.
            </motion.p>
        </Section>
    )
}

const RelaxationTechniques = () => {
    return (
        <Section id="relaxationTechniquesSection">
            <h1 className="text-6xl md:text-6xl sm:text-5xl font-extrabold leading-snug">
                Relaxation Techniques
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.2 } }}
            >
                Your description about "Relaxation Techniques" goes here.
            </motion.p>
            <div className="flex items-center justify-center">
                <CardSection />
            </div>
        </Section>
    )
}


const StressManagementActivities = () => {
    return (
        <Section id="stressManagementActivitiesSection">
            <h1 className="text-6xl md:text-6xl sm:text-5xl font-extrabold leading-snug">
                Stress Management Activities
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.2 } }}
            >
                Your description about "Stress Management Activities" goes here.
            </motion.p>
        </Section>
    )
}

const Home = () => {
    const { 
        isLoginModalOpen, 
        isForgotPasswordModalOpen 
    } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center w-screen relative">
            <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 md:mt-5 sm:mt-3 mt-1 z-50 text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
            >
                <Link 
                    to="/" 
                    className="hover:text-lightgreen drop-shadow-lg font-bold cursor-pointer"
                >
                    SMART
                </Link>
            </motion.div>
            
            <motion.div 
                id='sections-container' 
                className="flex flex-col items-center w-full h-full overflow-y-scroll scroll-snap-type y mandatory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.2 }}
            >
                <AboutUs />
                <Goals />
                <RelaxationTechniques />
                <StressManagementActivities />
            </motion.div>

            {/* Modals */}
            {isLoginModalOpen && <Login />}
            {isForgotPasswordModalOpen && <ForgotPassword />}
        </div>
    );
};

export default Home;

