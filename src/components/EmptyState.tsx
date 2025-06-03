import React from 'react';
import { ClipboardList } from 'lucide-react';
import { FilterStatus } from '../types';

interface EmptyStateProps {
  currentFilter: FilterStatus;
}

const EmptyState: React.FC<EmptyStateProps> = ({ currentFilter }) => {
  const messages = {
    all: {
      title: 'No tasks yet',
      description: 'Add your first task to get started'
    },
    active: {
      title: 'No active tasks',
      description: 'All your tasks are completed! 🎉'
    },
    completed: {
      title: 'No completed tasks',
      description: 'Complete some tasks to see them here'
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
        <ClipboardList className="h-10 w-10 text-blue-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
        {messages[currentFilter].title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        {messages[currentFilter].description}
      </p>
    </div>
  );
};

export default EmptyState;