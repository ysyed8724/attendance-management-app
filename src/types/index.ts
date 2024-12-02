export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Student {
  id: string;
  name: string;
  USN: string;
  Branch: string;
  course: string;
  currentClass?: string;
  lastUpdated?: Date;
}

export interface AttendanceRecord {
  id: string;
  date: Date;
  studentId: string;
  status: 'present' | 'absent';
  notes?: string;
}