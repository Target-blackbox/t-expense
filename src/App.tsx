import React, { useState, useEffect } from 'react';
import { PlusCircle, Receipt } from 'lucide-react';
import { Expense, ExpenseFormData } from './types/expense';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseCard } from './components/ExpenseCard';
import { ExpenseSummary } from './components/ExpenseSummary';
import { requestNotificationPermission } from './utils/notificationUtils';
import { checkAndSendReminders } from './utils/reminderUtils';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    // Request notification permission when the app loads
    requestNotificationPermission();

    // Set up daily reminder check
    const checkReminders = () => {
      checkAndSendReminders(expenses);
    };

    // Check reminders immediately
    checkReminders();

    // Check reminders every day at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set initial timeout to start checking at midnight
    const initialTimeout = setTimeout(() => {
      checkReminders();
      // Then set up daily interval
      setInterval(checkReminders, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [expenses]);

  const handleAddExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      ...data,
      isPaid: false,
      createdAt: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
    setShowForm(false);
  };

  const handleTogglePaid = (id: string) => {
    setExpenses(expenses.map(expense =>
      expense.id === id
        ? { ...expense, isPaid: !expense.isPaid }
        : expense
    ));
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Receipt className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Expense
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ExpenseSummary expenses={expenses} />

        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No expenses yet</h3>
            <p className="mt-1 text-sm text-gray-500">Add your first expense to start tracking.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Expense
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expenses
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map(expense => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onTogglePaid={handleTogglePaid}
                  onDelete={handleDelete}
                />
              ))}
          </div>
        )}
      </main>

      {showForm && (
        <ExpenseForm
          onSubmit={handleAddExpense}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;