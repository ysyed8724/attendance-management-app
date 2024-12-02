import { create } from 'zustand';
import { AttendanceRecord } from '../types';
import { format } from 'date-fns';

interface AttendanceState {
  records: AttendanceRecord[];
  addOrUpdateRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  deleteOldRecords: (days: number) => void;
  getRecordsForDate: (date: Date) => AttendanceRecord[];
  saveAttendance: (records: AttendanceRecord[]) => void;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => {
  // Load records from localStorage on initialization
  const storedRecords = localStorage.getItem('attendanceRecords');
  const initialRecords: AttendanceRecord[] = storedRecords
    ? JSON.parse(storedRecords)
    : [];

  // Utility function to save records to localStorage
  const saveToLocalStorage = (records: AttendanceRecord[]) => {
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
  };

  return {
    records: initialRecords,
    addOrUpdateRecord: (newRecord) => {
      set((state) => {
        const existingRecord = state.records.find(
          (record) =>
            record.studentId === newRecord.studentId &&
            format(record.date, 'yyyy-MM-dd') === format(newRecord.date, 'yyyy-MM-dd')
        );

        let updatedRecords;
        if (existingRecord) {
          updatedRecords = state.records.map((record) =>
            record.id === existingRecord.id
              ? { ...newRecord, id: record.id }
              : record
          );
        } else {
          updatedRecords = [
            ...state.records,
            { ...newRecord, id: Date.now().toString() },
          ];
        }

        // Save to localStorage
        saveToLocalStorage(updatedRecords);
        return { records: updatedRecords };
      });
    },
    deleteOldRecords: (days) => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      set((state) => {
        const updatedRecords = state.records.filter((record) => record.date > cutoffDate);

        // Save to localStorage
        saveToLocalStorage(updatedRecords);
        return { records: updatedRecords };
      });
    },
    getRecordsForDate: (date) => {
      return get().records.filter(
        (record) => format(record.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
    },
    saveAttendance: (records) => {
      set((state) => {
        const updatedRecords = [
          ...state.records.filter(
            (r) =>
              format(r.date, 'yyyy-MM-dd') !==
              format(records[0]?.date || new Date(), 'yyyy-MM-dd')
          ),
          ...records,
        ];

        // Save to localStorage
        saveToLocalStorage(updatedRecords);
        return { records: updatedRecords };
      });
    },
  };
});
