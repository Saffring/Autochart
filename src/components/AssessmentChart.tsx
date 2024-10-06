import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const AssessmentChart: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient Listing &gt; Assessments &gt; View Chart &gt; Edit Chart</h1>
        <Button>Save and Submit</Button>
      </div>

      <Card className="mb-4 p-4">
        <Button variant="outline" className="mb-2">&lt; Back</Button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="font-bold">Patient Name:</span> Jane D
          </div>
          <div>
            <span className="font-bold">DOB:</span> 12 Aug 1985
          </div>
          <div>
            <span className="font-bold">MRN:</span> #111111
          </div>
          <div>
            <span className="font-bold">Submitted By:</span> Nurse Name
          </div>
          <div>
            <span className="font-bold">Date & Time:</span> mm/dd/yy hh:mm
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-2">Recording</h2>
          <div className="bg-gray-200 p-4 rounded-lg flex items-center">
            <Button variant="outline" className="mr-2">▶</Button>
            <div className="flex-grow h-2 bg-blue-300 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500 rounded-full"></div>
            </div>
            <span className="ml-2">02:10</span>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-bold mb-2">Transcript</h2>
          <div className="h-40 overflow-y-auto">
            <p>
              Hi, this is Nurse making a detailed note on patient John Doe in room 312. It&apos;s May 30th, 2024, and it&apos;s approximately 8:00 AM.
              Mr. Doe was admitted on the 27th of May with severe abdominal pain. He described the pain as sharp and persistent, which prompted further investigation. Upon admission, his initial vitals were slightly concerning with elevated blood pressure and increased heart rate, but they have since stabilized. As of this morning...
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-4 p-4">
        <h2 className="text-xl font-bold mb-2">Edit History</h2>
        <p className="mb-2">#20123 Last Edited: Mar14, 2024 19:00 hrs</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment</TableHead>
              <TableHead>Finding</TableHead>
              <TableHead>Mar 13, 2024 18:45 hrs</TableHead>
              <TableHead>Mar 13, 2024 18:45 hrs</TableHead>
              <TableHead>Mar 13, 2024 18:45 hrs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Temperature</TableCell>
              <TableCell>37</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Respiratory rate</TableCell>
              <TableCell>18</TableCell>
              <TableCell className="bg-yellow-100">22</TableCell>
              <TableCell className="bg-yellow-100">22</TableCell>
              <TableCell className="bg-yellow-100">22</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Heart Rate</TableCell>
              <TableCell>84</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Blood Pressure</TableCell>
              <TableCell>120/80</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pain</TableCell>
              <TableCell>Yes</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="bg-yellow-100">No</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pain Onset</TableCell>
              <TableCell>Back Lower</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Radiating</TableCell>
              <TableCell>Unknown</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pain Rating</TableCell>
              <TableCell>6/10</TableCell>
              <TableCell className="bg-yellow-100">7/10</TableCell>
              <TableCell className="bg-yellow-100">7/10</TableCell>
              <TableCell className="bg-yellow-100">0/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Medication Given</TableCell>
              <TableCell>Unknown</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Respiratory Upper</TableCell>
              <TableCell>Clear</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AssessmentChart;