import React from 'react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* About Us Section */}
      <motion.section 
        className="flex flex-col items-center justify-center flex-1 bg-gray-800 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida suscipit. Integer auctor urna vitae leo hendrerit, nec cursus lacus laoreet.</p>
      </motion.section>
      
      {/* Goals Section */}
      <motion.section 
        className="flex flex-col items-center justify-center flex-1 bg-gray-900 text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Our Goals</h1>
        <p className="text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu gravida suscipit. Integer auctor urna vitae leo hendrerit, nec cursus lacus laoreet.</p>
      </motion.section>
    </div>
  );
}

export default Home;
