import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Download, Calendar, Trash2, Save } from 'lucide-react';
import { AttendanceRecord } from '../types';
import { useStudentStore } from '../store/studentStore';
import { useAttendanceStore } from '../store/attendanceStore';
import { toast } from 'react-hot-toast';
import Papa from 'papaparse';

export function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentRecords, setCurrentRecords] = useState<AttendanceRecord[]>([]);
  const { students } = useStudentStore();
  const { records, addOrUpdateRecord, deleteOldRecords, getRecordsForDate, saveAttendance } = useAttendanceStore();

  useEffect(() => {
    const dateRecords = getRecordsForDate(selectedDate);
    setCurrentRecords(dateRecords);
  }, [selectedDate, records]);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    const newRecord: Omit<AttendanceRecord, 'id'> = {
      date: selectedDate,
      studentId,
      status,
      notes: '',
    };

    setCurrentRecords((prev) => {
      const existing = prev.find((r) => r.studentId === studentId);
      if (existing) {
        return prev.map((r) =>
          r.studentId === studentId ? { ...r, status } : r
        );
      }
      return [...prev, { ...newRecord, id: Date.now().toString() }];
    });
  };

  const handleSaveAttendance = () => {
    saveAttendance(currentRecords);
    toast.success('Attendance saved successfully');
  };

  const exportAttendance = () => {
    const data = currentRecords.map((record) => {
      const student = students.find((s) => s.id === record.studentId);
      return {
        Date: format(record.date, 'yyyy-MM-dd'),
        'Student Name': student?.name,
        'University Seat Number': student?.USN,
        Status: record.status,
        Notes: record.notes,
      };
    });

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${format(selectedDate, 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteOldRecords = (days: number) => {
    deleteOldRecords(days);
    toast.success(`Deleted attendance records older than ${days} days`);
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Attendance</h1>
        <div className="flex space-x-4">
          <button
            onClick={exportAttendance}
            className="flex items-center px-5 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <Download className="h-5 w-5 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => handleDeleteOldRecords(30)}
            className="flex items-center px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Clear Old Records
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Calendar className="h-6 w-6 text-gray-600" />
        <input
          type="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-300">
          {students.map((student) => {
            const record = currentRecords.find((r) => r.studentId === student.id);

            return (
              <li key={student.id} className="px-6 py-4 hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      University Seat Number: {student.USN} | Branch: {student.Branch} | course: {student.course}
                    </p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={record?.status === 'present'}
                        onChange={() => handleAttendanceChange(student.id, 'present')}
                        className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Present</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={record?.status === 'absent'}
                        onChange={() => handleAttendanceChange(student.id, 'absent')}
                        className="form-radio h-4 w-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Absent</span>
                    </label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveAttendance}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Attendance
        </button>
      </div>
    </div>
  );
}
