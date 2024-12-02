import React, { useState } from 'react';
import { Edit2, Trash2, Plus, MapPin } from 'lucide-react';
import { StudentModal } from '../components/StudentModal';
import { useStudentStore } from '../store/studentStore';
import { toast } from 'react-hot-toast';
import { Student } from '../types';

export function Students() {
  const { students, addStudent, updateStudent, deleteStudent, updateLocation } = useStudentStore();
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    addStudent(studentData);
    setIsAddingStudent(false);
    toast.success('Student added successfully');
  };

  const handleEditStudent = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, studentData);
      setEditingStudent(null);
      toast.success('Student updated successfully');
    }
  };

  const handleDeleteStudent = (id: string) => {
    deleteStudent(id);
    toast.success('Student deleted successfully');
  };

  const handleUpdateLocation = (id: string, location: string) => {
    updateLocation(id, location);
    toast.success('Location updated successfully');
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Students</h1>
        <button
          onClick={() => setIsAddingStudent(true)}
          className="flex items-center px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-300">
          {students.map((student) => (
            <li key={student.id} className="px-6 py-4 hover:bg-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">
                    University Seat Number: {student.USN} | Branch: {student.Branch} | course: {student.course}
                  </p>
                  {student.currentClass && (
                    <p className="text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 inline mr-1 text-indigo-500" />
                      {student.currentClass}
                      {student.lastUpdated && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Updated: {new Date(student.lastUpdated).toLocaleString()})
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const location = prompt('Enter new location:');
                      if (location) handleUpdateLocation(student.id, location);
                    }}
                    className="flex items-center justify-center p-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-md shadow-md hover:from-teal-500 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="flex items-center justify-center p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="flex items-center justify-center p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-md shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <StudentModal
        isOpen={isAddingStudent}
        onClose={() => setIsAddingStudent(false)}
        onSave={handleAddStudent}
      />

      <StudentModal
        student={editingStudent || undefined}
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleEditStudent}
      />
    </div>
  );
}
