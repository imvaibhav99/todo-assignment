import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { tasksApi } from '../../services/api';

const StatCard = ({ label, value, className }) => (
  <div className={`p-4 rounded shadow text-white ${className}`}>
    <div className="text-sm opacity-90">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await tasksApi.stats(axios);
      setStats(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Refresh stats when component becomes visible (user navigates back to dashboard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadStats();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (error) return <div className="max-w-4xl mx-auto p-4 text-red-600">{error}</div>;
  if (loading || !stats) return <div className="max-w-4xl mx-auto p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button 
          onClick={loadStats} 
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tasks" value={stats.total} className="bg-indigo-600" />
        <StatCard label="Completed" value={stats.completed} className="bg-green-600" />
        <StatCard label="Pending" value={stats.pending} className="bg-yellow-600" />
        <StatCard label="High Priority" value={stats.byPriority?.High || 0} className="bg-red-600" />
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">By Status</h3>
        <ul className="space-y-1">
          {Object.entries(stats.byStatus || {}).map(([k, v]) => (
            <li key={k} className="flex justify-between"><span>{k}</span><span>{v}</span></li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">By Priority</h3>
        <ul className="space-y-1">
          {Object.entries(stats.byPriority || {}).map(([k, v]) => (
            <li key={k} className="flex justify-between"><span>{k}</span><span>{v}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;


