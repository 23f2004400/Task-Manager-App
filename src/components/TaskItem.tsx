import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDeleteTask }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (isDeleting) {
      onDeleteTask(task.id);
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 3000); // Reset after 3 seconds
    }
  };

  const priorityColors = {
    low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    medium: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  };

  return (
    <div 
      className={`group bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 border-l-4 transition-all duration-300 hover:shadow-md ${
        task.completed 
          ? 'border-gray-300 dark:border-gray-600 opacity-70' 
          : task.priority === 'high' 
            ? 'border-red-500'
            : task.priority === 'medium'
              ? 'border-blue-500'
              : 'border-green-500'
      }`}
    >
      <div className="flex items-start">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 flex-shrink-0 transition-transform duration-200 hover:scale-110 focus:outline-none"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-blue-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          )}
        </button>
        
        <div className="ml-3 flex-grow">
          <div className="flex justify-between items-start">
            <h3 
              className={`text-lg font-medium text-gray-800 dark:text-gray-200 transition-all duration-200 ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <button
                onClick={handleDelete}
                className={`p-1 rounded-full transition-all duration-200 ${
                  isDeleting 
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800' 
                    : 'text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label={isDeleting ? "Confirm delete" : "Delete task"}
              >
                {isDeleting ? <AlertCircle className="h-5 w-5" /> : <Trash2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`mt-1 text-sm text-gray-600 dark:text-gray-400 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}
          
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;