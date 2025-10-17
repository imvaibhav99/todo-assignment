const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api/v1';

export const withCreds = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
};

export const tasksApi = {
  list: async (axios, params = {}) =>
    axios.get(`${BASE_URL}/tasks`, { ...withCreds, params }).then(r => r.data),
  get: async (axios, id) =>
    axios.get(`${BASE_URL}/tasks/${id}`, withCreds).then(r => r.data),
  create: async (axios, body) =>
    axios.post(`${BASE_URL}/tasks`, body, withCreds).then(r => r.data),
  update: async (axios, id, body) =>
    axios.put(`${BASE_URL}/tasks/${id}`, body, withCreds).then(r => r.data),
  remove: async (axios, id) =>
    axios.delete(`${BASE_URL}/tasks/${id}`, withCreds).then(r => r.data),
  stats: async (axios) =>
    axios.get(`${BASE_URL}/tasks/stats`, withCreds).then(r => r.data),
};

export default BASE_URL;