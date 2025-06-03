import React from 'react';
import { FilterStatus } from '../types';

interface TaskFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters: FilterStatus[] = ['all', 'active', 'completed'];
  
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 bg-gray-50 dark:bg-gray-750 rounded-lg p-2">
      <div className="flex space-x-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 relative ${
              currentFilter === filter
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="capitalize">{filter}</span>
            {taskCounts[filter] > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                currentFilter === filter
                  ? 'bg-white text-blue-600'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {taskCounts[filter]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;