'use client';

import { useState, useCallback } from 'react';

export interface AssessmentData {
  assessment: string;
  value: string;
  history: string[];
}

export interface UseAssessmentDataProps {
  initialData?: AssessmentData[];
  onSave?: (data: AssessmentData[]) => Promise<void>;
}

export const useAssessmentData = ({ initialData = [], onSave }: UseAssessmentDataProps = {}) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>(initialData);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const updateAssessmentValue = useCallback((index: number, newValue: string) => {
    setAssessmentData(prevData => 
      prevData.map((item, i) => 
        i === index ? { ...item, value: newValue } : item
      )
    );
  }, []);

  const saveAssessmentData = useCallback(async () => {
    if (onSave) {
      await onSave(assessmentData);
    }
  }, [assessmentData, onSave]);

  return {
    assessmentData,
    selectedRow,
    setSelectedRow,
    updateAssessmentValue,
    saveAssessmentData,
  };
};

export default useAssessmentData;