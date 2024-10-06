import { useState, useEffect, useCallback } from 'react';
import { Patient } from 'fhir/r4';

export interface AssessmentData {
  id: string;
  assessment: string;
  value: string;
  date: string;
  history: { value: string; date: string }[];
}

export interface UseAssessmentDataProps {
  patient: Patient | undefined;
  onSave?: (data: AssessmentData[]) => Promise<void>;
}

export const useAssessmentData = ({ patient, onSave }: UseAssessmentDataProps) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    if (patient) {
      const patientAssessment: AssessmentData[] = [
        {
          id: 'name',
          assessment: 'Name',
          value: `${patient.name?.[0]?.given?.join(' ')} ${patient.name?.[0]?.family}`,
          date: new Date().toISOString(),
          history: [],
        },
        {
          id: 'gender',
          assessment: 'Gender',
          value: patient.gender || 'Unknown',
          date: new Date().toISOString(),
          history: [],
        },
        {
          id: 'birthDate',
          assessment: 'Date of Birth',
          value: patient.birthDate || 'Unknown',
          date: new Date().toISOString(),
          history: [],
        },
        {
          id: 'address',
          assessment: 'Address',
          value: patient.address?.[0] ? `${patient.address[0].line?.[0]}, ${patient.address[0].city}, ${patient.address[0].state} ${patient.address[0].postalCode}` : 'Unknown',
          date: new Date().toISOString(),
          history: [],
        },
        {
          id: 'phone',
          assessment: 'Phone',
          value: patient.telecom?.find(t => t.system === 'phone')?.value || 'Unknown',
          date: new Date().toISOString(),
          history: [],
        },
        {
          id: 'email',
          assessment: 'Email',
          value: patient.telecom?.find(t => t.system === 'email')?.value || 'Unknown',
          date: new Date().toISOString(),
          history: [],
        },
      ];

      setAssessmentData(patientAssessment);
      setLoading(false);
    } else {
      setError('Patient data is required');
      setLoading(false);
    }
  }, [patient]);

  const updateAssessmentValue = useCallback((index: number, newValue: string) => {
    setAssessmentData(prevData => 
      prevData.map((item, i) => {
        if (i === index) {
          const newDate = new Date().toISOString();
          return {
            ...item,
            value: newValue,
            date: newDate,
            history: [...item.history, { value: item.value, date: item.date }],
          };
        }
        return item;
      })
    );
  }, []);

  const saveAssessmentData = useCallback(async () => {
    if (onSave) {
      await onSave(assessmentData);
    }
  }, [assessmentData, onSave]);

  return {
    assessmentData,
    loading,
    error,
    selectedRow,
    setSelectedRow,
    updateAssessmentValue,
    saveAssessmentData,
  };
};

export default useAssessmentData;