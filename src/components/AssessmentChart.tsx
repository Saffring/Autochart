'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AssessmentTable } from './AssessmentTable';
import { AssessmentData } from '@/hooks/useAssessmentData';
import { Patient } from 'fhir/r4';
import { FiSave, FiUser, FiCalendar, FiHash, FiMic, FiFileText, FiEdit3, FiAlertCircle, FiLoader } from 'react-icons/fi';
import LoadingScreen from '@/components/LoadingScreen';
import { useToast } from '@/components/ui/ToastProvider';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface AssessmentChartProps {
  assessmentData: AssessmentData[];
  patientData: Patient;
  updateAssessmentValue: (index: number, newValue: string) => void;
  saveAssessmentData: () => Promise<void>;
  transcript: string;
  loading?: boolean;
  error?: string;
}

export const AssessmentChart: React.FC<AssessmentChartProps> = ({
  assessmentData,
  patientData,
  updateAssessmentValue,
  saveAssessmentData,
  transcript,
  loading = false,
  error,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { addToast } = useToast();

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const confirmSave = async () => {
    setIsSaving(true);
    try {
      await saveAssessmentData();
      addToast('Assessment data saved successfully', 'success');
    } catch (error) {
      addToast('Error saving assessment data. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading assessment data..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8" role="alert">
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive p-4 rounded">
          <div className="flex items-center">
            <FiAlertCircle className="mr-2" size={24} aria-hidden="true" />
            <h1 className="text-xl font-semibold">Error Loading Assessment Data</h1>
          </div>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="bg-card text-card-foreground border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Patient Assessment</h1>
          <Button 
            onClick={handleSave} 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSaving}
            aria-label={isSaving ? 'Saving assessment data' : 'Save and submit assessment data'}
          >
            {isSaving ? <FiLoader className="mr-2 animate-spin" /> : <FiSave className="mr-2" />}
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save and Submit'}</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow overflow-hidden p-4">
        <div className="max-w-[1920px] mx-auto h-full flex flex-col space-y-4">
          <Card className="p-4 md:p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div className="flex items-center">
                <FiUser className="mr-2 text-primary" aria-hidden="true" />
                <span className="font-semibold">Patient:</span> {patientData?.name?.[0]?.given?.join(' ')} {patientData?.name?.[0]?.family}
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-primary" aria-hidden="true" />
                <span className="font-semibold">DOB:</span> {patientData?.birthDate}
              </div>
              <div className="flex items-center">
                <FiHash className="mr-2 text-primary" aria-hidden="true" />
                <span className="font-semibold">MRN:</span> {patientData?.id}
              </div>
              <div className="flex items-center">
                <FiEdit3 className="mr-2 text-primary" aria-hidden="true" />
                <span className="font-semibold">Last Edited:</span> {new Date().toLocaleString()}
              </div>
            </div>
          </Card>

          <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
            <div className="lg:col-span-1 flex flex-col space-y-4 overflow-y-auto">
              <Card className="flex-shrink-0 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="p-4 bg-muted border-b border-border flex items-center">
                  <FiMic className="mr-2 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Recording</h2>
                </div>
                <div className="p-4">
                  <audio controls className="w-full">
                    <source src="/path-to-your-audio-file.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </Card>

              <Card className="flex-grow overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="p-4 bg-muted border-b border-border flex items-center">
                  <FiFileText className="mr-2 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">Transcript</h2>
                </div>
                <div className="p-4 overflow-y-auto h-full">
                  <p className="text-sm text-muted-foreground">{transcript || 'No transcript available.'}</p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3 overflow-hidden">
              <Card className="h-full flex flex-col shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="p-4 bg-muted border-b border-border flex justify-between items-center">
                  <h2 className="text-lg font-semibold flex items-center">
                    <FiEdit3 className="mr-2 text-primary" aria-hidden="true" />
                    Edit History
                  </h2>
                </div>
                <div className="flex-grow overflow-hidden">
                  <AssessmentTable
                    assessmentData={assessmentData}
                    updateAssessmentValue={updateAssessmentValue}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmSave}
        title="Save Changes"
        message="Are you sure you want to save the changes to this assessment?"
      />
    </div>
  );
};

export default AssessmentChart;