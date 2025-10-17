import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tasksApi } from '../../services/api';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Todo', 'In Progress', 'Completed'];

const TaskForm = ({ initialTask, onSaved, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'Low');
  const [status, setStatus] = useState(initialTask?.status || 'Todo');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ? initialTask.dueDate.substring(0,10) : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialTask?.title || '');
    setDescription(initialTask?.description || '');
    setPriority(initialTask?.priority || 'Low');
    setStatus(initialTask?.status || 'Todo');
    setDueDate(initialTask?.dueDate ? initialTask.dueDate.substring(0,10) : '');
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    try {
      const payload = { title, description, priority, status, dueDate: dueDate || undefined };
      let result;
      if (initialTask?._id) {
        result = await tasksApi.update(axios, initialTask._id, payload);
      } else {
        result = await tasksApi.create(axios, payload);
      }
      onSaved?.(result.data);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to save task';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border rounded px-3 py-2">
            {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>}
        <button disabled={loading} type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          {loading ? 'Saving...' : (initialTask?._id ? 'Update Task' : 'Create Task')}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;


