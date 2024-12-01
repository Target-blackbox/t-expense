import React from 'react';
import { DollarSign, PieChart, Calendar } from 'lucide-react';
import { Expense } from '../types/expense';
import { formatCurrency, getTotalExpenses, getUpcomingExpenses } from '../utils/expenseUtils';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = getTotalExpenses(expenses);
  const upcomingExpenses = getUpcomingExpenses(expenses);
  const unpaidExpenses = expenses.filter(e => !e.isPaid).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Upcoming (7 days)</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingExpenses.length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Unpaid Expenses</p>
            <p className="text-2xl font-bold text-gray-900">{unpaidExpenses}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}