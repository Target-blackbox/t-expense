import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Expense } from '../types/expense';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const getUpcomingExpenses = (expenses: Expense[]): Expense[] => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  return expenses.filter(expense => {
    const dueDate = new Date(expense.dueDate);
    return !expense.isPaid && 
           isAfter(dueDate, today) && 
           isBefore(dueDate, nextWeek);
  });
};

export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};