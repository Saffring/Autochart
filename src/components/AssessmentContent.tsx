'use client';

import React from 'react';
import { usePatientData } from '@/hooks/usePatientData';
import { useAssessmentData } from '@/hooks/useAssessmentData';
import AssessmentChart from '@/components/AssessmentChart';
import LoadingScreen from '@/components/LoadingScreen';

const AssessmentContent: React.FC = () => {
  const { patientData, loading: patientLoading, error: patientError, showBanner } = usePatientData();

  console.log({
    patientData,
    patientError
  })
  const { 
    assessmentData, 
    loading: assessmentLoading, 
    error: assessmentError,
    updateAssessmentValue,
    saveAssessmentData
  } = useAssessmentData({ patient: patientData ?? undefined });

  if (patientLoading || assessmentLoading) {
    return <LoadingScreen message="Loading patient data..." />;
  }

//   if (patientError) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-red-600">Error Loading Patient Data</h1>
//         <p className="text-lg">{patientError}</p>
//         <p className="mt-4">Please try refreshing the page or contact support if the problem persists.</p>
//       </div>
//     );
//   }

  if (!patientData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-600">No Patient Data Available</h1>
        <p className="text-lg">We couldn&apos;t retrieve the patient data. This could be due to:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Missing or invalid authentication</li>
          <li>Network issues</li>
          <li>Server-side problems</li>
        </ul>
        <p className="mt-4">Please try logging out and logging back in, or contact support if the problem persists.</p>
      </div>
    );
  }

//   if (assessmentError) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-red-600">Error Loading Assessment Data</h1>
//         <p className="text-lg">{assessmentError}</p>
//         <p className="mt-4">Please try refreshing the page or contact support if the problem persists.</p>
//       </div>
//     );
//   }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Patient Assessment</h1>
      <AssessmentChart 
        assessmentData={assessmentData}
        patientData={patientData}
        updateAssessmentValue={updateAssessmentValue}
        saveAssessmentData={saveAssessmentData}
      />
    </div>
  );
};

export default AssessmentContent;