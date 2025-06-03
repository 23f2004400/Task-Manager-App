import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import { Task, FilterStatus } from '../types';

interface TaskListProps {
  tasks: Task[];
  currentFilter: FilterStatus;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  currentFilter, 
  onToggleComplete, 
  onDeleteTask 
}) => {
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <EmptyState currentFilter={currentFilter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;