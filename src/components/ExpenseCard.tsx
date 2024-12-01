import React from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Expense } from '../types/expense';
import { formatCurrency, formatDate } from '../utils/expenseUtils';

interface ExpenseCardProps {
  expense: Expense;
  onTogglePaid: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onTogglePaid, onDelete }: ExpenseCardProps) {
  const categoryColors: Record<string, string> = {
    Food: 'bg-green-100 text-green-800',
    Transportation: 'bg-blue-100 text-blue-800',
    Housing: 'bg-purple-100 text-purple-800',
    Utilities: 'bg-yellow-100 text-yellow-800',
    Entertainment: 'bg-pink-100 text-pink-800',
    Shopping: 'bg-indigo-100 text-indigo-800',
    Other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{expense.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${categoryColors[expense.category]}`}>
            {expense.category}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onTogglePaid(expense.id)}
            className={`p-1 rounded-full transition-colors ${
              expense.isPaid ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {expense.isPaid ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="text-gray-600">
          <p>Due: {formatDate(expense.dueDate)}</p>
        </div>
        <p className="text-xl font-bold text-gray-900">
          {formatCurrency(expense.amount)}
        </p>
      </div>
    </div>
  );
}