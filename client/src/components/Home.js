import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const Section = (props) => {
    const {children, id} = props;

    return (
        <motion.section 
            id={id}
            className="h-screen w-full p-4 max-w-screen-2xl mx-auto flex flex-col item-start justify-center bg-mattebrown"
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
            <h1 className="text-6xl font-extrabold leading-snug ">
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
            <h1 className="text-6xl font-extrabold leading-snug">
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
            <h1 className="text-6xl font-extrabold leading-snug">
                Relaxation Techniques
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium drop-shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.2 } }}
            >
                Your description about "Relaxation Techniques" goes here.
            </motion.p>
        </Section>
    )
}

const StressManagementActivities = () => {
    return (
        <Section id="stressManagementActivitiesSection">
            <h1 className="text-6xl font-extrabold leading-snug">
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

const Home = () => (
    <motion.div 
        id='logo' 
        className="flex flex-col items-center w-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.2 }}
    >
    <Link 
        to="/" 
        className="hover:text-lightgreen drop-shadow-lg absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 py-2 px-4 font-bold cursor-pointer z-50"
    >
        SMART
    </Link>
    
    
    <AboutUs />
    <Goals />
    <RelaxationTechniques />
    <StressManagementActivities />
    </motion.div>
);

export default Home;


