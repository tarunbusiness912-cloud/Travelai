import axios from 'axios';

const buildApiBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const trimmedUrl = rawUrl.replace(/\/+$/, '');
  return trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`;
};

const API_BASE_URL = buildApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject bearer token headers seamlessly
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('travelai_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Trip Endpoints
export const getTrips = () => api.get('/trips');
export const getTripById = (id) => api.get(`/trips/${id}`);
export const createTrip = (tripData) => api.post('/trips', tripData);
export const updateTrip = (id, tripData) => api.put(`/trips/${id}`, tripData);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);

// Group Squad Endpoints
export const getGroups = () => api.get('/groups');
export const createGroup = (groupData) => api.post('/groups', groupData);
export const updateGroup = (id, groupData) => api.put(`/groups/${id}`, groupData);
export const deleteGroup = (id) => api.delete(`/groups/${id}`);
export const requestToJoinGroup = (id) => api.post(`/groups/${id}/join`);

// Profile Endpoints
export const getProfileById = (id) => api.get(`/profiles/${id}`);
export const updateProfileById = (id, profile) => api.put(`/profiles/${id}`, profile);

// Expense Endpoints
export const getExpenses = (tripId) => api.get(`/expenses?tripId=${tripId}`);
export const addExpense = (expenseData) => api.post('/expenses', expenseData);

export default api;
