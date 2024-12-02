import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { X } from 'lucide-react';

interface StudentModalProps {
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>) => void;
}

export function StudentModal({ student, isOpen, onClose, onSave }: StudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    USN: '',
    Branch: '',
    course: '',
    currentLocation: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        USN: student.USN,
        Branch: student.Branch,
        course: student.course,
        currentLocation: student.currentClass || '',
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', USN: '', Branch: '', course: '', currentLocation: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-lg shadow-xl">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {student ? 'Edit Student' : 'Add New Student'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:border-purple-400 focus:ring-purple-400 text-gray-800 sm:text-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">USN</label>
              <input
                type="text"
                required
                value={formData.USN}
                onChange={(e) => setFormData({ ...formData, USN: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:border-purple-400 focus:ring-purple-400 text-gray-800 sm:text-sm p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <input
                  type="text"
                  required
                  value={formData.Branch}
                  onChange={(e) => setFormData({ ...formData, Branch: e.target.value })}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:border-purple-400 focus:ring-purple-400 text-gray-800 sm:text-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:border-purple-400 focus:ring-purple-400 text-gray-800 sm:text-sm p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Class</label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:border-purple-400 focus:ring-purple-400 text-gray-800 sm:text-sm p-2"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              >
                {student ? 'Update' : 'Add'} Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}