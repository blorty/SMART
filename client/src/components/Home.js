import React from 'react';
import { motion } from "framer-motion";

const Section = (props) => {
    const {children} = props;

    return (
        <motion.section 
            className="h-screen w-full p-4 max-w-screen-2xl mx-auto flex flex-col item-start justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }}
        >
            {children}
        </motion.section>
    )
}

const AboutUs = () => {
    return (
        <Section id="aboutUsSection">
            <h1 className="text-6xl font-extrabold leading-snug">
                About Us
            </h1>
            <motion.p 
                className="text-lg mt-4 font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
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
                className="text-lg mt-4 font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
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
                className="text-lg mt-4 font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
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
                className="text-lg mt-4 font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
            >
                Your description about "Stress Management Activities" goes here.
            </motion.p>
        </Section>
    )
}

const Home = () => (
  <div className="flex flex-col items-center w-screen">
      <AboutUs />
      <Goals />
      <RelaxationTechniques />
      <StressManagementActivities />
  </div>
);  

export default Home;


