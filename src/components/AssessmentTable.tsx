'use client';

import React from 'react';
import { Input } from './ui/input';
import { AssessmentData } from './useAssessmentData';

interface AssessmentTableProps {
  assessmentData: AssessmentData[];
  historicalDates: string[];
  selectedRow: number | null;
  onRowSelect: (index: number) => void;
  onValueChange: (index: number, newValue: string) => void;
}

export const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessmentData,
  historicalDates,
  selectedRow,
  onRowSelect,
  onValueChange,
}) => {
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
            {historicalDates.map((date, index) => (
              <th key={index} scope="col" className="sticky top-0 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-48">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assessmentData.map((row, index) => (
            <tr 
              key={index}
              className={`hover:bg-gray-50 ${selectedRow === index ? 'bg-blue-50' : ''}`}
              onClick={() => onRowSelect(index)}
            >
              <td className="sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white w-48">
                {row.assessment}
              </td>
              <td className="sticky left-48 z-10 px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-white w-48">
                <Input 
                  type="text" 
                  value={row.value} 
                  onChange={(e) => onValueChange(index, e.target.value)}
                  className="w-full" 
                />
              </td>
              {row.history.map((value, historyIndex) => (
                <td key={historyIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-48">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;