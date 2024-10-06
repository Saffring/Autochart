'use client';

import React from 'react';
import { Input } from './ui/input';
import { AssessmentData } from '@/hooks/useAssessmentData';

interface AssessmentTableProps {
  assessmentData: AssessmentData[];
  updateAssessmentValue: (index: number, newValue: string) => void;
  saveAssessmentData: () => Promise<void>;
  selectedRow: number | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessmentData,
  updateAssessmentValue,
  saveAssessmentData,
  selectedRow,
  setSelectedRow,
}) => {
  const handleSave = async () => {
    await saveAssessmentData();
    // You might want to add some feedback to the user here, like a toast notification
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="sticky top-0 left-0 z-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-48">
              Assessment
            </th>
            <th scope="col" className="sticky top-0 left-48 z-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-48">
              Finding
            </th>
            <th scope="col" className="sticky top-0 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-48">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assessmentData.map((row, index) => (
            <tr 
              key={index}
              className={`hover:bg-gray-50 ${selectedRow === index ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedRow(index)}
            >
              <td className="sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white w-48">
                {row.assessment}
              </td>
              <td className="sticky left-48 z-10 px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white w-48">
                <Input 
                  type="text" 
                  value={row.value} 
                  onChange={(e) => updateAssessmentValue(index, e.target.value)}
                  className="w-full" 
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-48">
                {new Date(row.date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AssessmentTable;