export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
}

export type FilterStatus = 'all' | 'active' | 'completed';