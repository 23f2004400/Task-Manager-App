import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '../types';

interface TaskFormProps {
  onAddTask: (title: string, description: string, priority: Priority) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim(), priority);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const priorityClasses = {
    low: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
    high: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
  };

  const selectedPriorityClasses = {
    low: 'bg-green-500 text-white hover:bg-green-600',
    medium: 'bg-blue-500 text-white hover:bg-blue-600',
    high: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="flex-grow py-2 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
            aria-label="Add task"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-3 animate-fadeIn">
            <div>
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full py-2 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority:
              </label>
              <div className="flex space-x-2">
                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1 rounded-md border text-sm font-medium capitalize transition-colors duration-200 ${
                      priority === p ? selectedPriorityClasses[p] : priorityClasses[p]
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;