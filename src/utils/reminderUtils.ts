import { addMonths, isEqual, startOfDay } from 'date-fns';
import { Expense } from '../types/expense';
import { sendNotification } from './notificationUtils';

export const checkAndSendReminders = (expenses: Expense[]) => {
  const today = startOfDay(new Date());
  
  expenses.forEach(expense => {
    if (!expense.reminderEnabled || expense.isPaid) return;

    const dueDate = startOfDay(new Date(expense.dueDate));
    const isToday = isEqual(today, dueDate);

    if (isToday) {
      sendNotification(
        'Expense Payment Reminder',
        `${expense.name} payment of ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'INR'
        }).format(expense.amount)} is due today!`
      );

      // If it's a recurring expense, create next month's reminder
      if (expense.isRecurring) {
        const nextDueDate = addMonths(dueDate, 1);
        // You might want to dispatch an action or call a function here to add the next month's expense
      }
    }
  });
};