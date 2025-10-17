import React, { useState, useEffect } from 'react';

const TaskFilters = ({ value, onChange, onSearch }) => {
  const [local, setLocal] = useState({ status: '', priority: '', search: '' });

  useEffect(() => {
    setLocal(value || { status: '', priority: '', search: '' });
  }, [value]);

  const commit = (updates) => {
    const next = { ...local, ...updates };
    setLocal(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center bg-white p-3 rounded shadow">
      <input
        placeholder="Search by title or description"
        value={local.search}
        onChange={(e) => commit({ search: e.target.value })}
        className="flex-1 border rounded px-3 py-2 w-full"
      />
      <select
        value={local.status}
        onChange={(e) => commit({ status: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={local.priority}
        onChange={(e) => commit({ priority: e.target.value })}
        className="border rounded px-3 py-2"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={() => onSearch?.()} className="px-4 py-2 bg-indigo-600 text-white rounded w-full sm:w-auto">
        Search
      </button>
    </div>
  );
};

export default TaskFilters;


