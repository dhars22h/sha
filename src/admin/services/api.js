import axios from 'axios';
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialReviews,
  analyticsData,
  dashboardStats,
} from '../data/mockData';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminApi = {
  getDashboardStats: async () => {
    await delay();
    return { data: dashboardStats };
  },

  getProducts: async () => {
    await delay();
    return { data: initialProducts };
  },

  getOrders: async () => {
    await delay();
    return { data: initialOrders };
  },

  getCustomers: async () => {
    await delay();
    return { data: initialCustomers };
  },

  getReviews: async () => {
    await delay();
    return { data: initialReviews };
  },

  getAnalytics: async (period = 'monthly') => {
    await delay();
    return { data: analyticsData[period] };
  },

  login: async (email, password) => {
    await delay(500);
    if (email === 'admin@shansshampoo.com' && password === 'admin123') {
      return { data: { token: 'mock-jwt-token', user: { name: 'Shan Admin', email } } };
    }
    throw new Error('Invalid credentials');
  },
};

export default api;
