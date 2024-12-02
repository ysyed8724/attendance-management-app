import { create } from 'zustand';
import { Student } from '../types';

interface StudentState {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  updateLocation: (id: string, location: string) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  addStudent: (studentData) =>
    set((state) => ({
      students: [
        ...state.students,
        {
          ...studentData,
          id: Date.now().toString(),
        },
      ],
    })),
  updateStudent: (id, updates) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),
  updateLocation: (id, location) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id
          ? { ...student, currentLocation: location, lastUpdated: new Date() }
          : student
      ),
    })),
}));