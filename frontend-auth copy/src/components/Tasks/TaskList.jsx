import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { tasksApi } from '../../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';

const TaskList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const params = useMemo(() => {
    const p = { page, limit: 12 };
    if (filters.status) p.status = filters.status;
    if (filters.priority) p.priority = filters.priority;
    if (filters.search) p.search = filters.search;
    return p;
  }, [filters, page]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await tasksApi.list(axios, params);
      setItems(res.data);
      setTotal(res.total);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load tasks';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [params.page, params.status, params.priority, params.search]);

  const onSaved = () => {
    setShowForm(false);
    setEditing(null);
    load();
  };

  const onDelete = async (task) => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksApi.remove(axios, task._id);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => { setEditing(null); setShowForm(true); }}>New Task</button>
      </div>
      <TaskFilters value={filters} onChange={setFilters} onSearch={() => setPage(1)} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {showForm && (
        <TaskForm initialTask={editing} onSaved={onSaved} onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <TaskItem key={t._id} task={t} onEdit={(task) => { setEditing(task); setShowForm(true); }} onDelete={onDelete} />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">Total: {total}</div>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded">Prev</button>
          <button disabled={items.length === 0 || items.length < 12} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;


