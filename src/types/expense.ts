export type Category = 'Food' | 'Transportation' | 'Housing' | 'Utilities' | 'Entertainment' | 'Shopping' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  dueDate: string;
  isPaid: boolean;
  createdAt: string;
  isRecurring?: boolean;
  reminderEnabled?: boolean;
}

export interface ExpenseFormData {
  name: string;
  amount: number;
  category: Category;
  dueDate: string;
  isRecurring?: boolean;
  reminderEnabled?: boolean;
}