import React, { useState } from 'react';
import { SubjectFormData } from '../types';
import { X } from 'lucide-react';

interface AddSubjectFormProps {
  onSubmit: (data: SubjectFormData) => void;
  onClose: () => void;
}

export function AddSubjectForm({ onSubmit, onClose }: AddSubjectFormProps) {
  const [formData, setFormData] = useState<SubjectFormData>({
    name: '',
    professor: '',
    schedule: '',
    totalClasses: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', professor: '', schedule: '', totalClasses: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Add New Subject</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Data Structures"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professor Name
            </label>
            <input
              type="text"
              required
              value={formData.professor}
              onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Dr. Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule
            </label>
            <input
              type="text"
              required
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Mon, Wed 10:00 AM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Classes in Semester
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.totalClasses || ''}
              onChange={(e) => setFormData({ ...formData, totalClasses: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 45"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
}