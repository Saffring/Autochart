'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AssessmentTable } from './AssessmentTable';
import { AssessmentData } from '@/hooks/useAssessmentData';
import { Patient } from 'fhir/r4';

interface AssessmentChartProps {
  assessmentData: AssessmentData[];
  patientData: Patient;
  updateAssessmentValue: (index: number, newValue: string) => void;
  saveAssessmentData: () => Promise<void>;
}

export const AssessmentChart: React.FC<AssessmentChartProps> = ({
  assessmentData,
  patientData,
  updateAssessmentValue,
  saveAssessmentData,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleSave = async () => {
    await saveAssessmentData();
    // You might want to add some feedback to the user here, like a toast notification
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="#" className="text-gray-700 hover:text-gray-900">Patient Listing</a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <a href="#" className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">Assessments</a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <a href="#" className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">View Chart</a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <span className="ml-1 text-gray-500 md:ml-2 font-medium">Edit Chart</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm">Save and Submit</Button>
        </div>
      </header>

      <main className="flex-grow overflow-hidden p-4">
        <div className="max-w-[1920px] mx-auto h-full flex flex-col">
          <Card className="mb-4 p-4 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
              <div className="lg:col-span-2">
                <span className="font-semibold">Patient Name:</span> {patientData?.name?.[0]?.given?.join(' ')} {patientData?.name?.[0]?.family}
              </div>
              <div>
                <span className="font-semibold">DOB:</span> {patientData?.birthDate}
              </div>
              <div>
                <span className="font-semibold">MRN:</span> {patientData?.id}
              </div>
              <div className="lg:col-span-2 md:col-span-2">
                <span className="font-semibold">Submitted By:</span> {/* Add submitted by information if available */}
              </div>
              <div className="lg:col-span-3 md:col-span-2">
                <span className="font-semibold">Date & Time:</span> {new Date().toLocaleString()}
              </div>
            </div>
          </Card>

          <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
            <div className="lg:col-span-1 flex flex-col space-y-4 overflow-y-auto">
              <Card className="flex-shrink-0 shadow-md">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recording</h2>
                </div>
                <div className="p-4">
                  <audio controls className="w-full">
                    <source src="/path-to-your-audio-file.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </Card>

              <Card className="flex-grow overflow-hidden shadow-md">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Transcript</h2>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                  <p className="text-sm text-gray-600">Transcript will be displayed here.</p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3 overflow-hidden">
              <Card className="h-full flex flex-col shadow-md">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Edit History</h2>
                  <span className="text-sm text-gray-500">Last Edited: {new Date().toLocaleString()}</span>
                </div>
                <div className="flex-grow overflow-hidden">
                  <AssessmentTable
                    assessmentData={assessmentData}
                    updateAssessmentValue={updateAssessmentValue}
                    saveAssessmentData={saveAssessmentData}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssessmentChart;