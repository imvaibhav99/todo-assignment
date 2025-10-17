import React from 'react';

const badgeColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-green-100 text-green-800';
  }
};

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs ${badgeColor(task.priority)}`}>{task.priority}</span>
          <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">{task.status}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <div>
          {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit?.(task)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
          <button onClick={() => onDelete?.(task)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;


