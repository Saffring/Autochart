import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Patient } from 'fhir/r4';

export const usePatientData = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const fetchAttemptedRef = useRef(false);

  const fetchPatientData = useCallback(async () => {
    if (fetchAttemptedRef.current) return;
    fetchAttemptedRef.current = true;

    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem('access_token');
      const patientId = localStorage.getItem('patient');
      const issuer = localStorage.getItem('issuer');

      console.log('Fetching patient data with:', { accessToken: !!accessToken, patientId, issuer });

      if (!accessToken || !patientId || !issuer) {
        throw new Error('Missing required data for fetching patient information');
      }

      const response = await axios.get<Patient>(`${issuer}/Patient/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      console.log('Patient data response:', response.data);

      if (!response.data || Object.keys(response.data).length === 0) {
        throw new Error('Received empty patient data from the server');
      }

      setPatientData(response.data);
      setShowBanner(localStorage.getItem("need_patient_banner") === "true");
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  return { patientData, loading, error, showBanner };
};