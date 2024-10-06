'use client';

import React, { KeyboardEvent } from 'react';
import { Input } from './ui/input';
import { AssessmentData } from '@/hooks/useAssessmentData';
import { FiEdit2, FiClock } from 'react-icons/fi';

interface AssessmentTableProps {
  assessmentData: AssessmentData[];
  updateAssessmentValue: (index: number, newValue: string) => void;
  selectedRow: number | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AssessmentTable: React.FC<AssessmentTableProps> = ({
  assessmentData,
  updateAssessmentValue,
  selectedRow,
  setSelectedRow,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setSelectedRow(index);
    } else if (event.key === 'ArrowUp' && index > 0) {
      setSelectedRow(index - 1);
    } else if (event.key === 'ArrowDown' && index < assessmentData.length - 1) {
      setSelectedRow(index + 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Assessment
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Finding
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {assessmentData.map((row, index) => (
            <tr 
              key={index}
              className={`transition-colors duration-200 ease-in-out ${selectedRow === index ? 'bg-muted/50' : 'hover:bg-muted/20'}`}
              onClick={() => setSelectedRow(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="row"
              aria-selected={selectedRow === index}
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                {row.assessment}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                <div className="flex items-center">
                  <FiEdit2 className="mr-2 text-muted-foreground" />
                  <Input 
                    type="text" 
                    value={row.value} 
                    onChange={(e) => updateAssessmentValue(index, e.target.value)}
                    className="w-full border-none focus:ring-2 focus:ring-primary" 
                    aria-label={`${row.assessment} value`}
                  />
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground hidden sm:table-cell">
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  {new Date(row.date).toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;