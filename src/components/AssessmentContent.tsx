'use client';

import React, { useState, useEffect } from 'react';
import { usePatientData } from '@/hooks/usePatientData';
import { useAssessmentData } from '@/hooks/useAssessmentData';
import AssessmentChart from '@/components/AssessmentChart';
import { FiPlus, FiAlertCircle, FiInfo } from 'react-icons/fi';

const AssessmentContent: React.FC = () => {
  const { patientData, loading: patientLoading, error: patientError } = usePatientData();
  const { 
    assessmentData, 
    loading: assessmentLoading, 
    error: assessmentError,
    updateAssessmentValue,
    saveAssessmentData
  } = useAssessmentData({ patient: patientData });

  const [transcript, setTranscript] = useState<string>('');

  useEffect(() => {
    // Simulating fetching transcript data
    const fetchTranscript = async () => {
      // Replace this with actual API call in the future
      const mockTranscript = "This is a placeholder for the patient's transcript. In a real application, this would be fetched from an API or database.";
      setTranscript(mockTranscript);
    };

    fetchTranscript();
  }, []);

  const isLoading = patientLoading || assessmentLoading;
  const error = patientError || assessmentError;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8" role="alert">
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded">
          <div className="flex items-center">
            <FiAlertCircle className="mr-2" size={24} aria-hidden="true" />
            <h1 className="text-xl font-semibold">Error Loading Data</h1>
          </div>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="w-full px-4 py-8" role="alert">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <h1 className="text-xl font-semibold mb-2">No Patient Data Available</h1>
          <p>We couldn&apos;t retrieve the patient data. This could be due to:</p>
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Missing or invalid authentication</li>
            <li>Network issues</li>
            <li>Server-side problems</li>
          </ul>
          <p className="mt-4">Please try logging out and logging back in, or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-card text-card-foreground shadow-lg rounded-lg p-4 md:p-6 w-full">
        <AssessmentChart 
          assessmentData={assessmentData}
          patientData={patientData}
          updateAssessmentValue={updateAssessmentValue}
          saveAssessmentData={saveAssessmentData}
          transcript={transcript}
          loading={isLoading}
          error={error}
        />
      </div>

      <button 
        className="fixed bottom-6 right-6 bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-lg hover:bg-accent/90 transition-colors z-10"
        onClick={() => {/* Handle quick action */}}
        aria-label="Quick action"
      >
        <FiPlus size={24} aria-hidden="true" />
      </button>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="w-full px-4 py-6 animate-pulse">
    <div className="h-20 bg-gray-200 rounded mb-6"></div>
    <div className="h-10 bg-gray-200 rounded mb-6"></div>
    <div className="h-96 bg-gray-200 rounded"></div>
  </div>
);

export default AssessmentContent;