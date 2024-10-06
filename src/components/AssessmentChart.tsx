'use client';

import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AssessmentTable } from './AssessmentTable';
import useAssessmentData, { AssessmentData } from './useAssessmentData';

// Mock data for demonstration
const mockAssessmentData: AssessmentData[] = [
  { assessment: 'Temperature', value: '37', history: ['37.2', '37.1', '37.3', '37.5', '37.0'] },
  { assessment: 'Respiratory rate', value: '18', history: ['22', '20', '21', '19', '20'] },
  { assessment: 'Heart Rate', value: '84', history: ['86', '85', '83', '82', '84'] },
  { assessment: 'Blood Pressure', value: '120/80', history: ['118/78', '122/82', '120/80', '124/82', '118/76'] },
  { assessment: 'Pain', value: 'Yes', history: ['Yes', 'Yes', 'No', 'Yes', 'No'] },
];

const mockHistoricalDates = [
  'Mar 13, 2024 18:45 hrs',
  'Mar 13, 2024 12:30 hrs',
  'Mar 12, 2024 20:15 hrs',
  'Mar 12, 2024 08:00 hrs',
  'Mar 11, 2024 22:45 hrs',
];

export const AssessmentChart: React.FC = () => {
  const {
    assessmentData,
    selectedRow,
    setSelectedRow,
    updateAssessmentValue,
    saveAssessmentData,
  } = useAssessmentData({ initialData: mockAssessmentData });

  const handleSave = async () => {
    // In a real application, you would send this data to your API
    console.log('Saving data:', assessmentData);
    await saveAssessmentData();
  };

  // Mock patient data
  const patientData = {
    patientName: "Jane Doe",
    dob: "12 Aug 1985",
    mrn: "#111111",
    submittedBy: "Nurse Name",
    dateTime: "mm/dd/yy hh:mm",
    audioSrc: "/path-to-your-audio-file.mp3",
    transcript: "Hi, this is Nurse making a detailed note on patient Jane Doe. It's May 30th, 2024, and it's approximately 8:00 AM. Ms. Doe was admitted on the 27th of May with severe abdominal pain. She described the pain as sharp and persistent, which prompted further investigation. Upon admission, her initial vitals were slightly concerning with elevated blood pressure and increased heart rate, but they have since stabilized. As of this morning..."
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
                <span className="font-semibold">Patient Name:</span> {patientData.patientName}
              </div>
              <div>
                <span className="font-semibold">DOB:</span> {patientData.dob}
              </div>
              <div>
                <span className="font-semibold">MRN:</span> {patientData.mrn}
              </div>
              <div className="lg:col-span-2 md:col-span-2">
                <span className="font-semibold">Submitted By:</span> {patientData.submittedBy}
              </div>
              <div className="lg:col-span-3 md:col-span-2">
                <span className="font-semibold">Date & Time:</span> {patientData.dateTime}
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
                    <source src={patientData.audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </Card>

              <Card className="flex-grow overflow-hidden shadow-md">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Transcript</h2>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                  <p className="text-sm text-gray-600">{patientData.transcript}</p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3 overflow-hidden">
              <Card className="h-full flex flex-col shadow-md">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Edit History</h2>
                  <span className="text-sm text-gray-500">#20123 Last Edited: Mar14, 2024 19:00 hrs</span>
                </div>
                <div className="flex-grow overflow-hidden">
                  <AssessmentTable
                    assessmentData={assessmentData}
                    historicalDates={mockHistoricalDates}
                    selectedRow={selectedRow}
                    onRowSelect={setSelectedRow}
                    onValueChange={updateAssessmentValue}
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