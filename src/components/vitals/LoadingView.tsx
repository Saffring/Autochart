type Vital = any;

import React from 'react';
import { motion } from 'framer-motion';
import AddVitalsSheet from './AddVitalsSheet';

const LoadingView = () => {
  // Create the onAddVitals function that accepts a Vital array and returns a Promise<void>
  const handleAddVitals = async (vitals: Vital[]): Promise<void> => {
    // Handle the vitals addition logic here
    console.log('Vitals added:', vitals);
    // Simulate an async operation (e.g., an API call)
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-64"
    >
      <div className="flex justify-between items-center w-full px-4">
        <h2 className="text-3xl font-bold">Patient Vitals</h2>
        <div className="ml-auto">
          <AddVitalsSheet onAddVitals={handleAddVitals} />
        </div>
      </div>
      <div className="text-2xl font-semibold text-gray-600 mt-4">
        Loading vitals...
      </div>
    </motion.div>
  );
};

export default LoadingView;
